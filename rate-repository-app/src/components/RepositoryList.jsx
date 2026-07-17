import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from "react-router";
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  const handlePress = (repository) => {
    navigate(`/repository/${repository.id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositorySort = ({ setsortOrder, sortOrder }) => {
  return (
    <View>
      <Picker
        selectedValue={sortOrder}
        onValueChange={(value) => setsortOrder(value)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )
}

const RepositoryList = () => {
  const [sortOrder, setsortOrder] = useState(null);
  const repositories = useRepositories(
    sortOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    sortOrder === 'lowest' ? 'ASC' : 'DESC'
  );

  return <>
    <RepositorySort setsortOrder={setsortOrder} sortOrder={sortOrder} />
    <RepositoryListContainer repositories={repositories} />
  </>;
};

export default RepositoryList;
