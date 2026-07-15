import useRepositoryUrl from '../../hooks/useRepositoryUrl';
import ReviewList from './ReviewList';
import { View } from 'react-native';
import theme from '../theme';


const RepositoryView = ({ repositoryId }) => {
  const repository = useRepositoryUrl(repositoryId);

  if (!repository) {
    return null;
  }

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ReviewList repository={repository} />
    </View>
  );
}

export default RepositoryView;