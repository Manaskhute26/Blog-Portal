import { NextResponse } from 'next/server';
import { verifyAdminPassword, createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/auth';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '@/lib/rate-limit';

export async function POST(req: Request): Promise<Response> {
  try {
    // Extract client IP address for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1');

    // 1. Check Rate Limit
    const rateCheck = checkRateLimit(clientIp);
    if (rateCheck.limited) {
      const waitMinutes = Math.ceil((rateCheck.retryAfterSeconds || 60) / 60);
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Account temporarily locked for ${waitMinutes} minute(s).`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';

    // 2. Validate Username
    if (username.trim() !== expectedUsername.trim()) {
      const { locked, remainingAttempts } = recordFailedAttempt(clientIp);
      const msg = locked
        ? 'Maximum attempts reached. Account locked for 15 minutes.'
        : `Invalid credentials. (${remainingAttempts} attempt(s) remaining)`;

      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // 3. Verify Hashed Password
    const isPasswordValid = await verifyAdminPassword(password);
    if (!isPasswordValid) {
      const { locked, remainingAttempts } = recordFailedAttempt(clientIp);
      const msg = locked
        ? 'Maximum attempts reached. Account locked for 15 minutes.'
        : `Invalid credentials. (${remainingAttempts} attempt(s) remaining)`;

      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // 4. Success: Reset rate-limit counter
    resetAttempts(clientIp);

    // 5. Generate secure JWT session token
    const token = await createSessionToken({
      username: expectedUsername,
      role: 'admin',
    });

    const response = NextResponse.json({
      success: true,
      redirect: '/admin/dashboard',
    });

    // 6. Set HTTP-Only, Secure, SameSite session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error('Login error in /api/admin/login:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during login.' },
      { status: 500 }
    );
  }
}
