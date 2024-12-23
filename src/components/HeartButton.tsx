import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


const HeartButton = () => {
  return (
    <TouchableOpacity 
        style={styles.iconSmallContainer}
        onPress={() => console.log('Heart icon pressed')}
    >
        <Icon name="heart" size={27} style={styles.iconFill} />
        <Icon name="heart-outline" size={30} style={styles.iconOutline} />
    </TouchableOpacity>
  )
}

export default HeartButton

const styles = StyleSheet.create({
    iconOutline: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'absolute',
        // padding: 12,
      },
      iconFill: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        // position: 'absolute',
        // padding: 12,
        opacity: 0.7,
      },
      iconSmallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        // backgroundColor: 'red'
      },
})

