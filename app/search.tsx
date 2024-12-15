import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter } from 'expo-router';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { API, graphqlOperation } from 'aws-amplify';
import { searchProjects, searchUsers } from '@/src/graphql/queries';  // Your GraphQL queries
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import UsersList from '@/src/components/UsersList';  // Assuming UsersList is similar to ProjectsGridNew
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

const Search = () => {
  const [text, setText] = useState('');
  const [projectsResults, setProjectsResults] = useState([]);
  const [usersResults, setUsersResults] = useState([]);
  const [isFetchingMoreProjects, setIsFetchingMoreProjects] = useState(false);
  const [isFetchingMoreUsers, setIsFetchingMoreUsers] = useState(false);
  const [nextTokenProjects, setNextTokenProjects] = useState(null);
  const [nextTokenUsers, setNextTokenUsers] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  // Fetch Projects data
  const fetchProjects = async (searchTerm: string, isLoadMore = false) => {
    try {
      setIsFetchingMoreProjects(true);
      const searchWords = searchTerm.split(' ').filter(word => word.trim() !== '').map(word => `*${word}*`);

      if (searchWords.length === 0) {
        setProjectsResults([]);
        setNextTokenProjects(null);
        setIsFetchingMoreProjects(false);
        return;
      }

      const searchFilters = searchWords.map(word => ({
        or: [
          { title: { wildcard: word } },
          { description: { wildcard: word } },
        ],
      }));

      const result = await API.graphql(graphqlOperation(searchProjects, {
        filter: { or: searchFilters },
        nextToken: isLoadMore ? nextTokenProjects : null,
      }));

      const castedResult = result as GraphQLResult<any>

      const items = castedResult?.data?.searchProjects?.items || [];
      const newNextToken = castedResult?.data?.searchProjects?.nextToken || null;

      setProjectsResults(isLoadMore ? [...projectsResults, ...items] : items);
      setNextTokenProjects(newNextToken);
      setIsFetchingMoreProjects(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsFetchingMoreProjects(false);
    }
  };

  // Fetch Users data
  const fetchUsers = async (searchTerm: string, isLoadMore = false) => {
    try {
      setIsFetchingMoreUsers(true);
      const searchWords = searchTerm.split(' ').filter(word => word.trim() !== '').map(word => `*${word}*`);

      if (searchWords.length === 0) {
        setUsersResults([]);
        setNextTokenUsers(null);
        setIsFetchingMoreUsers(false);
        return;
      }

      const searchFilters = searchWords.map(word => ({
        or: [
          { name: { wildcard: word } },
          { bio: { wildcard: word } },
          { skills: { wildcard: word } },
          { resources: { wildcard: word } },
        ],
      }));

      const result = await API.graphql(graphqlOperation(searchUsers, {
        filter: { or: searchFilters },
        nextToken: isLoadMore ? nextTokenUsers : null,
      }));

      const castedResult = result as GraphQLResult<any>

      const items = castedResult?.data?.searchUsers?.items || [];
      const newNextToken = castedResult?.data?.searchUsers?.nextToken || null;

      setUsersResults(isLoadMore ? [...usersResults, ...items] : items);
      setNextTokenUsers(newNextToken);
      setIsFetchingMoreUsers(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsFetchingMoreUsers(false);
    }
  };

  const debouncedFetchResults = useCallback((searchTerm: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchProjects(searchTerm);
      fetchUsers(searchTerm);
    }, 700);
    setTypingTimeout(newTimeout);
  }, [typingTimeout]);

  const handleTextChange = (value: string) => {
    const trimmedValue = value.trim();
    setText(value);

    if (trimmedValue.length === 0) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setProjectsResults([]);
      setUsersResults([]);
      setNextTokenProjects(null);
      setNextTokenUsers(null);
      setIsSubmitted(false);
    } else {
      debouncedFetchResults(trimmedValue);
    }
  };

  const loadMoreProjects = useCallback(() => {
    if (nextTokenProjects && !isFetchingMoreProjects) {
      fetchProjects(text, true);
    }
  }, [text, nextTokenProjects, isFetchingMoreProjects]);

  const loadMoreUsers = useCallback(() => {
    if (nextTokenUsers && !isFetchingMoreUsers) {
      fetchUsers(text, true);
    }
  }, [text, nextTokenUsers, isFetchingMoreUsers]);

  return (
    <SafeAreaView 
      style={styles.container}
      edges={['top']}
    >
      <View style={styles.searchBarContainer}>
        <View style={styles.textInputContainer}>
          <Icon3 name="arrowleft" style={styles.backArrow} onPress={() => router.back()} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find projects and dreamers"
            placeholderTextColor="#4C4C4C"
            value={text}
            onChangeText={handleTextChange}
            onSubmitEditing={() => {
              fetchProjects(text);
              fetchUsers(text);
            }}
          />
        </View>
      </View>

      <Tab.Navigator
        initialRouteName="Projects"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent', // Makes the background transparent
          },
          tabBarActiveTintColor: 'black', // Sets the active tab text color to black
          tabBarInactiveTintColor: 'gray', // Sets the inactive tab text color to gray
          tabBarIndicatorStyle: {
            backgroundColor: 'black', // Sets the indicator color to black
          },
          tabBarLabelStyle: {
            fontWeight: 'bold', // Optional: Makes tab text bold
            fontSize: 15,
          },
        }}
      >
        <Tab.Screen
          name="Projects"
          children={() => (
            <View style={styles.tabContent}>
              <ProjectsGridNew
                projects={projectsResults}
                loadMoreProjects={loadMoreProjects}
                isFetchingMore={isFetchingMoreProjects}
              />
              {/* {isFetchingMoreProjects && (
                <ActivityIndicator size="large" color="gray" style={styles.loader} />
              )} */}
            </View>
          )}
        />
        <Tab.Screen
          name="Users"
          children={() => (
            <View style={styles.tabContent}>
              <UsersList
                users={usersResults}
                loadMoreUsers={loadMoreUsers}
                isFetchingMore={isFetchingMoreUsers}
              />
              {/* {isFetchingMoreUsers && (
                <ActivityIndicator size="large" color="gray" style={styles.loader} />
              )} */}
            </View>
          )}
        />
      </Tab.Navigator>

    </SafeAreaView>
  );
};

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
  resultsContainer: {
    paddingTop: windowWidth * 0.05,
    flex: 1,
    width: '100%',
  },
  tabContent: {
    flex: 1,
    // paddingHorizontal: windowWidth * 0.05,
  },
  loader: {
    marginTop: windowWidth * 0.1,
  },
});

export default Search;
