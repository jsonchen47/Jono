import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import SmallProjectCard from './SmallProjectCard'

const ProjectsGrid = ({projects}: any) => {
  return (
    // <View>
    //   <Text>ProjectGrid</Text>
    // </View>
    <View style={styles.browseProjectsOuterContainer}>
        <View style={styles.browseProjectsContainer}>
        {projects?.map((project: any, index: any) => (
          <View  key={index} style={styles.browseProjectsGridItem}>
            <SmallProjectCard project = {project}/>
            {/* <Text>hi</Text> */}
          </View>
        ))}
        </View>
    </View>
  )
}

export default ProjectsGrid

const styles = StyleSheet.create({
    browseProjectsOuterContainer: {
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
      },
      browseProjectsContainer: {
        width: '90%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      browseProjectsGridItem: {
        width: '48%', // Two items per row with spacing
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
})

