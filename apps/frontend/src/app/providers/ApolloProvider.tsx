'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql', // points to our GraphQL API endpoint
  cache: new InMemoryCache(),
  // For production, consider adding error handling, retries, or additional links.
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
