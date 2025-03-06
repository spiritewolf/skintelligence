'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
	uri: '/api/graphql', // points to our GraphQL API endpoint
	cache: new InMemoryCache(),
	// For production, consider adding error handling, retries, or additional links.
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
