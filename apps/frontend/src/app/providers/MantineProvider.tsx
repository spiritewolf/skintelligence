'use client';

import { createTheme, MantineProvider as Provider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactNode } from 'react';
import { shadcnTheme } from '../theme/theme';
import { shadcnCssVariableResolver } from '../theme/cssVariableResolver';
import '../theme/style.css';

export default function MantineProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      theme={shadcnTheme}
      cssVariablesResolver={shadcnCssVariableResolver}
    >
      {children}
    </Provider>
  );
}
