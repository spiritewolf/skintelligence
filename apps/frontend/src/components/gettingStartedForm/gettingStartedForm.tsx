'use client';

import { ContentWrapper } from '@/skintelligence/frontend/components/contentWrapper';
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
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CREATE_USER } from '../../app/api/graphql/route';

type CreateUserFormData = {
  username: string;
  email: string;
};

export function GettingStartedForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const form = useForm<CreateUserFormData>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => (value.length > 2 ? null : 'Invalid username'),
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      if (res && res.createUser) {
        const user = res.createUser;
        console.log('res', res);
        signIn('credentials', {
          id: user.id,
          username: user.username,
          email: user.email,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            notifications.show({
              title: 'Success!',
              message:
                'Thanks for that info! Lets set up your skincare routine.',
              color: 'violet',
            });
            router.push(`/skincare-questionnaire/${user?.id}/`);
          }
        });
      }
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: 'Your user could not be created.',
        color: 'red',
      });
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    const { username, email } = data;
    createUser({
      variables: {
        data: {
          username,
          email,
        },
      },
    });
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
                bd={' 1px solid rgba(255, 255, 255, 0.01) '}
                bg="var(--mantine-primary-color-1)"
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
                      withAsterisk
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                    />
                    <Group justify="flex-end" mt="md">
                      <Button type="submit" loading={status === 'loading'}>
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
