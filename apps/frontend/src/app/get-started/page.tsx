'use client';

import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { ContentWrapper } from '../../components/contentWrapper/contentWrapper';
import { CREATE_USER } from '../api/graphql/queries';

type CreateUserFormData = {
  username: string;
  email?: string;
};

export default function GettingStarted() {
  const router = useRouter();
  const form = useForm<CreateUserFormData>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
    },
  });
  const [createUserMutation] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      if (createUser) {
        notifications.show({
          title: 'Success!',
          message: 'Your user has been created.',
          color: 'violet',
        });
        router.push(`/get-started/questionnaire/${createUser.id}/`);
      }
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    createUserMutation({ variables: { data } });
  };

  return (
    <ContentWrapper>
      <Box w="100%">
        <Container size="xl" py={120}>
          <Grid gutter={40} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
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

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                radius="md"
                p="md"
                bg="var(--mantine-primary-color-6)"
                bd={' 1px solid rgba(255, 255, 255, 0.01) '}
              >
                <Stack>
                  <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput
                      label="Username"
                      placeholder="skincareaddict123"
                      withAsterisk
                      key={form.key('username')}
                      {...form.getInputProps('username')}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Email"
                      mt="md"
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                    />
                    <Group justify="flex-end" mt="md">
                      <Button bg="dark" type="submit">
                        Submit
                      </Button>
                    </Group>
                  </form>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
