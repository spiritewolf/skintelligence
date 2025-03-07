import {
  Box,
  Button,
  Container,
  Group,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { HomeIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import classes from './header.module.scss';

type ContentWrapperProps = {
  children: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
};

type MenuItem = {
  id: string;
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

export const ContentWrapper = ({
  children,
  title,
  description,
}: ContentWrapperProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems: MenuItem[] = [
    { id: 'home', href: '/', label: 'Home', icon: HomeIcon },
  ];
  return (
    <Container size={'xl'} h={'100%'} px={'0px'}>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Box miw={rem(140)}>
            <Text size="md" fw={'bolder'}>
              Skintelligence
            </Text>
          </Box>
          <Group gap={5} visibleFrom="md">
            {menuItems.map((menuItem, idx) => (
              <Button
                variant="transparent"
                size="sm"
                key={menuItem.label}
                className={classes.link}
                //  c={isActive ? "var(--mantine-primary-color-filled)" : undefined}
                onClick={() => router.push(menuItem.href)}
                justify="center"
              >
                {menuItem.label}
              </Button>
            ))}
          </Group>
        </div>
      </header>

      <Stack h={'100%'} w={'100%'} p={{ sm: 'md', md: '3xl' }} pt={'2rem'}>
        <Stack px={'md'}>
          <Box>
            <Title order={1}>{title}</Title>
            <Text>{description}</Text>
          </Box>
          {children}
        </Stack>
      </Stack>
    </Container>
  );
};
