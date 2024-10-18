import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Icon from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const newProject2 = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {
            router.back()
            router.back()
            }}>
            <Text style={styles.cancelButton}>Done</Text>
          </Pressable>
        </View>
        <View style={styles.divider}></View>

        {/* Screen Content */}
        <View style={styles.contentContainer}>
          {/* Top Content */}
          <View style={styles.contentTop}>
            {/* Title */}
            <Text style={styles.title}>Add a little spice</Text>
            {/* Add photo button */}
            <TouchableOpacity style={styles.addPhotoButtonContainer}> 
              <View style={styles.addPhotoButtonContent}>
                <Icon name='plus' size={20}></Icon>
                <Text style={styles.addPhotoButtonText}>Add photo</Text>
              </View>
            </TouchableOpacity>
            {/* Add project title */}
            <Text style={styles.projectTitleHeader}>Project Title</Text>
            <TextInput
              style={styles.projectTitleTextInput}
              placeholder="Give a name to your dream"
              multiline={true}
            >
            </TextInput>
            {/* Add description */}
            <Text style={styles.projectTitleHeader}>Description</Text>
            <TextInput
              style={styles.projectDescriptionTextInput}
              placeholder="What does your product do, what are you looking for, etc"
              multiline={true}
            >
            </TextInput>
          </View>
          {/* Bottom content */}
          <View style={styles.contentBottom}>
            <Button 
              style={styles.nextButton} 
              labelStyle={styles.nextButtonText}
              mode="contained"  
              onPress={() => router.back()}>
              Back
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default newProject2


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 20, 
    // backgroundColor: 'transparent'
    color: 'black',
    fontSize: 17, 
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  // Content
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentTop: {
    width: '80%', 
    justifyContent: 'flex-start'

  },
  divider: {
    height: 1,            
    width: '100%',        
    backgroundColor: '#D3D3D3', 
  },
  title: {
    fontSize: 25, 
    fontWeight: 'bold', 
    marginTop: 20, 
  }, 
  addPhotoButtonContainer: {
    borderWidth: 2, 
    borderRadius: 10,
    marginTop: 20, 
  }, 
  addPhotoButtonContent: {
    margin: 15, 
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  addPhotoButtonText: {
    fontSize: 20, 
    marginLeft: 10
  }, 
  addPhotoButtonIcon:{

  }, 
  // Project title
  projectTitleHeader: {
    fontSize: 17, 
    fontWeight: '500', 
    marginTop: 30, 
  }, 
  projectTitleTextInput: {
    marginTop: 10, 
    borderWidth: 2, 
    borderRadius: 10,
    height: windowHeight/10, 
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 17, 
  }, 
  // Project description
  projectDescriptionTextInput: {
    marginTop: 10, 
    borderWidth: 2, 
    borderRadius: 10,
    height: windowHeight/5, 
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 17, 
  }, 
  // Bottom content
  contentBottom: {
    width: '80%',
    justifyContent: 'flex-end',
    // backgroundColor: 'red'
  }, 
  nextButton: {
    borderRadius: 5, 
    alignSelf: 'flex-start',
    backgroundColor: 'black'
  },
  nextButtonText: {
    fontSize: 17, 
  }
});
