import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import useSignOut from '../../hooks/useSignOut';
import useCheckAuthentication from '../../hooks/useCheckAuthentication';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 6,
  },
});

const AppBar = () => {  
  const { signOut } = useSignOut();

  const loggedIn = useCheckAuthentication();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" linkTo="/" />
        {!loggedIn && <AppBarTab text="Sign In" linkTo="/signin" />}
        {loggedIn && <AppBarTab text="Create Review" linkTo="/review" />}
        {loggedIn && <AppBarTab text="Sign Out" onPress={signOut} />}
      </ScrollView>
    </View>
  );  
};

export default AppBar;