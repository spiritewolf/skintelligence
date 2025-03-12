'use client';

import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { RocketIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ContentWrapper } from '../components/contentWrapper/contentWrapper';
import classes from '../styles/hero1.module.css';
import { GET_USERS } from './api/graphql/route';

export default function Index() {
  const { data, loading, error } = useQuery(GET_USERS);
  const router = useRouter();
  return (
    <ContentWrapper>
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
                    Skintelligence
                  </Text>
                </Group>

                <Title className={classes?.title} order={1} size="h1">
                  Unlock Your Best Skin with AI-Powered Precision
                </Title>

                <Text size="xl" c="dimmed" maw={600}>
                  Skintelligence is your personal skincare expert, using AI to
                  craft a custom skincare routine tailored to your skin’s unique
                  needs. By answering a set of targeted questions, you’ll
                  receive a science-backed regimen designed for your skin type,
                  concerns, and goals. Say goodbye to guesswork and hello to
                  radiant, healthy skin—personalized just for you.
                </Text>

                <Group mt="xl">
                  <Button
                    size="lg"
                    leftSection={<RocketIcon />}
                    onClick={() => router.push('/get-started')}
                  >
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
    </ContentWrapper>
  );
}
