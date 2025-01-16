// LazyLoadProjectGrid.js
import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions, Text } from 'react-native';
import SmallProjectCard from './SmallProjectCard';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import LargeProjectCard from './LargeProjectCard';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface projectsGridProps {
    projects: any, 
    loadMoreProjects: any, 
    isFetchingMore: any, 
    listHeaderComponent?: any, 
}

const LargeProjectCardsFlatList = ({ projects, loadMoreProjects, isFetchingMore, listHeaderComponent = null }: projectsGridProps) => {
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
      keyExtractor={(item, index) => item.id || index.toString()}
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
});

export default LargeProjectCardsFlatList;
