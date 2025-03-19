'use client';

import { Box, Container, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { Navbar } from '../navbar/navbar';

type ContentWrapperProps = {
  children: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
};

export const ContentWrapper = ({
  children,
  title,
  description,
}: ContentWrapperProps) => {
  return (
    <Container size={'xl'} h={'100%'} px={'0px'} w="100%">
      <Navbar>
        <Stack p={{ sm: 'md', md: 'md', xl: '3xl' }} w="100%" h="100%">
          <Box>
            <Title order={1}>{title}</Title>
            <Text>{description}</Text>
          </Box>
          {children}
        </Stack>
      </Navbar>
    </Container>
  );
};
