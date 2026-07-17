import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from '../src/graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)
  
  const deleteReview = async (reviewId) => {
    const { data } = await mutate({ variables: { deleteReviewId: reviewId } })

    return data
  };

  return [deleteReview, result]
}

export default useDeleteReview;