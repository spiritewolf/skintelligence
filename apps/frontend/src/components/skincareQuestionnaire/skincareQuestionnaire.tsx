'use client';

import { useQuery } from '@apollo/client';
import { Box, Button, Container, Radio, Space, Text } from '@mantine/core';
import { Form, Formik, FormikErrors } from 'formik';
import { useState } from 'react';
import { GET_USER } from '../../app/api/graphql/queries';
import { ContentWrapper } from '../contentWrapper/contentWrapper';
import { questionnaire } from './constants';

type SkincareQuestionnaireFormData = {
  responses: string[];
};

type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => Promise<void | FormikErrors<SkincareQuestionnaireFormData>>;

export const SkincareQuestionnaire = ({ userId }: { userId: string }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isLastStep = currentStep === questionnaire.length - 1;

  // Initialize a responses array with an empty string for each question.
  const initialValues: SkincareQuestionnaireFormData = {
    responses: questionnaire.map(() => ''),
  };

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      where: { id: userId },
    },
  });

  const handleNext = (
    values: SkincareQuestionnaireFormData,
    setFieldValue: SetFieldValue
  ) => {
    // Optional: you might want to validate that the user picked an option
    if (!values.responses[currentStep]) {
      alert('Please select an answer');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);

  //   const handleSubmit = (values: , actions) => {

  //     }
  //   };

  return (
    <ContentWrapper>
      <Box w="100%">
        <Container size="xl" py={120}>
          {!loading && !error && data.user.username ? (
            <Text color="blue">Hello, {data.user.username}</Text>
          ) : null}
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log('Final questionnaire values:', values);
              // You can handle submission (e.g., sending to an API) here.
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Text fw={500} size="lg">
                  {questionnaire[currentStep].question}
                </Text>
                <Space h="md" />
                <Radio.Group
                  value={values.responses[currentStep]}
                  onChange={(value) =>
                    setFieldValue(`responses[${currentStep}]`, value)
                  }
                >
                  {questionnaire[currentStep].options.map((option, index) => (
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
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {currentStep > 0 && (
                    <Button variant="default" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  {isLastStep ? (
                    <Button type="submit">Submit</Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleNext(values, setFieldValue)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </ContentWrapper>
  );
};
