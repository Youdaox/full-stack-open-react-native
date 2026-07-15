import { gql } from '@apollo/client';

export const AUTHENTICATE = gql` 
  mutation signIn($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;
export const CREATE_REVIEW = gql` 
  mutation createReview($reviewData: CreateReviewInput) {
    createReview(review: $reviewData) {
      id
      createdAt
      rating
      text
      repositoryId
    }
  }
`;
