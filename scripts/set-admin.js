const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Read .env.local if available
function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const newUsername = process.argv[2];
const newName = process.argv[3];

if (!newUsername) {
  console.log(`
Usage:
  node scripts/set-admin.js <new_username> [optional_display_name]

Examples:
  node scripts/set-admin.js karthik
  node scripts/set-admin.js karthik "Karthik Acharya"
`);
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL not found in environment or .env.local");
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function run() {
  const email = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@saanvitech.com').toLowerCase().trim();
  
  const query = newName
    ? `UPDATE admin_users SET username = $1, name = $2 WHERE LOWER(email) = LOWER($3) RETURNING id, email, username, name`
    : `UPDATE admin_users SET username = $1 WHERE LOWER(email) = LOWER($2) RETURNING id, email, username, name`;

  const params = newName ? [newUsername.trim(), newName.trim(), email] : [newUsername.trim(), email];

  const res = await pool.query(query, params);

  if (res.rowCount === 0) {
    console.error(`Admin user with email "${email}" not found.`);
  } else {
    console.log("Admin account successfully updated:");
    console.log(res.rows[0]);
  }

  await pool.end();
}

run().catch(err => {
  console.error("Failed to update admin account:", err.message);
  pool.end();
});
