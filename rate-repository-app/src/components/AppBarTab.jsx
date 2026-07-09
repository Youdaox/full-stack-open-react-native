import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});
const AppBarTab = ({ text, linkTo, onPress }) => {
  if (linkTo) {
    return (
      <Link to={linkTo} style={styles.tab}>
        <Text fontWeight="bold" fontSize="subheading" color="appBar">
          {text}
        </Text>
      </Link>
    );
  }

  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text fontWeight="bold" fontSize="subheading" color="appBar">
        {text}
      </Text>
    </Pressable>
  );
}

export default AppBarTab;