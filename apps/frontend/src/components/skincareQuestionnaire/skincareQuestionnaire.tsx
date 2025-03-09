'use client';

import { useQuery } from '@apollo/client';
import { Container, Text } from '@mantine/core';
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
      <Container>
        {!loading && !error && data.username ? (
          <Text>Hello, {data.username}</Text>
        ) : null}
      </Container>
    </ContentWrapper>
  );
};
