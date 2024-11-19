import { View, Text, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { API, graphqlOperation } from 'aws-amplify';
import { searchProjects } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsGridNew from '@/src/components/ProjectsGridNew';

const windowWidth = Dimensions.get('window').width;

const ResultsList = ({ results, isSubmitted, loadMoreProjects, isFetchingMore }: any) => (
  <View style={styles.resultsContainer}>
    {isSubmitted && results.length === 0 ? (
      <Text style={styles.noResultsText}>No results found</Text>
    ) : (
      <ProjectsGridNew
        projects={results}
        loadMoreProjects={loadMoreProjects}
        isFetchingMore={isFetchingMore}
      />
    )}
  </View>
);

const Search = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextToken, setNextToken] = useState(null); // For pagination

  const fetchSearchResults = async (searchTerm: string, isLoadMore = false) => {
    try {
      setIsFetchingMore(true);

      const searchWords = searchTerm.split(' ').map(word => `*${word}*`);
      const searchFilters = searchWords.map(word => ({
        or: [
          { title: { wildcard: word } },
          { description: { wildcard: word } },
        ],
      }));

      const searchResult = await API.graphql(graphqlOperation(searchProjects, {
        filter: { or: searchFilters },
        nextToken: isLoadMore ? nextToken : null,
      }));

      const castedSearchResult = searchResult as GraphQLResult<any>;
      const items = castedSearchResult?.data?.searchProjects?.items || [];
      const newNextToken = castedSearchResult?.data?.searchProjects?.nextToken || null;

      setResults(prevResults => (isLoadMore ? [...prevResults, ...items] : items));
      setNextToken(newNextToken);
      setIsSubmitted(true);
      setIsFetchingMore(false);
    } catch (error) {
      console.error('Error searching:', error);
      setIsFetchingMore(false);
    }
  };

  const handleSearch = () => {
    fetchSearchResults(text);
  };

  const loadMoreProjects = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      fetchSearchResults(text, true);
    }
  }, [text, nextToken, isFetchingMore]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView >
        <View style={styles.searchBarContainer}>
          <View style={styles.textInputContainer}>
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
      </SafeAreaView>
      <ResultsList results={results} isSubmitted={isSubmitted} loadMoreProjects={loadMoreProjects} isFetchingMore={isFetchingMore} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: windowWidth * 0.05,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4C4C4C',
    paddingLeft: 10,
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
    paddingTop: windowWidth * 0.05,
    flex: 1,
    width: '100%',
  },
});
