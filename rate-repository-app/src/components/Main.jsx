import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';

import MyReviews from './MyReviews';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Review from './ReviewForm';
import SignUp from './SignUpForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const RepositoryPage = () => {
  let { id } = useParams();
  return <RepositoryView repositoryId={id} />;
}

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repository/:id" element={<RepositoryPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;