import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    console.log('Middleware running for:', req.nextUrl.pathname);
    const token = await getToken({ req });
    console.log('------', token);
    if (token) {
      try {
        const now = Math.floor(Date.now() / 1000);
        if (token.exp && Number(token.exp) < now) {
          console.log('Session expired. Redirecting to login.');
          return NextResponse.redirect(new URL('/get-started', req.url));
        }
      } catch (error) {
        console.error('Failed to decode JWT:', error);
      }
    }
  },
  {
    pages: {
      signIn: '/get-started',
    },
  }
);

export const config = { matcher: ['/skincare-questionnaire/:path*'] };
