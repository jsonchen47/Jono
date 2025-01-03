import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { useConnection } from '@sendbird/uikit-react-native';
import { useEffect } from 'react';
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify"; 
import { getUser } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';


export default function TabLayout() {
  const { hasNotifications } = useNotifications();
  const router = useRouter(); 
  const handleCenterTabPress = () => {
    router.push('/newProject/newProject1'); // Replace '/newScreen' with the path to your desired screen
    console.log('tabs button pressed')
  };
  const { connect } = useConnection();

  // Connect user to sendbird 
  useEffect(() => {
    const connectUser = async () => {

      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // query the database using Auth user id (sub)
      const result = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      // Type assertion to treat result as GraphQLResult
      const userData = result as GraphQLResult<any>;

      const userID = userData?.data?.getUser?.id
      const username = userData?.data?.getUser?.name

      console.log(userID)
      console.log(username)

      connect(userID, { nickname: username})

    }

    connectUser();

  }, []);

  return (
    // <SafeAreaView>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'black', // Color of the highlighted (active) tab
      tabBarInactiveTintColor: 'gray', // Color of the inactive tabs
      tabBarLabelStyle: {
        // fontSize: 11,
        // fontWeight: "bold",
        marginBottom: 10,
        marginTop: 5, 
        },
        tabBarStyle: {
          height: 90,
          // borderWidth: 1,
          // borderRadius: 50,
          },
    }}
    >
      <Tabs.Screen 
        name="(home)" 
        options={{ 
            title: 'Explore',
            headerTitleAlign: 'left',
            tabBarIcon: ({ color, size }) => (  
              <Ionicons name="search" color={color} size={size} style={{marginTop: 5}}/>
            ),
            headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="saved" 
        options={{ 
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} style={{marginTop: 5}}/>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'white',
          }
        }}
      />
      <Tabs.Screen 
        name="center" 
        options={{ 
          // tabBarIcon: () => null,
          // title: 'Create',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="add-circle-outline" color={'blue'} size={32} />
          // ),
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.centerTab} onPress={handleCenterTabPress} delayLongPress={undefined}>
               <Ionicons name="add-circle-outline" size={28} color="gray" style={{marginTop: 5}}/>
               <Text style={styles.centerTabText}>New Project</Text>
              {/* <Text style={styles.centerTabText}>+</Text> */}
            </TouchableOpacity>
          ),
          // href: '/newProject'
        }}

        // listeners={() => ({
        //   tabPress: (e) => {
        //     e.preventDefault()
        //     router.push("/(tabs)/newProject") // <-- Here you put the name where the chat component is declared 
        //   },
        // })}
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" color={color} size={size} style={{marginTop: 5}}/>
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="(profile)" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="person-outline" color={color} size={size} style={{marginTop: 5}}/>
              {hasNotifications && <View style={styles.notificationDot} />}
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerTab: {
    position: 'absolute',
    // bottom: 0, // Move it up slightly to float above the tab bar
    // height: 70,
    width: 70,
    // borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFF',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 5, // Adds the shadow for Android
    left: '50%', // Start at the center of the screen
    transform: [{ translateX: -35 }],
    paddingTop: 2,
  },
  centerTabText: {
    fontSize: 10,
    marginTop: 4,
    color: 'gray',
    // backgroundColor: 'red'
    // color: '#fff',
    marginBottom: 10, 
  },
  notificationDot: {
    position: 'absolute', // Allows positioning relative to the parent container
    top: 0, // Adjust to position the dot at the top
    right: 0, // Adjust to position the dot on the right
    width: 10, // Size of the dot
    height: 10, // Keep the height and width the same for a circular shape
    borderRadius: 5, // Half of the width/height for a perfect circle
    backgroundColor: 'red', // The red color for the notification dot
    borderWidth: 1, // Optional border for a cleaner look
    borderColor: 'white', // Matches the parent background for separation
  },
});