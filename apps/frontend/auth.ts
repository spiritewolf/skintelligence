import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CREATE_USER } from './src/app/api/graphql/route';
import client from './src/lib/clients/apollo';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Guest Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: CREATE_USER,
            variables: {
              data: {
                username: credentials?.username,
                email: credentials?.email,
              },
            },
          });

          if (!data?.createUser) {
            console.error('Login failed: No user returned from GraphQL');
            throw new Error('Invalid credentials');
          }

          return {
            id: data.createUser.id,
            username: data.createUser.username,
            email: data.createUser.email,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 86400 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('=========SESSION', session, token);
      if (session.user) {
        // session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
