'use client';

import {
  useGetUserQuery,
  useSubmitResponsesForRecommendationMutation,
} from '@/skintelligence/frontend/app/api/graphql';
import {
  Box,
  Button,
  Card,
  Container,
  LoadingOverlay,
  Radio,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { ContentWrapper } from '../contentWrapper/contentWrapper';
import { questionnaire } from './constants';

type QuestionnaireResponse = {
  responses: {
    questionId: string;
    answer: string;
  }[];
};

export const SkincareQuestionnaire = ({ userId }: { userId: string }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isLastStep = currentStep === questionnaire.length - 1;
  // const router = useRouter();

  const initialValues: QuestionnaireResponse = {
    responses: questionnaire.map((q) => ({
      questionId: q.questionId,
      answer: '',
    })),
  };

  const { data, loading: isGetUserLoading } = useGetUserQuery();

  const handleNext = (values: QuestionnaireResponse) => {
    if (isEmpty(values.responses[currentStep].answer)) {
      alert('Please select an answer');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);
  const [getRecommendations, { loading: isSubmitResponsesLoading }] =
    useSubmitResponsesForRecommendationMutation({
      onCompleted: (res) => {
        if (res) {
          console.log('TODO', res);
        }
      },
    });

  const onSubmit = async (values: QuestionnaireResponse) => {
    if (values) {
      await getRecommendations({
        variables: {
          data: { responses: values.responses, userId },
        },
      });
    }
  };

  const isLoading = isGetUserLoading || isSubmitResponsesLoading;

  return (
    <ContentWrapper>
      <Box w="100%">
        <Container size="xl" w="100%">
          {isLoading || !data ? (
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
          ) : (
            <>
              <Box>
                <Title
                  order={2}
                  ta="center"
                  size={40}
                  fw={800}
                  pos="relative"
                  style={{
                    fill: 'linear-gradient(180deg, var(--mantine-primary-color-filled), var(--mantine-primary-color-8))',
                  }}
                >
                  Skincare Assessment
                </Title>
                <Text
                  c="dimmed"
                  ta="center"
                  size="lg"
                  maw={600}
                  mx="auto"
                  mt="md"
                >
                  {data?.user?.username
                    ? `Hello, ${data.user.username}! `
                    : null}
                  This questionnaire is designed to understand your skin type
                  and concerns so that we can create personalized
                  recommendations for your skincare routine.
                </Text>
              </Box>
              <Card shadow="sm" padding="lg" radius="md" withBorder mt={10}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    if (!values.responses.some((r) => r.answer === '')) {
                      onSubmit(values);
                    }
                    console.log('Final questionnaire values:', values);
                  }}
                >
                  {({ values, setFieldValue, handleSubmit }) => {
                    const currentQuestion = questionnaire[currentStep];
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Text fw={500} size="lg">
                          {currentQuestion.question}
                        </Text>
                        <Space h="md" />
                        <Radio.Group
                          value={values.responses[currentStep].answer}
                          onChange={(value) =>
                            setFieldValue(
                              `responses[${currentStep}].answer`,
                              value
                            )
                          }
                        >
                          {currentQuestion.options.map((option, index) => (
                            <Radio
                              key={index}
                              value={option.value}
                              label={option.label}
                              mt="xs"
                            />
                          ))}
                        </Radio.Group>
                        <Space h="xl" />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {currentStep > 0 ? (
                            <Button
                              variant="default"
                              onClick={handleBack}
                              disabled={isSubmitResponsesLoading}
                            >
                              Back
                            </Button>
                          ) : null}
                          {currentStep >= 0 &&
                          currentStep !== questionnaire.length - 1 ? (
                            <Button
                              onClick={() => handleNext(values)}
                              disabled={isSubmitResponsesLoading}
                            >
                              Next
                            </Button>
                          ) : null}
                          {isLastStep ? (
                            <Button
                              type="submit"
                              disabled={isSubmitResponsesLoading}
                            >
                              Submit
                            </Button>
                          ) : null}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Card>
            </>
          )}
        </Container>
      </Box>
    </ContentWrapper>
  );
};
