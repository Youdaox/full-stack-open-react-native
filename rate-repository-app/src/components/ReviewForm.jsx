import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";
import useCreateReview from '../../hooks/useCreateReview';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number().integer().min(0).max(100).required('Rating is required'),
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  text: '',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
})
export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Repository owner name"
          value={formik.values.owner}
          onChangeText={formik.handleChange('owner')}
          onBlur={formik.handleBlur('owner')}
          style={[
            styles.textInput,
            formik.touched.owner && formik.errors.owner ? { borderColor: theme.colors.error } : null,
          ]}
        />
        {formik.touched.owner && formik.errors.owner && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.owner}</Text>
        )}
      </View>

      <View>
        <TextInput
          placeholder="Repository name"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          style={[
            styles.textInput,
            formik.touched.name && formik.errors.name ? { borderColor: theme.colors.error } : null,
          ]}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.name}</Text>
        )}
      </View>

      <View>
        <TextInput
          placeholder="Rating"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          style={[
            styles.textInput,
            formik.touched.rating && formik.errors.rating ? { borderColor: theme.colors.error } : null,
          ]}
          keyboardType="numeric"
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.rating}</Text>
        )}
      </View>

      <View>
        <TextInput
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
          style={styles.textInput}
          multiline
        />
      </View>

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='textInverted' fontWeight='bold'>
          Submit Review
        </Text>
      </Pressable>
    </View>
    );
};

const Review = () => {
  const [createReview] = useCreateReview();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { owner, name, rating, text } = values;
    try {
      const data = await createReview({ owner, name, rating, review: text });
      const repositoryId = data.createReview.repositoryId;
      
      navigate(`/repository/${repositoryId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return <ReviewForm onSubmit={handleSubmit} />;
};

export default Review;