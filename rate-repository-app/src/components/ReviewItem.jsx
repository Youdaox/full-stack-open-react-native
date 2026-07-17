import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns'
import { StyleSheet, View } from 'react-native';


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

export default ReviewItem;