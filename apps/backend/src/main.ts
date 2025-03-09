import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createContext } from './context';
import { schema } from './schema';

async function main() {
  const app = express();
  const port = process.env.PORT || 4000;

  const server = new ApolloServer({
    schema,
    context: createContext, // later integrate Prisma and auth here
  });

  // app.use(
  //   cors({
  //     origin: `http://localhost:${port}/api${server.graphqlPath}`,
  //     credentials: true,
  //   })
  // );

  await server.start();
  server.applyMiddleware({
    app,
    path: '/api/graphql',
    cors: {
      origin: 'http://localhost:4200',
      credentials: true,
    },
  });

  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}/api${server.graphqlPath}`
    );
  });
}

main();
