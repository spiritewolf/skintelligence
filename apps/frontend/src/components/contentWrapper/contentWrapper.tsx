import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import React from 'react';
import Navbar from '../navbar/navbar';

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
  return (
    <Container size={'xl'} h={'100%'} px={'0px'}>
      <Navbar>
        <Stack h={'100%'} w={'100%'} p={{ sm: 'md', md: '3xl' }} pt={'2rem'}>
          <Stack px={'md'}>
            <Box>
              <Title order={1}>{title}</Title>
              <Text>{description}</Text>
            </Box>
            {children}
          </Stack>
        </Stack>
      </Navbar>
    </Container>
  );
};
