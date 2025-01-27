import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import { Button, Chip } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialIcons'; // Import vector icons

interface ChipInputProps {
    placeholder: any;
    chips: any;
    onChangeChips: any;
    highlightBorder?: boolean; // Optional parameter
  }

const ChipInput: React.FC<ChipInputProps> = ({ placeholder, chips, onChangeChips, highlightBorder = false, }) => {
    const [text, setText] = useState<any>('');
    const isFocused = useRef(false); // Use ref to track focus state
  
    const handleAddChip = () => {
      if (text.trim() && !chips?.includes(text.trim())) {
        onChangeChips([...chips, text.trim()]);
        setText(''); // Clear the text input after adding the chip
      }
    };
  
    const handleRemoveChip = (chipToRemove: any) => {
      onChangeChips(chips?.filter((chip:any) => chip !== chipToRemove));
    };
  
    const handleKeyPress = ({ nativeEvent }: any) => {
     
      setTimeout(() => {
        if (nativeEvent.key === 'Backspace' && text === '' && isFocused.current) {
          // Only delete if input is focused and empty
          console.log(isFocused.current)
          if (chips?.length > 0) {
            const updatedChips = chips?.slice(0, -1); // Remove the last chip
            onChangeChips(updatedChips);
          }
        }
      }, 50); 
    };
  
    const handleBlur = () => {
      isFocused.current = false; // Update ref immediately when the input loses focus
    };
  
    const handleFocus = () => {
      isFocused.current = true; // Update ref immediately when the input is focused
    };
  
    return (
      <View style={[styles.skillsBoxContainer, highlightBorder && styles.highlightedSkillsBox]}>
        <View style={styles.skillsBox}>
          {chips?.map((chip: any, index: any) => (
            <Chip
              key={index}
              style={styles.chip}
              textStyle={styles.chipTextStyle}
              onClose={() => handleRemoveChip(chip)}
              closeIcon={() => (
                <Icon2 name="close" size={18} color="white" /> // Custom "X" icon color
              )}
            >
              {chip}
            </Chip>
          ))}
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleAddChip}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            blurOnSubmit={false}
            onBlur={handleBlur}
            onFocus={handleFocus}
  
          />
        </View>
      </View>
    );
  };

export default ChipInput



const styles = StyleSheet.create({
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
    marginBottom: 5, 
    // flexDirection: 'row', // Maintain row layout
    height: 35, // Set a consistent heightx
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
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    // marginVertical: 5,
    backgroundColor: '#f9f9f9',
    // marginBottom: 20,
  },
  highlightedSkillsBox: {
    borderColor: 'gray',
    borderWidth: 2,
  },
  skillsBox: {
    // marginTop: 10, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1, 
    // backgroundColor: 'green',
    // width: '100%'
  },
  input: {
    minWidth: 100,
    fontSize: 14,
    padding: 0,
    marginLeft: 10,
    marginTop: 5, 
    flexGrow: 1, 
    flexShrink: 1,
    // backgroundColor: 'red'
  },
});



