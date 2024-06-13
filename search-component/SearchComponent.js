import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const SearchComponent = ({ onSearch, openModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
      if (openModal) {
        openModal(searchQuery); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="User ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CustomButton
          text="Search"
          onPress={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    marginRight: 10,
  },
});

export default SearchComponent;
