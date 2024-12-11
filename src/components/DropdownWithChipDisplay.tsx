import { Keyboard, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Chip } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialIcons'; // Import vector icons


const categories = [
    { label: 'Health', value: '1' },
    { label: 'Tech', value: '2' },
    { label: 'Finance', value: '3' },
    { label: 'Politics', value: '4' },
    { label: 'Education', value: '5' },
    { label: 'Environment', value: '6' },
    { label: 'Social Justice', value: '7' },
];

interface dropdownWithChipDisplayProps {
    formData: any,
    setFormData: any, 
    handleSelectCategory: any, 
}

const DropdownWithChipDisplay = ({formData, setFormData, handleSelectCategory}: dropdownWithChipDisplayProps) => {
  return (
    <View>
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
    </View>
  )
}

export default DropdownWithChipDisplay

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10, 
      },
    chipsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: 'black',
        marginRight: 5, 
        marginBottom: 5
    }, 
    chipTextStyle: {
        color: 'white',
    },
})
