import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

import { headers } from "next/headers"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const pathname = request.nextUrl.pathname

  if (session?.user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!session?.user && pathname === "/profile") {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile", "/login"],
}