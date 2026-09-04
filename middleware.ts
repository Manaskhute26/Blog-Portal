import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  // 1. Root /admin route -> redirect cleanly to dashboard or login
  if (pathname === '/admin') {
    if (sessionCookie) {
      const session = await verifySessionToken(sessionCookie);
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 2. /admin/login route -> public, but if already authenticated, send to dashboard
  if (pathname === '/admin/login') {
    if (sessionCookie) {
      const session = await verifySessionToken(sessionCookie);
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }
    return NextResponse.next();
  }

  // 3. Protected admin routes (/admin/dashboard, /admin/new, etc.)
  if (pathname.startsWith('/admin/')) {
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const session = await verifySessionToken(sessionCookie);
    if (!session) {
      // Invalid or expired token -> clear cookie and redirect to login
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
