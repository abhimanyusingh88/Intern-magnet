import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const pathname = request.nextUrl.pathname

  // If user is authenticated and tries to access /login, redirect to home
  if (session?.user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If user is not authenticated and tries to access protected routes, redirect to login
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