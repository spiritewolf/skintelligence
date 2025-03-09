import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createContext } from './context';
import { schema } from './schema';

async function main() {
  const app = express();
  const port = process.env.PORT || 4000;
  // app.use(
  //   cors({
  //     origin: `http://localhost:${port}`,
  //     credentials: true,
  //   })
  // );

  const server = new ApolloServer({
    schema,
    context: createContext, // later integrate Prisma and auth here
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}/api${server.graphqlPath}`
    );
  });
}

main();
