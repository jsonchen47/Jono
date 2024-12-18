import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFilter } from '@/src/contexts/FilterContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilterScreen = () => {
  const { filter, setFilter } = useFilter();
  const router = useRouter();

  const updateSort = (sortOption: any) => {
    setFilter((prev) => ({ ...prev, sortBy: sortOption }));
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Sort</Text>
        <View style={styles.optionContainer}>
          {['bestMatch', 'distance', 'newest', 'oldest'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => updateSort(option)}
            >
              <Text style={styles.optionText}>
                {option === 'bestMatch'
                  ? 'Best match'
                  : option === 'distance'
                  ? 'Distance'
                  : option === 'newest'
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

// Add your existing styles
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
    // paddingHorizontal: 20, 
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  clearText: {
    fontSize: 16,
    color: 'black',
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
  }
});
