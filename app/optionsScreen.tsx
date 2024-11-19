import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const optionsScreen = () => {
  const router = useRouter(); 
  const { projectId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.content}> 
       
        <TouchableOpacity style={styles.deleteButton}
          onPress={() => {
            router.back(); // First go back to the previous screen
            setTimeout(() => {
              router.push({
                pathname: '/deleteProjectConfirmationScreen',
                params: { projectId: projectId },
              }); // Then push to the new screen after a short delay
            }, 10); // A short delay to ensure `back()` completes first
          }}
        >
          <View style={styles.deleteButtonContent}>
            <Icon name="trash-outline" style={styles.deleteButtonIcon}></Icon>
            <Text style={styles.deleteButtonText}>Delete Project</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default optionsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    width: '85%',
    marginTop: windowWidth*0.075, 
  },
  deleteButton: {
    backgroundColor: '#EBEBEB', 
    width: '100%', 
    borderRadius: 10, 
  },
  deleteButtonContent: {
    margin: 15,
    alignItems: 'center',
    flexDirection: 'row',
  }, 
  deleteButtonIcon: {
    marginRight: 7, 
    color: 'red',
    fontSize: 15,
  }, 
  deleteButtonText: {
    color: 'red',
    fontSize: 15,
    
  },
  
})