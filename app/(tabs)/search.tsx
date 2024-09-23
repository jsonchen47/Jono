import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { SearchBar } from 'react-native-elements';
// import { SearchBar } from '@rneui/themed';

import { Searchbar } from 'react-native-paper';



export default function SearchScreen() {

  const [searchQuery, setSearchQuery] = React.useState('');
  
  return (
    <View style={styles.container}>
      {/* <Text>Search</Text> */}
      <Searchbar
        placeholder="Search hi"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
  },
});
