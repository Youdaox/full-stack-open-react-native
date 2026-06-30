import { View, Text } from 'react-native';

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <Text>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>{repository.language}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
    </View>
  );
}

export default RepositoryItem;