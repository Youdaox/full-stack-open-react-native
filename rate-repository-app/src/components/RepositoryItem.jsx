import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'column',
    maxWidth: '80%',
    gap: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const RepositoryItem = ({ repository, url }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 20, padding: 10 }}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text fontWeight='bold' fontSize='subheading'>
            {repository.fullName}
          </Text>
          <Text color='textSecondary' fontSize='subheading'>
            {repository.description}
          </Text>
          <Text fontSize='subheading' style={{ backgroundColor: theme.colors.primary, borderRadius: 4, color: 'white', padding: 4, alignSelf: 'flex-start' }}>
            {repository.language}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontSize='subheading' fontWeight='bold'>{formatCount(repository.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize='subheading' fontWeight='bold'>{formatCount(repository.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize='subheading' fontWeight='bold'>{formatCount(repository.reviewCount)}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize='subheading' fontWeight='bold'>{formatCount(repository.ratingAverage)}</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>

      {url && (
        <Pressable onPress={() => Linking.openURL(repository.url)} style={{ backgroundColor: theme.colors.primary, borderRadius: 4, padding: 10, margin: 10 }}>
          <Text color='textInverted' fontWeight='bold' style={{ textAlign: 'center' }}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default RepositoryItem;