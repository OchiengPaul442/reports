import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define an interface for the token
interface Token {
  exp: number;
  [key: string]: any;
}

export const config = {
  matcher: ["/files", "/report", "/settings"],
};

export async function middleware(req: any) {
  // Use getToken to access the session on the server side
  const token = (await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  })) as Token;

  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login page if they are not authenticated or the token has expired
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
