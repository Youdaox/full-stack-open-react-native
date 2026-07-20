import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from "react-router";
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, searchQuery, setSearchQuery, setsortOrder, sortOrder, onEndReached, }) => {
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
      ListHeaderComponent={() => <RepositorySort setsortOrder={setsortOrder} sortOrder={sortOrder} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositorySort = ({ setsortOrder, sortOrder, setSearchQuery, searchQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search repositories"
        onChangeText={(text) => {
          setSearchQuery(text);
        }}
        value={searchQuery}
      />

      <Picker
        selectedValue={sortOrder}
        onValueChange={(value) => setsortOrder(value)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
}

const RepositoryList = () => {
  const [sortOrder, setsortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedText] = useDebounce(searchQuery, 500);

  const {repositories, fetchMore } = useRepositories({
    sortOrder: sortOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    sortDirection: sortOrder === 'lowest' ? 'ASC' : 'DESC',
    searchQuery: debouncedText,
    first: 5,
  });

  return <>
    <RepositoryListContainer 
      repositories={repositories}  
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      setsortOrder={setsortOrder} 
      sortOrder={sortOrder}
      onEndReached={fetchMore}
    />
  </>;
};
  
export default RepositoryList;
