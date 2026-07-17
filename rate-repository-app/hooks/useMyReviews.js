import { useQuery } from '@apollo/client/react';
import { CHECK_SIGNED_IN } from '../src/graphql/queries';

const useMyReviews = () => {
  const { data, refetch } = useQuery(CHECK_SIGNED_IN, {
    variables: {
      includeReviews: true
    },
    fetchPolicy: 'cache-and-network',
  });
  return [data?.me?.reviews, refetch];
};

export default useMyReviews;