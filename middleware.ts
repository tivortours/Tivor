import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "tivor.ae";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // If accessed via any non-canonical domain (e.g. *.vercel.app), redirect to canonical
  if (host && host !== CANONICAL_HOST && !host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
