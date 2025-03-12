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

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      username
      email
    }
  }
`;
