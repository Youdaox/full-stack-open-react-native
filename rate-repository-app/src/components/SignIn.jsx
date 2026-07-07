import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().min(2).max(30).required('Username is required'),
  password: yup.string().min(6).max(100).required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
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
const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          style={[
            styles.textInput,
            formik.touched.username && formik.errors.username ? { borderColor: theme.colors.error } : null,
          ]}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
        )}
      </View>

      <View>
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          style={[
            styles.textInput,
            formik.touched.password && formik.errors.password ? { borderColor: theme.colors.error } : null,
          ]}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='textInverted' fontWeight='bold'>
          Sign In
        </Text>
      </Pressable>
    </View>
    );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log("result", data);
    } catch (error) {
      console.error(error);
    }
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;