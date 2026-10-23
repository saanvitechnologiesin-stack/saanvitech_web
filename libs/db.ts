import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { CareerType, CareerApplicationType, ApplicationStatus } from '@/types/career';
import { AdminUserType } from '@/types/admin';
import { hashPassword } from '@/libs/auth';

let pool: Pool | null = null;
let isInitialized = false;

function getPool(): Pool {
  if (!pool) {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not set in environment variables.');
    }
    const needsSsl = DATABASE_URL.includes('sslmode=require') || process.env.NODE_ENV === 'production';
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export async function initDb(): Promise<void> {
  if (isInitialized) return;

  const client = await getPool().connect();
  try {
    // 1. Careers Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        experience VARCHAR(50),
        salary VARCHAR(100),
        overview TEXT NOT NULL,
        responsibilities TEXT[] DEFAULT '{}',
        requirements TEXT[] DEFAULT '{}',
        benefits TEXT[] DEFAULT '{}',
        is_active BOOLEAN DEFAULT TRUE,
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE careers ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published';
    `);

    // 2. Admin Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) DEFAULT 'Admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS username VARCHAR(100);
      UPDATE admin_users SET username = 'admin' WHERE (username IS NULL OR username = '') AND LOWER(email) = 'admin@saanvitech.com';
      UPDATE admin_users SET username = LOWER(SPLIT_PART(email, '@', 1)) WHERE (username IS NULL OR username = '');
    `);

    // 3. Career Applications Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id SERIAL PRIMARY KEY,
        role_id VARCHAR(50),
        role_title VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        linkedin VARCHAR(255),
        portfolio VARCHAR(255),
        resume_url TEXT,
        resume_file_path TEXT,
        cover_letter TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Contact / Appointment Inquiries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default admin user if empty
    const adminCountRes = await client.query('SELECT COUNT(*) FROM admin_users');
    const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@saanvitech.com').toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123';
    const defaultUsername = (process.env.ADMIN_DEFAULT_USERNAME || 'admin').toLowerCase().trim();
    const defaultName = (process.env.ADMIN_DEFAULT_NAME || 'Saanvi Admin').trim();

    if (parseInt(adminCountRes.rows[0].count, 10) === 0) {
      const defaultHash = hashPassword(defaultPassword);

      await client.query(
        `INSERT INTO admin_users (email, password_hash, name, username)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO NOTHING`,
        [defaultEmail, defaultHash, defaultName, defaultUsername]
      );
    } else if (process.env.ADMIN_DEFAULT_USERNAME || process.env.ADMIN_DEFAULT_NAME) {
      // Sync environment settings to default admin account if set in .env.local
      await client.query(
        `UPDATE admin_users 
         SET username = COALESCE(NULLIF($1, ''), username),
             name = COALESCE(NULLIF($2, ''), name)
         WHERE LOWER(email) = LOWER($3)`,
        [process.env.ADMIN_DEFAULT_USERNAME || '', process.env.ADMIN_DEFAULT_NAME || '', defaultEmail]
      );
    }

    isInitialized = true;
  } finally {
    client.release();
  }
}

/* ==========================================================================
   Admin User Queries (Pure PostgreSQL)
   ========================================================================== */

export async function getAdminUserByIdentifier(identifier: string): Promise<AdminUserType | null> {
  const clean = identifier.trim();
  if (!clean) return null;
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `SELECT * FROM admin_users 
       WHERE LOWER(email) = LOWER($1) 
          OR (username IS NOT NULL AND LOWER(username) = LOWER($1))
          OR LOWER(name) = LOWER($1)
          OR LOWER(SPLIT_PART(email, '@', 1)) = LOWER($1)
       LIMIT 1`,
      [clean]
    );
    if (res.rows.length > 0) {
      return res.rows[0] as AdminUserType;
    }
    return null;
  } finally {
    client.release();
  }
}

export async function getAdminUserByEmail(email: string): Promise<AdminUserType | null> {
  return getAdminUserByIdentifier(email);
}

export async function createAdminUser(email: string, passwordHash: string, name = 'Admin'): Promise<AdminUserType> {
  const normalizedEmail = email.toLowerCase().trim();
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `INSERT INTO admin_users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [normalizedEmail, passwordHash, name]
    );
    return res.rows[0] as AdminUserType;
  } finally {
    client.release();
  }
}

/* ==========================================================================
   Career Queries (Pure PostgreSQL)
   ========================================================================== */

export interface CareerSearchOptions {
  includeInactive?: boolean;
  q?: string;
  locations?: string[];
  types?: string[];
  experiences?: string[];
  sortBy?: "newest" | "oldest";
}

export async function getAllCareers(includeInactive = false): Promise<CareerType[]> {
  await initDb();
  const client = await getPool().connect();
  try {
    const query = includeInactive
      ? 'SELECT * FROM careers ORDER BY created_at DESC'
      : "SELECT * FROM careers WHERE is_active = true AND (status = 'published' OR status IS NULL) ORDER BY created_at DESC";
    const res = await client.query(query);
    return res.rows.map(r => ({
      ...r,
      id: r.id,
      status: r.status || (r.is_active ? 'published' : 'draft'),
      responsibilities: Array.isArray(r.responsibilities) ? r.responsibilities : [],
      requirements: Array.isArray(r.requirements) ? r.requirements : [],
      benefits: Array.isArray(r.benefits) ? r.benefits : [],
    }));
  } finally {
    client.release();
  }
}

export async function searchCareers(options: CareerSearchOptions = {}): Promise<{
  careers: CareerType[];
  total: number;
}> {
  await initDb();
  const client = await getPool().connect();
  try {
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (!options.includeInactive) {
      conditions.push("(is_active = true AND (status = 'published' OR status IS NULL))");
    }

    if (options.q && options.q.trim()) {
      const searchTerm = `%${options.q.trim()}%`;
      conditions.push(
        `(title ILIKE $${paramIndex} OR overview ILIKE $${paramIndex} OR department ILIKE $${paramIndex} OR location ILIKE $${paramIndex})`
      );
      params.push(searchTerm);
      paramIndex++;
    }

    if (options.locations && options.locations.length > 0) {
      conditions.push(`location = ANY($${paramIndex})`);
      params.push(options.locations);
      paramIndex++;
    }

    if (options.types && options.types.length > 0) {
      conditions.push(`type = ANY($${paramIndex})`);
      params.push(options.types);
      paramIndex++;
    }

    if (options.experiences && options.experiences.length > 0) {
      conditions.push(`experience = ANY($${paramIndex})`);
      params.push(options.experiences);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const orderDirection = options.sortBy === "oldest" ? "ASC" : "DESC";
    const query = `SELECT * FROM careers ${whereClause} ORDER BY created_at ${orderDirection}`;

    const res = await client.query(query, params);
    const careers: CareerType[] = res.rows.map(r => ({
      ...r,
      id: r.id,
      status: r.status || (r.is_active ? "published" : "draft"),
      responsibilities: Array.isArray(r.responsibilities) ? r.responsibilities : [],
      requirements: Array.isArray(r.requirements) ? r.requirements : [],
      benefits: Array.isArray(r.benefits) ? r.benefits : [],
    }));

    return { careers, total: careers.length };
  } finally {
    client.release();
  }
}

export async function getCareerFilterOptions(): Promise<{
  locations: string[];
  types: string[];
  experiences: string[];
  counts: {
    locations: Record<string, number>;
    types: Record<string, number>;
    experiences: Record<string, number>;
  };
}> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      "SELECT location, type, experience FROM careers WHERE is_active = true AND (status = 'published' OR status IS NULL)"
    );
    const locations = Array.from(new Set(res.rows.map(r => r.location).filter(Boolean))).sort();
    const types = Array.from(new Set(res.rows.map(r => r.type).filter(Boolean))).sort();
    const experiences = Array.from(
      new Set(res.rows.map(r => r.experience).filter((exp): exp is string => Boolean(exp)))
    ).sort();

    const locationCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {};
    const experienceCounts: Record<string, number> = {};

    res.rows.forEach(r => {
      if (r.location) locationCounts[r.location] = (locationCounts[r.location] || 0) + 1;
      if (r.type) typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
      if (r.experience) experienceCounts[r.experience] = (experienceCounts[r.experience] || 0) + 1;
    });

    return {
      locations,
      types,
      experiences,
      counts: {
        locations: locationCounts,
        types: typeCounts,
        experiences: experienceCounts,
      },
    };
  } finally {
    client.release();
  }
}

export async function getCareerBySlug(slug: string): Promise<CareerType | null> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query('SELECT * FROM careers WHERE slug = $1 LIMIT 1', [slug]);
    if (res.rows.length > 0) {
      const r = res.rows[0];
      return {
        ...r,
        id: r.id,
        status: r.status || (r.is_active ? 'published' : 'draft'),
        responsibilities: Array.isArray(r.responsibilities) ? r.responsibilities : [],
        requirements: Array.isArray(r.requirements) ? r.requirements : [],
        benefits: Array.isArray(r.benefits) ? r.benefits : [],
      };
    }
    return null;
  } finally {
    client.release();
  }
}

export async function createCareer(data: Omit<CareerType, 'id'>): Promise<CareerType> {
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const status = data.status || (data.is_active === false ? 'draft' : 'published');
  const isActive = data.is_active !== undefined ? data.is_active : status === 'published';

  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `INSERT INTO careers (
        title, slug, department, location, type, experience, salary,
        overview, responsibilities, requirements, benefits, is_active, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        data.title,
        slug,
        data.department,
        data.location,
        data.type,
        data.experience || '',
        data.salary || '',
        data.overview,
        data.responsibilities || [],
        data.requirements || [],
        data.benefits || [],
        isActive,
        status,
      ]
    );
    const row = res.rows[0];
    return {
      ...row,
      status: row.status || (row.is_active ? 'published' : 'draft'),
    } as CareerType;
  } finally {
    client.release();
  }
}

export async function updateCareer(id: number | string, data: Partial<CareerType>): Promise<CareerType | null> {
  await initDb();
  const client = await getPool().connect();
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (data.title !== undefined) { fields.push(`title = $${index++}`); values.push(data.title); }
    if (data.slug !== undefined) { fields.push(`slug = $${index++}`); values.push(data.slug); }
    if (data.department !== undefined) { fields.push(`department = $${index++}`); values.push(data.department); }
    if (data.location !== undefined) { fields.push(`location = $${index++}`); values.push(data.location); }
    if (data.type !== undefined) { fields.push(`type = $${index++}`); values.push(data.type); }
    if (data.experience !== undefined) { fields.push(`experience = $${index++}`); values.push(data.experience); }
    if (data.salary !== undefined) { fields.push(`salary = $${index++}`); values.push(data.salary); }
    if (data.overview !== undefined) { fields.push(`overview = $${index++}`); values.push(data.overview); }
    if (data.responsibilities !== undefined) { fields.push(`responsibilities = $${index++}`); values.push(data.responsibilities); }
    if (data.requirements !== undefined) { fields.push(`requirements = $${index++}`); values.push(data.requirements); }
    if (data.benefits !== undefined) { fields.push(`benefits = $${index++}`); values.push(data.benefits); }

    if (data.status !== undefined) {
      fields.push(`status = $${index++}`);
      values.push(data.status);
      if (data.is_active === undefined) {
        fields.push(`is_active = $${index++}`);
        values.push(data.status === 'published');
      }
    }
    if (data.is_active !== undefined) {
      fields.push(`is_active = $${index++}`);
      values.push(data.is_active);
      if (data.status === undefined) {
        fields.push(`status = $${index++}`);
        values.push(data.is_active ? 'published' : 'draft');
      }
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const res = await client.query(
      `UPDATE careers SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );
    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        ...row,
        status: row.status || (row.is_active ? 'published' : 'draft'),
      } as CareerType;
    }
    return null;
  } finally {
    client.release();
  }
}

export async function deleteCareer(id: number | string): Promise<boolean> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query('DELETE FROM careers WHERE id = $1', [id]);
    return (res.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

/* ==========================================================================
   Career Applications Queries (Pure PostgreSQL)
   ========================================================================== */

export async function createCareerApplication(
  data: Omit<CareerApplicationType, 'id' | 'created_at'>
): Promise<CareerApplicationType> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `INSERT INTO career_applications 
       (role_id, role_title, name, email, phone, linkedin, portfolio, resume_url, resume_file_path, cover_letter, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        data.roleId ? String(data.roleId) : null,
        data.roleTitle,
        data.name,
        data.email,
        data.phone,
        data.linkedin || null,
        data.portfolio || null,
        data.resumeUrl || null,
        data.resumeFilePath || null,
        data.coverLetter || null,
        data.status || 'new',
      ]
    );
    const row = res.rows[0];
    return {
      id: row.id,
      roleId: row.role_id,
      roleTitle: row.role_title,
      name: row.name,
      email: row.email,
      phone: row.phone,
      linkedin: row.linkedin,
      portfolio: row.portfolio,
      resumeUrl: row.resume_url,
      resumeFilePath: row.resume_file_path,
      coverLetter: row.cover_letter,
      status: row.status,
      created_at: row.created_at,
    };
  } finally {
    client.release();
  }
}

export async function getAllCareerApplications(): Promise<CareerApplicationType[]> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `SELECT * FROM career_applications ORDER BY created_at DESC`
    );
    return res.rows.map(row => ({
      id: row.id,
      roleId: row.role_id,
      roleTitle: row.role_title,
      name: row.name,
      email: row.email,
      phone: row.phone,
      linkedin: row.linkedin,
      portfolio: row.portfolio,
      resumeUrl: row.resume_url,
      resumeFilePath: row.resume_file_path,
      coverLetter: row.cover_letter,
      status: row.status,
      created_at: row.created_at,
    }));
  } finally {
    client.release();
  }
}

export async function updateCareerApplicationStatus(
  id: number | string,
  status: ApplicationStatus
): Promise<CareerApplicationType | null> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `UPDATE career_applications SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      roleId: row.role_id,
      roleTitle: row.role_title,
      name: row.name,
      email: row.email,
      phone: row.phone,
      linkedin: row.linkedin,
      portfolio: row.portfolio,
      resumeUrl: row.resume_url,
      resumeFilePath: row.resume_file_path,
      coverLetter: row.cover_letter,
      status: row.status,
      created_at: row.created_at,
    };
  } finally {
    client.release();
  }
}

export async function deleteCareerApplication(id: number | string): Promise<boolean> {
  await initDb();
  const client = await getPool().connect();
  try {
    // 1. Fetch file path to clean up disk storage
    const findRes = await client.query(
      `SELECT resume_file_path FROM career_applications WHERE id = $1`,
      [id]
    );

    const res = await client.query(
      `DELETE FROM career_applications WHERE id = $1`,
      [id]
    );

    // 2. Remove physical file from disk if present
    if (findRes.rows.length > 0 && findRes.rows[0].resume_file_path) {
      const rawPath: string = findRes.rows[0].resume_file_path;
      const filename = path.basename(rawPath);
      if (filename) {
        const privatePath = path.join(process.cwd(), "storage", "resumes", filename);
        const publicPath = path.join(process.cwd(), "public", "uploads", "resumes", filename);
        if (fs.existsSync(privatePath)) {
          try { fs.unlinkSync(privatePath); } catch {}
        }
        if (fs.existsSync(publicPath)) {
          try { fs.unlinkSync(publicPath); } catch {}
        }
      }
    }

    return (res.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

export async function getExistingApplication(
  email: string,
  roleId?: number | string,
  roleTitle?: string
): Promise<CareerApplicationType | null> {
  await initDb();
  const client = await getPool().connect();
  try {
    const cleanEmail = email.trim().toLowerCase();
    let query = '';
    let params: any[] = [];

    if (roleId && String(roleId).trim()) {
      query = `
        SELECT * FROM career_applications 
        WHERE LOWER(TRIM(email)) = $1 
          AND (role_id = $2 OR LOWER(TRIM(role_title)) = LOWER(TRIM($3)))
        ORDER BY created_at DESC 
        LIMIT 1
      `;
      params = [cleanEmail, String(roleId).trim(), roleTitle || ''];
    } else {
      query = `
        SELECT * FROM career_applications 
        WHERE LOWER(TRIM(email)) = $1 
          AND LOWER(TRIM(role_title)) = LOWER(TRIM($2))
        ORDER BY created_at DESC 
        LIMIT 1
      `;
      params = [cleanEmail, roleTitle || ''];
    }

    const res = await client.query(query, params);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      roleId: row.role_id,
      roleTitle: row.role_title,
      name: row.name,
      email: row.email,
      phone: row.phone,
      linkedin: row.linkedin,
      portfolio: row.portfolio,
      resumeUrl: row.resume_url,
      resumeFilePath: row.resume_file_path,
      coverLetter: row.cover_letter,
      status: row.status,
      created_at: row.created_at,
    };
  } finally {
    client.release();
  }
}

/* ==========================================================================
   Contact / Appointment Inquiries (Pure PostgreSQL)
   ========================================================================== */

export interface ContactInquiryInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface ContactInquiryType extends ContactInquiryInput {
  id: number;
  status: string;
  created_at: string;
}

export async function saveContactInquiry(
  data: ContactInquiryInput
): Promise<ContactInquiryType> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `INSERT INTO contact_inquiries (name, email, phone, service, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.name.trim(),
        data.email.trim(),
        data.phone ? data.phone.trim() : null,
        data.service ? data.service.trim() : null,
        data.message.trim(),
      ]
    );
    const row = res.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      message: row.message,
      status: row.status,
      created_at: row.created_at,
    };
  } finally {
    client.release();
  }
}

export async function getAllContactInquiries(): Promise<ContactInquiryType[]> {
  await initDb();
  const client = await getPool().connect();
  try {
    const res = await client.query(
      `SELECT * FROM contact_inquiries ORDER BY created_at DESC`
    );
    return res.rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      message: row.message,
      status: row.status,
      created_at: row.created_at,
    }));
  } finally {
    client.release();
  }
}
