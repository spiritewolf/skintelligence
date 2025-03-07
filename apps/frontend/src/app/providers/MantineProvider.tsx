'use client';

import { MantineProvider as Provider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactNode } from 'react';
import '../../styles/style.css';

import { shadcnCssVariableResolver } from '../cssVariableResolver';
import { shadcnTheme } from '../theme';

export default function MantineProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      theme={shadcnTheme}
      cssVariablesResolver={shadcnCssVariableResolver}
      defaultColorScheme="dark"
    >
      {children}
    </Provider>
  );
}
