import { View, Text, FlatList, ScrollView, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { API, graphqlOperation } from 'aws-amplify';
import { searchProjects } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsGrid from '@/src/components/ProjectsGrid';


const windowWidth = Dimensions.get('window').width;

const ResultsList = ({ results, isSubmitted }: any) => {
  return (

    <View style={styles.resultsContainer}>
    {isSubmitted && results.length === 0 ? (
      <Text style={styles.noResultsText}>No results found</Text> // Message when no results are found
    ) : (
      <ProjectsGrid projects = {results}/>
    )}
  </View>
    
  );
};

const Search = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchSearchResults = async (searchTerm: any) => {
    try {
      // const formattedSearchTerm = `*${searchTerm}*`
      // const searchResult = await API.graphql(graphqlOperation(searchProjects, {
      //   filter: {
      //     // title: {
      //     //   wildcard: formattedSearchTerm
      //     // }
      //     or: [
      //       { title: { wildcard: formattedSearchTerm } },
      //       { description: { wildcard: formattedSearchTerm } },
      //     ],
      //   }
      // }));
      const searchWords = searchTerm.split(' ').map((word: any) => `*${word}*`);
      const searchFilters = searchWords.map((word: any) => ({
        or: [
          { title: { wildcard: word } },
          { description: { wildcard: word } },
        ],
      }));

    const searchResult = await API.graphql(graphqlOperation(searchProjects, {
      filter: {
        or: searchFilters,
      },
    }));

      
      const castedSearchResult = searchResult as GraphQLResult<any>
      console.log(castedSearchResult)
      const items = castedSearchResult?.data?.searchProjects?.items || [] // grab the search results
      console.log(items)
      setResults(items); // store the results in state
      setIsSubmitted(true); 
    } catch (error) {
      console.error('Error searching: ', error);
    }
  };
  const handleSearch = () => {
    fetchSearchResults(text);
  };
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.searchBarContainer}>
        {/* Back Arrow */}
        

        {/* Search Input Container */}
        <View style={styles.textInputContainer}>
          {/* <Icon2 name='search' style={styles.searchButtonIcon} /> */}
          <Icon3 name='arrowleft' style={styles.backArrow} onPress={() => router.back()} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find projects and dreamers"
            placeholderTextColor="#4C4C4C"
            autoFocus={true}
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <ScrollView>
        <ResultsList results={results} isSubmitted={isSubmitted} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: windowWidth * 0.05,
    paddingVertical: 10,
    flexDirection: 'row',  // Align elements in a row
    alignItems: 'center',   // Center items vertically
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    flex: 1,  // Ensure this takes the remaining space
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },
  searchInput: {
    flex: 1,  // Ensure TextInput takes available space
    fontSize: 16,
    color: '#4C4C4C',
    paddingLeft: 10,
  },
  searchButtonIcon: {
    fontSize: 20,
    color: '#4C4C4C',
  },
  backArrow: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 5,
  },
  noResultsText: {
    marginLeft: windowWidth * 0.05,
  },
  resultsContainer: {
    // justifyContent: 'center', 
    paddingTop: windowWidth*0.05
  }
});
