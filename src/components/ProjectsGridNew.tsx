import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import SmallProjectCard from './SmallProjectCard';
import SmallProjectCardSkeleton from './SmallProjectCardSkeleton';

const windowWidth = Dimensions.get('window').width;

interface ProjectsGridProps {
  projects: any[]; // List of projects
  loadMoreProjects: () => void; // Function to load more projects
  isFetchingMore: boolean; // Loading indicator for fetch more
  listHeaderComponent?: React.ReactNode; // Optional header component
  loading: any;
  noProjectsComponent: any, 

}

const ProjectsGridNew = ({
  projects,
  loadMoreProjects,
  isFetchingMore,
  listHeaderComponent = null,
  loading, 
  noProjectsComponent = null, 
}: ProjectsGridProps) => {
  // const marginBottom = windowWidth * 0.05;

  if (loading) {
    const skeletons = Array.from({ length: 6 }); // Number of skeleton loaders
  
    return (
      <FlatList
        style={styles.flatList}
        data={skeletons}
        keyExtractor={(_, index) => `skeleton-${index}`}
        renderItem={() => (
          <View style={styles.smallProjectCardContainer}>
            <SmallProjectCardSkeleton />
          </View>
        )}
        numColumns={2} // Two columns for grid layout
        columnWrapperStyle={styles.columnWrapper} // Apply spacing for rows
        // contentContainerStyle={styles.flatListContent} // Matches spacing and padding
        showsVerticalScrollIndicator={false}
      />
    );
  }
  
  if (projects?.length === 0) {
    // Render the custom empty state if no projects
    return noProjectsComponent || (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No projects available</Text>
      </View>
    );
  }

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
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth * 0.01,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderImage: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  placeholderText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 30, 
    marginBottom: 70,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});

export default ProjectsGridNew;
