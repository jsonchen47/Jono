import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useFilter } from '@/src/contexts/FilterContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilterScreen = () => {
  const { filter, setFilter, onFilterApply } = useFilter();
  const router = useRouter();

  const [localSortBy, setLocalSortBy] = useState(filter.sortBy);
  const [localDistance, setLocalDistance] = useState(
    typeof filter.distance === 'string' ? 100 : filter.distance
  );

  const applyFilters = () => {
    setFilter((prev) => ({
      ...prev,
      sortBy: localSortBy,
      distance: localDistance === 100 ? '100+' : localDistance,
    }));

    if (onFilterApply) onFilterApply(); // Trigger the callback to fetch projects

    router.back();
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
              onPress={() => setLocalSortBy(option)}
            >
              <Text style={styles.optionText}>
                {option === 'newest'
                  ? 'Date added (newest)'
                  : 'Date added (oldest)'}
              </Text>
              <RadioButton
                value={option}
                status={localSortBy === option ? 'checked' : 'unchecked'}
                onPress={() => setLocalSortBy(option)}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.header}>Distance</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.distanceLabel}>
            {localDistance === 100 ? '100+ miles' : `${localDistance} miles`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={localDistance}
            onValueChange={setLocalDistance}
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
          <TouchableOpacity style={styles.resultsButton} onPress={applyFilters}>
            <Text style={styles.resultsText}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FilterScreen;
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
    marginVertical: 20,
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
    justifyContent: 'center',
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
