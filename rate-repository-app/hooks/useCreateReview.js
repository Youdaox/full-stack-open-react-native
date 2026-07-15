import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from '../src/graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  
  const createReview = async ({ owner, name, rating, review }) => {
    const reviewData = {
      ownerName: owner,
      rating: Number(rating),
      repositoryName: name,
      text: review,
    }
    const { data } = await mutate({ variables: { reviewData } })
    
    return data
  };

  return [createReview, result]
}

export default useCreateReview;