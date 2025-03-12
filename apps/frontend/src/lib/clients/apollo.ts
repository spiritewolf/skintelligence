import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_API ||
      'http://localhost:4000/api/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default client;
