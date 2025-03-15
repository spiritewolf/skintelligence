import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

export const GET_USER = gql`
  query GetUser($where: UserWhereInput!) {
    user(where: $where) {
      id
      username
      email
    }
  }
`;

export const SUBMIT_RESPONSES_FOR_RECOMMENDATION = gql`
  mutation SubmitResponsesForRecommendation(
    $data: SubmitResponsesForRecommendationData!
  ) {
    submitResponsesForRecommendation(data: $data) {
      cleanser {
        name
        description
        link
      }
      serum {
        name
        description
        link
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      username
      email
    }
  }
`;
