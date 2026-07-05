import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});


const AppBarTab = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" color="appBar">
        {children}
      </Text>
    </Pressable>
  );
}

export default AppBarTab;