import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      session {
        id
        expiresAt
        token
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      email
      session {
        id
        expiresAt
        token
      }
    }
  }
`;

export const VALIDATE_TOKEN = gql`
  query ValidateToken($where: SessionTokenWhereInput!) {
    validateToken(where: $where) {
      id
      username
      email
      session {
        id
        expiresAt
        token
      }
    }
  }
`;

export const SUBMIT_RESPONSES_FOR_RECOMMENDATION = gql`
  mutation SubmitResponsesForRecommendation(
    $data: SubmitResponsesForRecommendationData!
  ) {
    submitResponsesForRecommendation(data: $data) {
      id
      userId
      products {
        name
        description
        link
        category
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
      session {
        id
        expiresAt
        token
      }
    }
  }
`;
