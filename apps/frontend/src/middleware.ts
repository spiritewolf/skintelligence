import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('Middleware running for:', req.nextUrl.pathname);
  },
  {
    pages: {
      signIn: '/get-started',
    },
  }
);

export const config = { matcher: ['/skincare-questionnaire/:path*'] };
