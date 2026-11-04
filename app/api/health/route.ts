import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/libs/db";

export const dynamic = "force-dynamic";

/**
 * Health check & Supabase keep-alive endpoint.
 * Pings the database to keep Supabase free-tier project active and prevent auto-pause.
 * Can be called manually or scheduled via Vercel Cron or an external cron service (cron-job.org).
 */
export async function GET(req: NextRequest) {
  const startTime = Date.now();

  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is configured, enforce authorization check
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Also allow Vercel's built-in cron header
      const vercelCronHeader = req.headers.get("x-vercel-cron");
      if (!vercelCronHeader) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    const pool = getPool();
    const result = await pool.query("SELECT 1 AS alive, NOW() AS db_time;");
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      status: "ok",
      message: "Database pinged successfully. Supabase will stay active.",
      dbTime: result.rows[0]?.db_time,
      latencyMs: durationMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Keep-Alive / Health API] Database ping error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message || "Failed to ping database",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

