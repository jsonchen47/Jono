import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem, Button as Button2 } from 'react-native';
import { Chip, Button as Button3 } from 'react-native-paper';
import { useRouter } from 'expo-router'; 
import Emoji from 'react-native-emoji';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileHeader = ({user}: any) => {
    const router = useRouter();
    return (
      <View style={styles.container}>
        {/* Profile picture */}
        <View style={styles.bannerColor}/>
        <View style={styles.imageContainer}>
          <View style={styles.imageOutline}>
            <Image style={styles.image} source={{uri: user?.image}}/>
          </View>
        </View>

        {/* Name */}
        <View style={styles.eachRowContainer}>
          <Text style={styles.nameText}>
              {user?.name}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.allStatsContainer}>
          <View style={styles.statsContainer}>
            <Emoji name="bulb" style={styles.emoji} />
            <Text style={styles.statsText}>{user?.numProjects}</Text>
          </View>
          <View style={styles.statsSpacer}/>
          <View style={styles.statsContainer}>
            <Emoji name="handshake" style={styles.emoji} />
            <Text style={styles.statsText}>{user?.numTeams}</Text>
          </View>
          <View style={styles.statsSpacer}/>
          <View style={styles.statsContainer}>
            <Emoji name="link" style={styles.emoji} />
            <Text style={styles.statsText}>{user?.numConnections}</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.eachRowContainer}>
          <Text style={styles.descriptionText}>{user?.bio}</Text>
        </View>

      </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    bannerColor: {
      position: 'absolute', // Ensure it doesn't affect layout
      top: 0,
      left: 0,
      right: 0,
      height: 45, // Adjust to control how far down it extends
      backgroundColor: '#00C0D1',
    },
    image: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    imageOutline: {
      borderWidth: 10, // Thickness of the outline
      borderColor: 'white', // Outline color
      borderRadius: 50, // Slightly larger than the image's radius
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameText: {
      fontWeight: 'bold', 
      fontSize: 21, 
    },
    eachRowContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 7,
      paddingHorizontal: 17,
    },
    allStatsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
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
      fontWeight: 'bold'
    },
    statsSpacer: {
      marginHorizontal: 7,
    },
    descriptionText: {
      fontSize: 15,
      textAlign: 'center',
    },
})
