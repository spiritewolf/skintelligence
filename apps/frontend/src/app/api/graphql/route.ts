import { gql } from '@apollo/client';

export const User = gql`
  fragment UserFields on User {
    id
    username
    email
    session {
      id
      expiresAt
      token
    }
  }
`;

export const SkincareRecommendation = gql`
  fragment SkincareRecommendationFields on SkincareRecommendation {
    id
    userId
    products {
      ...SkincareProductFields
    }
  }
`;

export const SkincareProduct = gql`
  fragment SkincareProductFields on SkincareProduct {
    id
    name
    description
    link
    category
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      ...UserFields
    }
  }
`;

export const SUBMIT_RESPONSES_FOR_RECOMMENDATION = gql`
  mutation SubmitResponsesForRecommendation(
    $data: SubmitResponsesForRecommendationData!
  ) {
    submitResponsesForRecommendation(data: $data) {
      ...SkincareRecommendationFields
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      ...UserFields
    }
  }
`;
