import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SampleComponent = () => {
  return (
    <View>
      <Text style={styles.sampleComponent}>SampleComponent</Text>
    </View>
  )
}

export default SampleComponent

const styles = StyleSheet.create({
    sampleComponent: {
        fontWeight: 'bold', 
        fontSize: 24
    }
})