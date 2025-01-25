import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api(.*)",
  "/api/webhooks(.*)"
]);

export default clerkMiddleware((auth, request) => {
  // If the current route is not public, protect it
  if (!isPublicRoute(request)) {
    return auth.protect().then(() => NextResponse.next());
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|.*\\..*).*)",
    // Match all API routes
    "/api/(.*)",
    // Match all routes under user-board
    "/(user-board)(.*)"
  ],
};