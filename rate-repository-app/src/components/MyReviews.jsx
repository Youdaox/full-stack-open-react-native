import { StyleSheet, View, FlatList } from 'react-native';
import theme from '../theme';
import ReviewItem from './ReviewItem';
import useMyReviews from '../../hooks/useMyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [data, refetch] = useMyReviews();
  const reviews = data?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default MyReviews;