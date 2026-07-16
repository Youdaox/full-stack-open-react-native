import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";

import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
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
export const SignUpForm = ({ onSubmit }) => {
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
      <View>
        <TextInput
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          style={[
            styles.textInput,
            formik.touched.confirmPassword && formik.errors.confirmPassword ? { borderColor: theme.colors.error } : null,
          ]}
          secureTextEntry
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.confirmPassword}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='textInverted' fontWeight='bold'>
          Sign Up
        </Text>
      </Pressable>
    </View>
    );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password, confirmPassword } = values;
    try {
      await signUp({ password, username });
      await signIn({ username, password });
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};

export default SignUp;