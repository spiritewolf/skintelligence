'use client';

import { useQuery } from '@apollo/client';
import { Box, Container, Text } from '@mantine/core';
import { GET_USER } from '../../app/api/graphql/queries';
import { ContentWrapper } from '../contentWrapper/contentWrapper';

export const SkincareQuestionnaire = ({ userId }: { userId: string }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      where: { id: userId },
    },
  });

  console.log('-------', userId, error, loading, data);

  return (
    <ContentWrapper>
      <Box w="100%">
        <Container size="xl" py={120}>
          {!loading && !error && data.user.username ? (
            <Text color="blue">Hello, {data.user.username}</Text>
          ) : null}
        </Container>
      </Box>
    </ContentWrapper>
  );
};
