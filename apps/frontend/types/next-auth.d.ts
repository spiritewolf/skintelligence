import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email?: string | null;
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username: string;
    email?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    userId: string;
    username: string;
    email?: string | null;
    expiresAt?: string | null;
  }
}
