'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Grid,
  ThemeIcon,
  Box,
  Paper,
} from '@mantine/core';
import { GET_USERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { GitHubLogoIcon, RocketIcon } from '@radix-ui/react-icons';
import classes from './hero1.module.css';
export default function Index() {
  const { data, loading, error } = useQuery(GET_USERS);
  return (
    <Box>
      <Container size="xl" py={120}>
        <Grid gutter={40} align="center">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <Group gap={'xs'}>
                <ThemeIcon size="lg" radius="md" variant="transparent">
                  <RocketIcon
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-primary-color-filled)"
                  />
                </ThemeIcon>
                <Text
                  fw={500}
                  size="sm"
                  style={{ letterSpacing: 1 }}
                  tt="uppercase"
                >
                  Skingenie
                </Text>
              </Group>

              <Title className={classes?.title} order={1} size="h1">
                AI powered skincare!
              </Title>

              <Text size="xl" c="dimmed" maw={600}>
                Experience our cool stuff.
              </Text>

              <Group mt="xl">
                <Button size="lg" leftSection={<RocketIcon />}>
                  Get Started
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper
              mih={320}
              radius="md"
              p="xl"
              bg={'rgba(255, 255, 255, 0.1)'}
              bd={' 1px solid rgba(255, 255, 255, 0.1) '}
            ></Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
