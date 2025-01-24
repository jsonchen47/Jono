import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';

const windowWidth = Dimensions.get('window').width;

const ProfileHeaderSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {/* Top Section */}
        <View style={styles.topItemsContainer}>
          {/* Profile Image */}
          <MotiView
            style={styles.imageSkeleton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 800,
            }}
          />

          {/* Info Section */}
          <View style={styles.infoSkeletonContainer}>
            <MotiView
              style={styles.nameSkeleton}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 800,
              }}
            />
            <MotiView
              style={styles.usernameSkeleton}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 800,
              }}
            />

            {/* Stats */}
            <View style={styles.statsSkeletonContainer}>
              {Array.from({ length: 3 }).map((_, index) => (
                <MotiView
                  key={index}
                  style={styles.statSkeleton}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    loop: true,
                    type: 'timing',
                    duration: 800,
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Button */}
        <MotiView
          style={styles.buttonSkeleton}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'whitesmoke',
  },
  headerContent: {
    width: '90%',
    alignSelf: 'center',
  },
  topItemsContainer: {
    flexDirection: 'row',
  },
  imageSkeleton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  infoSkeletonContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameSkeleton: {
    height: 20,
    width: '70%',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  usernameSkeleton: {
    height: 16,
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  statsSkeletonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  statSkeleton: {
    height: 20,
    width: 50,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  buttonSkeleton: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
});

export default ProfileHeaderSkeleton;
