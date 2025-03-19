'use client';

import {
  AppShell,
  Burger,
  Container,
  Flex,
  Group,
  NavLink,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HomeIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { icon: HomeIcon, label: 'Home', href: '/' },
  {
    icon: LightningBoltIcon,
    label: 'About',
    href: '/',
    description: 'Coming Soon',
  },
];

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, { toggle: toggleMobile }] = useDisclosure();
  const [isDesktopOpen, { toggle: toggleDesktop }] = useDisclosure(true);
  const [isActive, setIsActive] = useState(0);
  const pathname = usePathname();
  return (
    <AppShell
      padding="md"
      header={{ height: '52px' }}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.violet[0],
        },
      })}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !isMobileOpen, desktop: !isDesktopOpen },
      }}
    >
      <AppShell.Header>
        <Container
          fluid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Group>
            <Burger
              opened={isMobileOpen}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={isDesktopOpen}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Title size="md">Skintelligence</Title>
          </Group>
          <Flex direction="row">
            {navItems.map((item, index) => (
              <NavLink
                href={item.href}
                key={item.label}
                active={index === isActive}
                label={item.label}
                leftSection={<item.icon />}
                onClick={() => setIsActive(index)}
              />
            ))}
          </Flex>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar>
        {navItems.map((item, index) => (
          <NavLink
            href={item.href}
            key={item.label}
            active={index === isActive}
            label={item.label}
            description={item.description}
            leftSection={<item.icon />}
            onClick={() => setIsActive(index)}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main w="100%">{children}</AppShell.Main>
    </AppShell>
  );
};
