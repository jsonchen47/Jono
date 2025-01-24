import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';

const windowWidth = Dimensions.get('window').width;

const LargeProjectCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Author Container */}
        <View style={styles.authorContainer}>
          <MotiView
            style={styles.authorImageSkeleton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 800,
            }}
          />
          <View style={styles.authorTextContainer}>
            <MotiView
              style={styles.authorNameSkeleton}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 800,
              }}
            />
            <MotiView
              style={styles.locationSkeleton}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 800,
              }}
            />
          </View>
        </View>

        {/* Project Image */}
        <MotiView
          style={styles.imageBackgroundSkeleton}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 800,
          }}
        />

        {/* Project Details */}
        <View style={styles.detailsContainer}>
          <MotiView
            style={styles.titleSkeleton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 800,
            }}
          />
          <MotiView
            style={styles.descriptionSkeleton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 800,
            }}
          />
          <MotiView
            style={styles.descriptionSkeleton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 800,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LargeProjectCardSkeleton;

const styles = StyleSheet.create({
  cardContainer: {
    width: '87%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorImageSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  authorTextContainer: {
    flex: 1,
  },
  authorNameSkeleton: {
    width: '50%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  locationSkeleton: {
    width: '40%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  imageBackgroundSkeleton: {
    width: '100%',
    aspectRatio: 1.5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    paddingVertical: 15,
  },
  titleSkeleton: {
    width: '70%',
    height: 18,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  descriptionSkeleton: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
});
