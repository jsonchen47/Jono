import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
import SmallProjectCard from './SmallProjectCard';

const windowWidth = Dimensions.get('window').width;

interface ProjectsGridProps {
  projects: any[]; // List of projects
  loadMoreProjects: () => void; // Function to load more projects
  isFetchingMore: boolean; // Loading indicator for fetch more
  listHeaderComponent?: React.ReactNode; // Optional header component
}

const ProjectsGridNew = ({
  projects,
  loadMoreProjects,
  isFetchingMore,
  listHeaderComponent = null,
}: ProjectsGridProps) => {
  return (
    <FlatList
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
      data={projects}
      renderItem={({ item }) => (
        <View style={styles.smallProjectCardContainer}>
          <SmallProjectCard project={item} />
        </View>
      )}
      keyExtractor={(item, index) => item.id || index.toString()}
      numColumns={2} // Use 2 columns for a grid layout
      columnWrapperStyle={styles.columnWrapper} // Styling for column alignment
      onEndReached={loadMoreProjects} // Trigger when reaching the bottom
      onEndReachedThreshold={0.1} // Threshold to trigger `onEndReached`
      ListHeaderComponent={
        listHeaderComponent
          ? () => <>{listHeaderComponent}</>
          : null
      } // Wrap header component if provided
      ListFooterComponent={() =>
        isFetchingMore ? (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <View style={styles.footerContainer} />
        )
      } // Show activity indicator or empty footer
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
    paddingTop: windowWidth * 0.065,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth * 0.065, // Set horizontal padding
  },
  smallProjectCardContainer: {
    width: '48%', // Card width to fit two in a row with spacing
    marginBottom: windowWidth * 0.05, // Vertical spacing
  },
  footerContainer: {
    paddingVertical: 20, // Footer spacing
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProjectsGridNew;
