import RepositoryItem from './RepositoryItem';
import useRepositoryUrl from '../../hooks/useRepositoryUrl';

const SingleRepository = ({ repositoryId }) => {
  const repository = useRepositoryUrl(repositoryId);

  if (!repository) {
    return null;
  }

  return <RepositoryItem repository={repository} url={repository.url} />
}

export default SingleRepository;