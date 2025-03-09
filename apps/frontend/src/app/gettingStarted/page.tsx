'use client';

import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContentWrapper } from '../../components/contentWrapper/contentWrapper';
import { GET_USERS } from '../api/graphql/queries';

type GettingStartedFormData = {
  username: string;
  email?: string;
};

export default function GettingStarted() {
  const form = useForm<GettingStartedFormData>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
    },

    validate: {
      email: (value) =>
        value && /^\S+@\S+$/.test(value) ? null : 'Invalid email',
    },
  });
  const { data, loading, error } = useQuery(GET_USERS);
  return (
    <ContentWrapper>
      <Box w="100%">
        <Container size="xl" py={120}>
          <Grid gutter={40} align="center">
            <Grid.Col span={6}>
              <Stack gap="xl">
                <Title
                  order={1}
                  size="h1"
                  style={{
                    color: 'var(--mantine-primary-color-4)',
                  }}
                >
                  First, tell us about yourself.
                </Title>

                <Text size="xl" c="dimmed" maw={600}>
                  We just need a little info to get started
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Paper
                radius="md"
                p="md"
                bg="var(--mantine-primary-color-6)"
                bd={' 1px solid rgba(255, 255, 255, 0.01) '}
              >
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    label="Username"
                    placeholder="skincareaddict123"
                    withAsterisk
                    key={form.key('username')}
                    bg="dark"
                  />
                  <TextInput label="Email" placeholder="Email" mt="md" />
                </form>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
