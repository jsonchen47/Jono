import { View, Text, Image } from 'react-native'
import React from 'react'

const ProjectScreen = ( {project }: any ) => {
  return (
    <View>
        <Image style={{width: 300, height: 300}} source={{uri: project?.image}}/>
        <Text>{project?.title}</Text>
        <Text>{project?.author}</Text>
    </View>
  )
}

export default ProjectScreen