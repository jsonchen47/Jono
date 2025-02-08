import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const optionsScreen = () => {
  const router = useRouter(); 
  const { projectId, owner } = useLocalSearchParams();
  const isOwner = owner === 'true'; // Ensure this matches how you pass the 'owner' param

  return (
    <View style={styles.container}>
      <View style={styles.content}> 
      
      {isOwner && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              router.back();
              setTimeout(() => {
                router.push({
                  pathname: '/deleteProjectConfirmationScreen',
                  params: { projectId: projectId },
                });
              }, 10);
            }}
          >
            <View style={styles.deleteButtonContent}>
              <Icon name="trash-outline" style={styles.deleteButtonIcon} />
              <Text style={styles.deleteButtonText}>Delete Project</Text>
            </View>
          </TouchableOpacity>
        )}
      
       
       
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