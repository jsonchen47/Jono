import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectScreen = ( {project }: any ) => {
  return (
    <View>
        <Image style={{width: windowWidth, height: windowHeight/3}} source={{uri: project?.image}}/>
        <Text style = {styles.title} >{project?.title}</Text>
        <Text>{project?.author}</Text>
    </View>
  )
}

export default ProjectScreen


const styles = StyleSheet.create({
    title: {
        fontSize: 25, 
        fontWeight: 'bold', 
        padding: 15, 
    }
})