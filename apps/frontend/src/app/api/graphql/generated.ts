import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  submitResponsesForRecommendation: SkincareRecommendation;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationSubmitResponsesForRecommendationArgs = {
  data: SubmitResponsesForRecommendationData;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QuestionnaireResponse = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type SessionTokenWhereInput = {
  id: Scalars['ID']['input'];
};

export enum SkincareCategoryEnum {
  Cleanser = 'CLEANSER',
  Moisturizer = 'MOISTURIZER',
  Serum = 'SERUM',
  Sunscreen = 'SUNSCREEN'
}

export type SkincareProduct = {
  __typename?: 'SkincareProduct';
  category: SkincareCategoryEnum;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type SkincareRecommendation = {
  __typename?: 'SkincareRecommendation';
  id: Scalars['ID']['output'];
  products: Array<SkincareProduct>;
  userId: Scalars['ID']['output'];
};

export type SubmitResponsesForRecommendationData = {
  responses: Array<QuestionnaireResponse>;
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  session: Session;
  username: Scalars['String']['output'];
};

export type UserWhereInput = {
  id: Scalars['ID']['input'];
};

export type UserFieldsFragment = { __typename?: 'User', id: string, username: string, email?: string | null, session: { __typename?: 'Session', id: string, expiresAt: string, token: string } };

export type SkincareRecommendationFieldsFragment = { __typename?: 'SkincareRecommendation', id: string, userId: string, products: Array<{ __typename?: 'SkincareProduct', id: string, name: string, description: string, link?: string | null, category: SkincareCategoryEnum }> };

export type SkincareProductFieldsFragment = { __typename?: 'SkincareProduct', id: string, name: string, description: string, link?: string | null, category: SkincareCategoryEnum };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, email?: string | null, session: { __typename?: 'Session', id: string, expiresAt: string, token: string } } | null };

export type SubmitResponsesForRecommendationMutationVariables = Exact<{
  data: SubmitResponsesForRecommendationData;
}>;


export type SubmitResponsesForRecommendationMutation = { __typename?: 'Mutation', submitResponsesForRecommendation: { __typename?: 'SkincareRecommendation', id: string, userId: string, products: Array<{ __typename?: 'SkincareProduct', id: string, name: string, description: string, link?: string | null, category: SkincareCategoryEnum }> } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, email?: string | null, session: { __typename?: 'Session', id: string, expiresAt: string, token: string } } };

export const UserFieldsFragmentDoc = gql`
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
export const SkincareProductFieldsFragmentDoc = gql`
    fragment SkincareProductFields on SkincareProduct {
  id
  name
  description
  link
  category
}
    `;
export const SkincareRecommendationFieldsFragmentDoc = gql`
    fragment SkincareRecommendationFields on SkincareRecommendation {
  id
  userId
  products {
    ...SkincareProductFields
  }
}
    ${SkincareProductFieldsFragmentDoc}`;
export const GetUserDocument = gql`
    query GetUser {
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const SubmitResponsesForRecommendationDocument = gql`
    mutation SubmitResponsesForRecommendation($data: SubmitResponsesForRecommendationData!) {
  submitResponsesForRecommendation(data: $data) {
    ...SkincareRecommendationFields
  }
}
    ${SkincareRecommendationFieldsFragmentDoc}`;
export type SubmitResponsesForRecommendationMutationFn = Apollo.MutationFunction<SubmitResponsesForRecommendationMutation, SubmitResponsesForRecommendationMutationVariables>;

/**
 * __useSubmitResponsesForRecommendationMutation__
 *
 * To run a mutation, you first call `useSubmitResponsesForRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitResponsesForRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitResponsesForRecommendationMutation, { data, loading, error }] = useSubmitResponsesForRecommendationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSubmitResponsesForRecommendationMutation(baseOptions?: Apollo.MutationHookOptions<SubmitResponsesForRecommendationMutation, SubmitResponsesForRecommendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitResponsesForRecommendationMutation, SubmitResponsesForRecommendationMutationVariables>(SubmitResponsesForRecommendationDocument, options);
      }
export type SubmitResponsesForRecommendationMutationHookResult = ReturnType<typeof useSubmitResponsesForRecommendationMutation>;
export type SubmitResponsesForRecommendationMutationResult = Apollo.MutationResult<SubmitResponsesForRecommendationMutation>;
export type SubmitResponsesForRecommendationMutationOptions = Apollo.BaseMutationOptions<SubmitResponsesForRecommendationMutation, SubmitResponsesForRecommendationMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;