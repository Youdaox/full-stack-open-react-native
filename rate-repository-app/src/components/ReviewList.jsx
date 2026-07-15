import { StyleSheet, View, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useReviews from '../../hooks/useReviews';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
  },
  rating: { 
    width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' 
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const ReviewItem = ({ review }) => {
  return <View style={styles.reviewContainer}>
    <View style={{ flexDirection: 'row', gap: 20, padding: 10 }}>
      
      <View style={styles.rating}>
        <Text fontWeight='bold' color='primary' fontSize='subheading'>
          {review.rating}
        </Text>
      </View>

      <View style={{ flexDirection: 'column', maxWidth: '80%', gap: 2 }}>
        <Text fontWeight='bold' fontSize='subheading'>
          {review.user.username}
        </Text>
        <Text color='textSecondary' fontSize='subheading'>
          {format(new Date(review.createdAt), "PPP")}
        </Text>
        <Text fontSize='subheading'>
          {review.text}
        </Text>
      </View>
    </View>
  </View>;
};

const ReviewList = ({ repository }) => {
  const data = useReviews(repository.id);

  const reviews = data?.edges.map(edge => edge.node) || [];

  console.log('reviews', reviews);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} url={repository.url} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default ReviewList;