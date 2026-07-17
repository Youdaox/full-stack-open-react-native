import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../src/graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    },
    fetchPolicy: 'cache-and-network',
  });

  return data?.repositories;
};

export default useRepositories;