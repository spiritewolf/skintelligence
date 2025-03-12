'use client';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import client from '../lib/clients/apollo';
import '../styles/style.css';
import { shadcnCssVariableResolver } from './cssVariableResolver';
import { shadcnTheme } from './theme';

export function SkintelligenceProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <MantineProvider
          theme={shadcnTheme}
          cssVariablesResolver={shadcnCssVariableResolver}
          //   defaultColorScheme="dark"
        >
          {children}
        </MantineProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
