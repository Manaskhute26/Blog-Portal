import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    // Format is "Basic <base64(user:password)>"
    const [scheme, encoded] = basicAuth.split(' ');

    if (scheme?.toLowerCase() === 'basic' && encoded) {
      try {
        // atob is globally available in the Edge runtime
        const decoded = atob(encoded);
        const [username, ...passwordParts] = decoded.split(':');
        const password = passwordParts.join(':'); // In case password contains colons

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (
          expectedUsername &&
          expectedPassword &&
          username === expectedUsername &&
          password === expectedPassword
        ) {
          return NextResponse.next();
        }
      } catch {
        // Malformed base64 payload - fall through to 401
      }
    }
  }

  // Trigger browser's native HTTP Basic Authentication prompt
  return new NextResponse('Unauthorized: Access to Admin Area requires authentication.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  });
}

// Only execute on /admin and any sub-paths
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

