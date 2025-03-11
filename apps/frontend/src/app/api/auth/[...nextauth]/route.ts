import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { SkintelligenceDb } from '@skintelligence/backend/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(SkintelligenceDb),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER!, // non-null assertion because these must be set
      from: process.env.EMAIL_FROM!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // one day in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
