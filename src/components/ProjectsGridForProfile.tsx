// LazyLoadProjectGrid.js
import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
import SmallProjectCard from './SmallProjectCard';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface projectsGridProps {
    projects: any, 
    loadMoreProjects: any, 
    isFetchingMore: any, 
    listHeaderComponent?: any, 
}

const ProjectsGridForProfile = ({ projects, loadMoreProjects, isFetchingMore, listHeaderComponent = null }: projectsGridProps) => {

  return (
    <Tabs.FlatList
    maintainVisibleContentPosition={{ minIndexForVisible: 1 }}
    contentContainerStyle={{ paddingTop: 0 }}
    style={styles.flatList}
    data={projects}
    renderItem={({ item }) => 
      <View style={styles.smallProjectCardContainer}>
          <SmallProjectCard project={item} />
      </View>
      }
    keyExtractor={(item: any, index) => item.id || index.toString()}
    numColumns={2} // Use 2 columns for a grid-like layout
    columnWrapperStyle={styles.columnWrapper} // Adds spacing between columns
    onEndReached={loadMoreProjects}
    onEndReachedThreshold={0.5}
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
  );
};

const styles = StyleSheet.create({
    flatList: {
        // flex: 1,
        // width: '100%',
        paddingTop: windowWidth*0.065,
        // backgroundColor: 'green',
    }, 
  columnWrapper: {
    justifyContent: 'space-between', // Evenly spaces items in each row
    paddingHorizontal: windowWidth*0.065, // Adds horizontal padding for each row - sets the width total at 87%
    // backgroundColor: 'yellow',
  },
  smallProjectCardContainer: {
    width: '48%',
    marginBottom: 10, 
    // backgroundColor: 'green',
  },
});

export default ProjectsGridForProfile;
