import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" linkTo="/" />
        <AppBarTab text="Sign In" linkTo="/signin" />
      </ScrollView>
    </View>
  );  
};

export default AppBar;