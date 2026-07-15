import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_URL } from '../src/graphql/queries';

const useRepositoryUrl = (id) => {
  const { data } = useQuery(GET_REPOSITORY_URL, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });
  
  const repository = data?.repository
  return repository;
};

export default useRepositoryUrl;