'use client';

import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Fieldset,
  Paper,
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
      <Box>
        <Container size="xl" py={120}>
          <Title order={1} size="h1">
            First, tell us about yourself.
          </Title>

          <Text size="xl" c="dimmed" maw={600}>
            We just need a litttle info to get started
          </Text>

          <Paper
            mih={320}
            radius="md"
            p="xl"
            bg={'rgba(255, 255, 255, 0.1)'}
            bd={' 1px solid rgba(255, 255, 255, 0.1) '}
          >
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Fieldset>
                <TextInput
                  label="Username"
                  placeholder="skincareaddict123"
                  withAsterisk
                  key={form.key('username')}
                />
                <TextInput label="Email" placeholder="Email" mt="md" />
              </Fieldset>
            </form>
          </Paper>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
