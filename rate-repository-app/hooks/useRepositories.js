import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../src/graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: variables.sortOrder,
      orderDirection: variables.sortDirection,
      searchKeyword: variables.searchQuery,
      pageInfo: variables.pageInfo,
      cursor: variables.cursor,
      after: variables.after,
      first: variables.first
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
    console.log(variables)
    if (!canFetchMore) {
      return;
    }
 
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;