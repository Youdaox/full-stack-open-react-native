import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns'
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { useNavigate } from "react-router";
import useDeleteReview from '../../hooks/useDeleteReview';

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

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDelete = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteReview(review.id);
            refetch();
          }
        }
      ]
    );
  };

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

    {refetch && (
      <View style={{ flexDirection: 'row', flex: 1, padding: 4, justifyContent: 'center', gap: 20 }}>
        <Pressable onPress={() => navigate(`/repository/${review.repositoryId}`)} style={{ backgroundColor: theme.colors.primary, borderRadius: 4, padding: 15, flex: 1, alignItems: 'center' }}>
          <Text color='textInverted' fontWeight='bold' style={{ textAlign: 'center' }}>
            View Repository
          </Text>
        </Pressable>

        <Pressable onPress={handleDelete} style={{ backgroundColor: theme.colors.error, borderRadius: 4, padding: 15, flex: 1, alignItems: 'center' }}>
          <Text fontWeight='bold' color='textInverted' fontSize='subheading'>
            Delete Review
          </Text>
        </Pressable>
      </View>
  )}

  </View>;
};

export default ReviewItem;