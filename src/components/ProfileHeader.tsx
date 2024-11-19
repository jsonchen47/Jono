import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem, Button as Button2 } from 'react-native';
import { Chip, Button as Button3 } from 'react-native-paper';
import { useRouter } from 'expo-router'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileHeader = ({user}: any) => {
    const router = useRouter();
    return (
        <SafeAreaView pointerEvents='box-none'>
    <View pointerEvents='box-none' style={styles.container}>
        {/* Top content */}
        <View pointerEvents='box-none' style={styles.topContent}>
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={{fontWeight: '500'}}>{user?.username}</Text>
            {/* Stats */}
            <View style={styles.allStatsContainer}>
              <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{user?.numProjects?.toString()}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statDivider}/>
              <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{user?.numTeams}</Text>
                <Text style={styles.statLabel}>Teams</Text>
              </View>
              <View style={styles.statDivider}/>
              {/* Connections */}
              <Pressable
                onPress={() => {
                  router.push('/connections'); // Navigate to 'connections'
                }}
              >
                <View style={styles.statContainer}>
                  <Text style={styles.statNumber}>{user?.numConnections}</Text>
                  <Text style={styles.statLabel}>Connections</Text>
                </View>
              </Pressable>
            </View>
          </View>
          {/* Profile picture */}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: user?.image}}/>
          </View>
        </View>
        {/* Bio */}
        <Text style={styles.bio}>{user?.bio}</Text>
        {/* Buttons */}
        <View style={styles.allButtonsContainer}>
          <View style={styles.buttonContainer}>
            <Button3   
              style={styles.button} 
              mode="outlined" 
              onPress={() => console.log('Pressed')} 
              textColor="black"
              contentStyle={{ paddingVertical: 0, paddingHorizontal: 8 }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Button3>

          </View>
          <View style={{padding: 5}}></View>
          <View style={styles.buttonContainer}>
            <Button3  
              style={styles.button} 
              mode="outlined" 
              onPress={() => console.log('Pressed')} 
              textColor="black"
            >
              <Text style={styles.buttonText}>Share Profile</Text>
            </Button3>
          </View>
        </View>
        
      </View>
      </SafeAreaView>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingLeft: 25,
      paddingRight: 25, 
      paddingTop: 25,
      paddingBottom: 5,
    },
    image: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    imageContainer: {
   
    },
    topContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
   
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    allStatsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 10,
    },
    statContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      
    },
    statNumber: {
      fontSize: 17,
      fontWeight: '700',
      
    }, 
    statDivider: {
      height: '100%',            // Thickness of the line
      width: 1,        // Full width of the screen
      backgroundColor: 'black', // Light gray color
      marginHorizontal: 15,   // Space above and below the divider
    },
    statLabel: {
  
    },
    bio: {
      paddingTop: 10,
    },
    allButtonsContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      flex: 1,
    },
    button: {
      alignSelf: 'stretch',
      width: '100%',
      borderRadius: 10,
      height: 45,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    buttonText: {
      fontSize: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitle: {
      flex: 1,
      fontSize: 17,
      fontWeight: '500',
      justifyContent: 'center',
      alignItems: 'center',
      // paddingLeft: 15,
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      display:"flex",
      fontSize: 20,
      paddingRight: 10,
    },
    subtitleContainer: {
      paddingTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
})
