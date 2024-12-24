import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import Emoji from 'react-native-emoji';
  
  const ProfileHeader = ({ user, otherProfile = false }: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.topItemsContainer}>
            {/* Profile picture */}
            <View style={styles.imageContainer}>
              <View style={styles.imageOutline}>
                <Image style={styles.image} source={{ uri: user?.image }} />
              </View>
            </View>
  
            {/* Right of Image Info Box */}
            <View style={styles.rightOfImageInfoBox}>
              {/* Name */}
              <View style={styles.eachRowContainer}>
                <Text style={styles.nameText}>{user?.name}</Text>
              </View>
  
              {/* Username */}
              <View style={styles.eachRowContainer}>
                <Text style={styles.usernameText}>
                  {user?.username ? `@${user.username}` : '@Anonymous'}
                </Text>
              </View>
  
              {/* Stats */}
              <View style={styles.allStatsContainer}>
                <View style={styles.statsContainer}>
                  <Emoji name="bulb" style={styles.emoji} />
                  <Text style={styles.statsText}>{user?.numProjects}</Text>
                </View>
                <View style={styles.statsSpacer} />
                <View style={styles.statsContainer}>
                  <Emoji name="handshake" style={styles.emoji} />
                  <Text style={styles.statsText}>{user?.numTeams}</Text>
                </View>
                <View style={styles.statsSpacer} />
                <View style={styles.statsContainer}>
                  <Emoji name="link" style={styles.emoji} />
                  <Text style={styles.statsText}>{user?.numConnections}</Text>
                </View>
              </View>
            </View>
          </View>
  
          {/* Button */}
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              if (otherProfile) {
                console.log('connect button pressed');
              } else {
                console.log('edit profile button pressed');
              }
            }}
          >
            <Text style={styles.editProfileText}>
              {otherProfile ? 'Connect' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default ProfileHeader;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContent: {
      width: '90%',
      alignSelf: 'center',
    },
    topItemsContainer: {
      flexDirection: 'row',
    },
    image: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    imageOutline: {
      borderWidth: 10,
      borderColor: 'white',
      borderRadius: 50,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightOfImageInfoBox: {
      alignItems: 'flex-start',
      padding: 10,
    },
    nameText: {
      fontWeight: 'bold',
      fontSize: 21,
    },
    usernameText: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    eachRowContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginBottom: 7,
    },
    allStatsContainer: {
      flexDirection: 'row',
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 7,
    },
    emoji: {
      fontSize: 18,
    },
    statsText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    statsSpacer: {
      marginHorizontal: 7,
    },
    editProfileButton: {
      width: '100%',
      backgroundColor: '#004068',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignSelf: 'center',
    },
    editProfileText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 15,
    },
  });
  