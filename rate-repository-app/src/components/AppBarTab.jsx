import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});


const AppBarTab = ({ text, linkTo }) => {
  return (
    <Pressable style={styles.tab}>
      <Link to={linkTo}>
        <Text fontWeight="bold" fontSize="subheading" color="appBar">
          {text}
        </Text>
      </Link>
    </Pressable>
  );
}

export default AppBarTab;