import { createYoga } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Define your GraphQL schema
const typeDefs = /* GraphQL */ `
	type Query {
		hello: String!
		time: String!
	}
`;

// Define resolvers with added capabilities (e.g., returning current server time)
const resolvers = {
	Query: {
		hello: () => 'Hello, world!',
		time: () => new Date().toISOString(),
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

// Create the Yoga instance
const yoga = createYoga({
	schema,
	graphqlEndpoint: '/api/graphql',
});

// Use the Edge runtime for faster, globally distributed responses
export const config = {
	runtime: 'edge',
};

export default async function handler(request: NextRequest) {
	return yoga(request);
}
