import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GET_USER } from './src/app/api/graphql/route';
import client from './src/lib/clients/apollo';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        id: { label: 'ID', type: 'text' },
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('Login failed: No credentials provided');
          throw new Error('Invalid credentials, access denied.');
        }

        try {
          const { data } = await client.query({
            query: GET_USER,
          });

          console.log('data', data);

          return {
            id: credentials.id,
            username: credentials.username,
            email: credentials.email,
          };
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Internal server error.');
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 3600 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      if (token.exp && Number(token.exp) < Date.now() / 1000) {
        console.log('Token expired. Refresh required.');
        throw new Error('Token expired');
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
      } else {
        session.user = {
          id: token.id as string,
          username: token.username as string,
          email: token.email,
        }; //storedSession && new Date(storedSession.expiresAt)
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/get-started',
  },
};
