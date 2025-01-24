import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SmallProjectCardSkeleton = () => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 800,
      }}
      style={[
        styles.skeleton,
        {
        width: '100%',
          height: windowHeight / 5,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15, // Matches the card styling
  },
});

export default SmallProjectCardSkeleton;
