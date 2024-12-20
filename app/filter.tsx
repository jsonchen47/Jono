import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { useFilter } from '@/src/contexts/FilterContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilterScreen = () => {
  const { filter, setFilter } = useFilter();
  const router = useRouter();
  const [distance, setDistance] = useState(1); // Local state for the slider

  const updateSort = (sortOption: string) => {
    setFilter((prev) => ({ ...prev, sortBy: sortOption }));
  };

  const updateDistance = (value: number) => {
    setDistance(value);
    setFilter((prev) => ({ ...prev, distance: value === 100 ? '100+' : value }));
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Sort</Text>
        <View style={styles.optionContainer}>
          {['newest', 'oldest'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => updateSort(option)}
            >
              <Text style={styles.optionText}>
                {option === 'newest'
                  ? 'Date added (newest)'
                  : 'Date added (oldest)'}
              </Text>
              <RadioButton
                value={option}
                status={filter.sortBy === option ? 'checked' : 'unchecked'}
                onPress={() => updateSort(option)}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.header}>Distance</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.distanceLabel}>
            {distance === 100 ? '100+ miles' : `${distance} miles`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distance}
            onValueChange={updateDistance}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#000"
          />
        </View>
      </View>

      <SafeAreaView style={styles.safeAreaView} edges={['bottom']}>
        <View style={styles.divider} />
        <View style={styles.spacerVertical} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resultsButton}
            onPress={() => router.back()}
          >
            <Text style={styles.resultsText}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
  },
  sliderContainer: {
    marginVertical: 5,
  },
  distanceLabel: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  resultsButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resultsText: {
    fontSize: 16,
    color: 'white',
  },
  divider: {
    backgroundColor: 'lightgray',
    height: 1,
  },
  spacerVertical: {
    marginVertical: 10,
  },
});

export default FilterScreen;
