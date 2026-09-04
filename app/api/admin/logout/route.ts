import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(): Promise<Response> {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.',
    redirect: '/admin/login',
  });

  // Expire and clear session cookie immediately server-side
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
