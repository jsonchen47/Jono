import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useRef, useContext } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Icon2 from 'react-native-vector-icons/MaterialIcons'; // Import vector icons
import { FormContext } from './_layout';
import { uploadNewProject } from "../../src/functions/uploadNewProject"
import { useProgress } from '@/src/contexts/ProgressContext';
import ChipInput from '@/src/components/ChipInput';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const categories = [
  { label: 'Health', value: '1' },
  { label: 'Tech', value: '2' },
  { label: 'Finance', value: '3' },
  { label: 'Politics', value: '4' },
  { label: 'Education', value: '5' },
  { label: 'Environment', value: '6' },
  { label: 'Social Justice', value: '7' },
];

const newProject2 = () => {
  const { hideProgressBar, showProgressBar, updateProgress, isVisible, setProjectId } = useProgress();
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  // const [progress, setProgress] = useState(0);
  // const [text, setText] = useState<any>('');
  // const [chips, setChips] = useState<any>([]);
  // const [skills, setSkills] = useState([]);
  // const [resources, setResources] = useState([]);

  const handleSelectCategory = (item: any) => {
    const selectedLabel = item.label;
    // if (selectedCategories.includes(item.value)) {
    if (formData.categories.includes(selectedLabel)) {
      // Deselect the item if already selected
      // setFormData({ ...formData, categories: formData.categories.filter((value: any) => value !== item.value)})
      setFormData({ ...formData, categories: formData.categories.filter((label: any) => label !== selectedLabel) });

    } else {
      // Add the item to selectedCategories
      // setFormData({ ...formData, categories: [...formData.categories, item.value] })
      setFormData({ ...formData, categories: [...formData.categories, selectedLabel] });

    }
  };

   // Handler for updating skills in formData
   const handleSkillsChange = (updatedSkills: any) => {
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Handler for updating resources in formData
  const handleResourcesChange = (updatedResources: any) => {
    setFormData({
      ...formData,
      resources: updatedResources,
    });
  };

  return (
    
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {
            router.replace('/(tabs)/(home)')
            uploadNewProject(formData, setFormData, showProgressBar, hideProgressBar, updateProgress, isVisible, setProjectId)
            // router.back()
            // console.log('hit first router back')
            // router.back()
            // console.log('hit second router back')
            console.log('went home')
            }}>
            <Text style={styles.cancelButton}>Publish</Text>
          </Pressable>
        </View>
        <View style={styles.divider}></View>
        {/* Screen Content */}
        <View style={styles.contentContainer}>
          {/* Top Content */}
          <ScrollView 
          style={styles.contentTop}
          showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.title}>Add a little spice</Text>
            {/* Choose a category */}
            <Text style={styles.subtitle}>Choose your categories</Text>

            <Dropdown
              style={styles.dropdown}
              data={categories}
              labelField="label"
              valueField="value"
              placeholder="Select items"
              value={formData.categories}
              onChange={handleSelectCategory}
            />

      {/* Displaying Selected Chips */}
      <View style={styles.chipsContainer}>
        {/* {selectedCategories.map((value: any) => { */}
        {formData.categories.map((label: any, index: any) => {
          // const item = categories.find((d) => d.value === value);
          return (
            <Chip
              style={styles.chip}
              theme={{ colors: { primary: '#white' } }}
              textStyle={styles.chipTextStyle}
              key={index}
              // style={styles.chip}
              closeIcon={() => (
                <Icon2 name="close" size={18} color="white" /> // Custom "X" icon color (Tomato)
              )}
              onClose={() => 
                // setSelectedCategories(selectedCategories.filter((v: any) => v !== value))
                // setFormData({ ...formData, categories: formData.categories.filter((v: any) => v !== value) })
                setFormData({ ...formData, categories: formData.categories.filter((l: any) => l !== label) })

              }
            >
              {label}
            </Chip>
          );
        })}
      </View>

        {/* Skills Input */}
        <Text style={styles.subtitle}>List your skills</Text>
        <ChipInput
          placeholder="Skills"
          chips={formData.skills}
          onChangeChips={handleSkillsChange}
        />

        {/* Resources Input */}
        <Text style={styles.subtitle}>List available resources</Text>
        <ChipInput
          placeholder="Resources"
          chips={formData.resources}
          onChangeChips={handleResourcesChange}
        />
          </ScrollView>
          {/* Divider */}
          <View style={styles.divider}></View>
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
    // justifyContent: 'flex-start'

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
  subtitle: {
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
    paddingTop: 20,
    // backgroundColor: 'red'
  }, 
  nextButton: {
    borderRadius: 5, 
    alignSelf: 'flex-start',
    backgroundColor: 'black'
  },
  nextButtonText: {
    fontSize: 17, 
  },
  // Category selection
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10, 
  },
  chip: {
    backgroundColor: 'black',
    marginRight: 5, 
    marginBottom: 5
  }, 
  chipsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipTextStyle: {
    color: 'white',
  },
  chipCloseIcon: {

  }, 
  skillsBoxContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  skillsBox: {
    // marginTop: 10, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    minWidth: 100,
    fontSize: 16,
    padding: 0,
    marginLeft: 10,
    marginTop: 5, 
  },
});
