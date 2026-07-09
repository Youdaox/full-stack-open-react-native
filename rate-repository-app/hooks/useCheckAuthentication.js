import { useQuery } from '@apollo/client/react';
import { CHECK_SIGNED_IN } from '../src/graphql/queries';

const useCheckAuthentication = () => {
  const { data } = useQuery(CHECK_SIGNED_IN, {
    fetchPolicy: 'cache-and-network',
  });

  return Boolean(data?.me);
};

export default useCheckAuthentication;