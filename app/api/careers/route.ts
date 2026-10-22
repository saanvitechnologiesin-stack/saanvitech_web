import { NextRequest, NextResponse } from "next/server";
import { getAllCareers, createCareer, searchCareers, getCareerFilterOptions } from "@/libs/db";
import { verifySessionToken } from "@/libs/auth";

export const dynamic = 'force-dynamic';

function checkAdmin(req: NextRequest): boolean {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ||
                req.headers.get("x-admin-key") ||
                req.cookies.get("admin_session")?.value;

  if (!token) return false;

  const session = verifySessionToken(token);
  if (session) return true;

  const expectedKey = process.env.ADMIN_SECRET_KEY || "saanvi-admin-2026";
  return token === expectedKey;
}

export async function GET(req: NextRequest) {
  try {
    const isAdmin = checkAdmin(req);
    const url = new URL(req.url);
    const includeInactive = isAdmin && url.searchParams.get("all") === "true";

    // If admin requests all positions for the admin management table:
    if (includeInactive) {
      const careers = await getAllCareers(true);
      return NextResponse.json({ success: true, careers });
    }

    // Backend Search & Filtering via PostgreSQL
    const q = url.searchParams.get("q") || "";
    const sortBy = (url.searchParams.get("sort") === "oldest" ? "oldest" : "newest") as "newest" | "oldest";

    const filterOptions = await getCareerFilterOptions();
    const knownLocations = filterOptions.locations;
    const knownTypes = filterOptions.types;
    const knownExperiences = filterOptions.experiences;

    const parseFilterParam = (paramKey: string, knownList: string[]): string[] | undefined => {
      const allVals = url.searchParams.getAll(paramKey).map(s => s.trim()).filter(Boolean);
      if (allVals.length === 0) return undefined;

      const result: string[] = [];
      for (const val of allVals) {
        if (knownList.includes(val)) {
          result.push(val);
        } else if (val.includes("|")) {
          result.push(...val.split("|").map(s => s.trim()).filter(Boolean));
        } else if (val.includes(",")) {
          const parts = val.split(",").map(s => s.trim()).filter(Boolean);
          const anyPartKnown = parts.some(p => knownList.includes(p));
          if (anyPartKnown) {
            result.push(...parts);
          } else {
            result.push(val);
          }
        } else {
          result.push(val);
        }
      }
      return result.length > 0 ? Array.from(new Set(result)) : undefined;
    };

    const locations = parseFilterParam("locations", knownLocations);
    const types = parseFilterParam("types", knownTypes);
    const experiences = parseFilterParam("experiences", knownExperiences);

    const { careers, total } = await searchCareers({
      includeInactive: false,
      q,
      locations,
      types,
      experiences,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      careers,
      total,
      filterOptions,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin passcode required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      department,
      location,
      type,
      experience,
      salary,
      overview,
      responsibilities,
      requirements,
      benefits,
      is_active,
    } = body;

    if (!title || !department || !location || !type || !overview) {
      return NextResponse.json(
        { success: false, error: "Title, department, location, type, and overview are required." },
        { status: 400 }
      );
    }

    const newCareer = await createCareer({
      title,
      slug: body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      department,
      location,
      type,
      experience: experience || "",
      salary: salary || "",
      overview,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      requirements: Array.isArray(requirements) ? requirements : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      is_active: body.status ? body.status === 'published' : (is_active ?? true),
      status: body.status || (is_active === false ? 'draft' : 'published'),
    });

    return NextResponse.json({ success: true, career: newCareer }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create career posting" },
      { status: 500 }
    );
  }
}
