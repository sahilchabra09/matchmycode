// middleware.ts
import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api(.*)",
  "/api/webhooks(.*)"
])

export default clerkMiddleware(async (auth, req) => {
  // 1. Handle OPTIONS requests explicitly (the "preflight" request)
  if (req.method === "OPTIONS") {
    const preflightResponse = NextResponse.json({}, { status: 200 })
    preflightResponse.headers.set("Access-Control-Allow-Origin", "*")
    preflightResponse.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE")
    preflightResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return preflightResponse
  }

  // 2. Otherwise, continue with Clerk’s logic:
  if (!isPublicRoute(req)) {
    // Protect the route
    await auth.protect()
  }

  // 3. Set CORS headers on normal (non-OPTIONS) requests, too
  const res = NextResponse.next()
  res.headers.set("Access-Control-Allow-Origin", "*")
  return res
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|.*\\..*).*)",
    // Match all API routes
    "/api/(.*)",
    // Match all routes under user-board
    "/(user-board)(.*)"
  ],
}
