import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/api/graphql', // ✅ Your GraphQL API URL
  documents: 'apps/frontend/src/app/api/graphql/**/*.ts', // ✅ Path to your queries/mutations
  generates: {
    'apps/frontend/src/app/api/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
