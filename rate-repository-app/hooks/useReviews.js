import { useQuery } from '@apollo/client/react';
import { GET_REVIEWS } from '../src/graphql/queries'

const useReviews = (id) => {
  const { data } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.repository?.reviews

  return reviews;
};

export default useReviews