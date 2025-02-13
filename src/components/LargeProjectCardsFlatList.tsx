// LazyLoadProjectGrid.js
import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions, Text } from 'react-native';
import SmallProjectCard from './SmallProjectCard';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import LargeProjectCard from './LargeProjectCard';
import LargeProjectCardSkeleton from './LargeProjectCardSkeleton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface projectsGridProps {
    projects: any, 
    loadMoreProjects: any, 
    isFetchingMore: any, 
    listHeaderComponent?: any, 
    loading: boolean; // Loading state for the entire list
    noProjectsComponent: any;
}

const LargeProjectCardsFlatList = ({ 
  projects, 
  loadMoreProjects, 
  isFetchingMore, 
  listHeaderComponent = null,
  loading, 
  noProjectsComponent
}: projectsGridProps) => {

  if (loading) {
    const skeletons = Array.from({ length: 6 }); // Number of skeleton cards to display

    return (
      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={skeletons}
        renderItem={({ index }) => (
          <View style={styles.projectCardContainer}>
            <LargeProjectCardSkeleton key={index} />
          </View>
        )}
        keyExtractor={(_, index) => `skeleton-${index}`}
        // keyExtractor={(item: any, index) => item.id ?? `fallback-key-${index}`}

        ListHeaderComponent={listHeaderComponent || null}
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
      // pagingEnabled
      showsVerticalScrollIndicator={false}
      data={projects}
      renderItem={({ item }) => 
        <View style={styles.projectCardContainer}>
            <LargeProjectCard project={item} />
        </View>
        }
      // keyExtractor={(item, index) => item.id || index.toString()}
      keyExtractor={(item, index) => `${item.id}-${index}`}

      // numColumns={1} // Use 2 columns for a grid-like layout
      // columnWrapperStyle={styles.columnWrapper} // Adds spacing between columns
      onEndReached={loadMoreProjects}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={listHeaderComponent || null}
      ListFooterComponent={() =>
        isFetchingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            <View style={{ paddingVertical: windowWidth*0.05 }}>
              
            </View>
          )
      }
      
    />
    // <View>
    //   <Text>hi</Text>

    // </View>
    
  );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: '100%',
        paddingTop: windowWidth*0.065,
    }, 
  projectCardContainer: {
    width: '100%',
    marginBottom: windowWidth*0.065,
    // aspectRatio: 1, 
    // backgroundColor: 'green',
    // height: '50%'
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

export default LargeProjectCardsFlatList;
