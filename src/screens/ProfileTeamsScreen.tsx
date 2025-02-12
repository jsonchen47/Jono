import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTeamsByUser } from '@/src/backend/queries';
import ProjectsGridForProfile from '../components/ProjectsGridForProfile';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';

const client = generateClient();

const windowWidth = Dimensions.get('window').width;

interface ProfileProjectsScreenProps {
  userID: string;
}

const ProfileTeamsScreen: React.FC<ProfileProjectsScreenProps> = ({ userID }) => {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false); // Prevent flickering
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const EmptyState = () => (
    <Tabs.ScrollView>
          <View style={styles.noProjectsContainer}>
            <Image
              source={require('../../assets/images/camping.png')} // Replace with your actual image path
              style={styles.noProjectsImage}
            />
            <Text style={styles.noProjectsText}>
              No teams yet! Join a project to populate the space.
            </Text>
          </View>
        </Tabs.ScrollView>
  );

  const fetchProjects = async (nextToken: string | null = null) => {
    setLoading(true);
    try {
      const teamsData = await client.graphql({
        query: listTeamsByUser,
        variables: { id: userID, nextToken, limit: 4 },
      }) as GraphQLResult<any>;

      const rawTeams = teamsData?.data?.getUser?.Projects?.items || [];
      const nextTokenFromResponse = teamsData?.data?.getUser?.Projects?.nextToken;

      const filteredTeams = rawTeams.filter((item: any) => !item.project.ownerIDs.includes(userID));
      const fetchedProjects = filteredTeams.map((item: any) => item.project);

      setProjects((prevProjects: any) => {
        const newProjects = fetchedProjects.filter(
          (newProject: any) =>
            !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
        );
        return [...prevProjects, ...newProjects];
      });

      if (fetchedProjects.length + projects.length >= 4) {
        setNextToken(null);
      } else {
        setNextToken(nextTokenFromResponse);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setDataLoaded(true), 300); // Ensure rendering after state settles
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userID]);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  return (
    <ProjectsGridForProfile
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
          loading={loading}
          noProjectsComponent={<EmptyState/>}
        />
  )

  // return (
  //   <View style={styles.projectsScreenContainer}>
  //     <ProjectsGridForProfile
  //         projects={projects}
  //         loadMoreProjects={loadMoreProjects}
  //         isFetchingMore={isFetchingMore}
  //         loading={loading}
  //         noProjectsComponent={<EmptyState/>}
  //       />
  //     {/* {projects.length === 0 && !loading && dataLoaded ? (
  //       <Tabs.ScrollView>
  //         <View style={styles.noProjectsContainer}>
  //           <Image
  //             source={require('../../assets/images/camping.png')} // Replace with your actual image path
  //             style={styles.noProjectsImage}
  //           />
  //           <Text style={styles.noProjectsText}>
  //             No teams yet! Join a project to populate the space.
  //           </Text>
  //         </View>
  //       </Tabs.ScrollView>
  //     ) : (
  //       <ProjectsGridForProfile
  //         projects={projects}
  //         loadMoreProjects={loadMoreProjects}
  //         isFetchingMore={isFetchingMore}
  //         loading={loading}
  //         noProjectsComponent={<EmptyState/>}
  //       />
  //     )} */}
  //   </View>
  // );
};

export default ProfileTeamsScreen;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  noProjectsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  noProjectsImage: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 20,
  },
  noProjectsText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
    paddingHorizontal: 20,
  },
});
