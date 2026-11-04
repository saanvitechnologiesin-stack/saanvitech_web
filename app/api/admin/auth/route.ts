import { NextRequest, NextResponse } from "next/server";
import { getAdminUserByIdentifier, getAdminUserByEmail } from "@/libs/db";
import { verifyPassword, generateSessionToken, verifySessionToken } from "@/libs/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.email || body.username || body.identifier || "").trim();
    const { password, rememberMe } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Username or email and password are required." },
        { status: 400 }
      );
    }

    // 1. Look up user by username or email in database
    const adminUser = await getAdminUserByIdentifier(identifier);
    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, adminUser.password_hash);
    const userName = adminUser.name || "Admin";

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    // Generate signed session token using user's real email
    const token = generateSessionToken(adminUser.email);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        email: adminUser.email,
        name: userName,
        username: adminUser.username || adminUser.email.split('@')[0],
      },
    });

    // Set HTTP-only cookie: persistent if rememberMe is true, session cookie if false
    const cookieOptions: any = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };

    if (rememberMe !== false) {
      // 30 days persistence when Remember Me is enabled (default)
      cookieOptions.maxAge = 30 * 24 * 60 * 60;
    }

    response.cookies.set("admin_session", token, cookieOptions);

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Authentication error" },
      { status: 500 }
    );
  }
}

// Check current session
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") ||
                       req.headers.get("x-admin-key") ||
                       req.cookies.get("admin_session")?.value;

    if (!authHeader) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = verifySessionToken(authHeader);
    if (!session) {
      return NextResponse.json({ authenticated: false, error: "Session expired or invalid" }, { status: 401 });
    }

    const adminUser = await getAdminUserByEmail(session.email);

    return NextResponse.json({
      authenticated: true,
      user: {
        email: session.email,
        name: adminUser?.name || "Admin",
        username: adminUser?.username || session.email.split('@')[0],
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
