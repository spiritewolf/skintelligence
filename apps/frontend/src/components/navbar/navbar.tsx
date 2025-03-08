import { AppShell, Container, NavLink, Title } from '@mantine/core';
import { HomeIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AppShell
      padding="md"
      header={{ height: '52px' }}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.dark[8],
        },
      })}
    >
      <AppShell.Header h={60} p="md">
        <Container
          fluid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title order={3}>My App</Title>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <NavLink
              href="/"
              label="Home"
              active={pathname === '/'}
              leftSection={<HomeIcon />}
            />
          </div>
        </Container>
      </AppShell.Header>
      {children}
    </AppShell>
  );
}
