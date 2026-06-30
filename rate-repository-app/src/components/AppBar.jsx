import { View, StyleSheet } from 'react-native';
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
      {['Repositories'].map((tab) => (
        <AppBarTab key={tab}>{tab}</AppBarTab>
      ))}
    </View>
  );
};

export default AppBar;