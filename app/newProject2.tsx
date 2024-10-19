import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Icon2 from 'react-native-vector-icons/MaterialIcons'; // Import vector icons


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
  const router = useRouter();
  const [text, setText] = useState<any>('');
  const [chips, setChips] = useState<any>([]);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const handleSelectItem = (item: any) => {
    if (selectedValues.includes(item.value)) {
      // Deselect the item if already selected
      setSelectedValues(selectedValues.filter((value: any) => value !== item.value));
    } else {
      // Add the item to selectedValues
      setSelectedValues([...selectedValues, item.value]);
    }
  };

  const handleAddChip = () => {
    if (text.trim() && !chips.includes(text.trim())) {
      setChips([...chips, text.trim()]);
      setText(''); // Clear the text input after adding the chip
    }
  };

  const handleRemoveChip = (chipToRemove: any) => {
    setChips(chips.filter((chip: any) => chip !== chipToRemove));
  };

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Enter') {
      handleAddChip(); // Add the chip when the Enter key is pressed
    }
  };

  return (
    
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {
            router.back()
            router.back()
            }}>
            <Text style={styles.cancelButton}>Publish</Text>
          </Pressable>
        </View>
        <View style={styles.divider}></View>
        {/* Screen Content */}
        <View style={styles.contentContainer}>
          {/* Top Content */}
          <View style={styles.contentTop}>
            {/* Title */}
            <Text style={styles.title}>Add a little spice</Text>
            {/* Choose a category */}
            <Text style={styles.subtitle}>Choose your categories</Text>

            <Dropdown
        style={styles.dropdown}
        // placeholderStyle={styles.placeholderStyle}
        // selectedTextStyle={styles.selectedTextStyle}
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Select items"
        value={selectedValues}
        onChange={handleSelectItem}
        // Customize this if you need a different dropdown behavior
      />

      {/* Displaying Selected Chips */}
      <View style={styles.chipsContainer}>
        {selectedValues.map((value: any) => {
          const item = categories.find((d) => d.value === value);
          return (
            <Chip
              style={styles.chip}
              theme={{ colors: { primary: '#white' } }}
              textStyle={styles.chipTextStyle}
              key={value}
              // style={styles.chip}
              closeIcon={() => (
                <Icon2 name="close" size={18} color="white" /> // Custom "X" icon color (Tomato)
              )}
              onClose={() => setSelectedValues(selectedValues.filter((v: any) => v !== value))}
            >
              {item?.label}
            </Chip>
          );
        })}
      </View>
            

            {/* Add skills */}
            <Text style={styles.subtitle}>List your skills</Text>
            <View style={styles.inputContainer}>
        <ScrollView horizontal contentContainerStyle={styles.chipsContainer}>
          {chips.map((chip: any, index: any) => (
            <Chip
              key={index}
              style={styles.chip}
              textStyle={styles.chipText}
              onClose={() => handleRemoveChip(chip)}
            >
              {chip}
            </Chip>
          ))}
          
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            onKeyPress={handleKeyPress} // Handle Enter key press
            placeholder="Type and press enter..."
          />
        </ScrollView>
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  // chipsContainer: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems: 'center',
  // },
  // chip: {
  //   margin: 4,
  //   backgroundColor: '#e0e0e0',
  // },
  chipText: {
    color: '#000',
  },
  input: {
    minWidth: 100,
    fontSize: 16,
    padding: 0,
    marginLeft: 10,
  },
});
