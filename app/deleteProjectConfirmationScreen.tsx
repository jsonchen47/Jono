import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const deleteProjectConfirmationScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
    <View style={styles.centeredCard}>
      <Text style={styles.title}>Delete Project?</Text>
      <Text style={styles.warningText}>Are you sure? This action cannot be undone.</Text>
      <View style={styles.divider}/>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      <View style={styles.divider}/>
      <TouchableOpacity style={styles.button}
        onPress={() => {
          router.back()
        }}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default deleteProjectConfirmationScreen

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  centeredCard: {
    width: '70%', // Adjust width as needed
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    marginTop: 20, 
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  warningText: {
    width: '70%',
    marginBottom: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15, 
  }, 
  deleteButtonText: {
    color: 'red', 
    fontWeight: 'bold', 
    fontSize: 15,
  }, 
  cancelButtonText: {
    fontSize: 15,
  }, 
  divider: {
    height: 1,            // Thickness of the line
    width: '100%',        // Full width of the screen
    backgroundColor: '#D3D3D3', // Light gray color
},
});