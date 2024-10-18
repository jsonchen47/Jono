// import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import { useRouter } from 'expo-router';
// import Icon from 'react-native-vector-icons/FontAwesome6';
// import Icon2 from 'react-native-vector-icons/Ionicons';
// import Icon3 from 'react-native-vector-icons/AntDesign';


// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const search = () => {
//   const [text, setText] = useState('');
//   const router = useRouter();

//   return (
//     <SafeAreaView>
//       <View style={styles.searchBarContainer}>
//         <View style={styles.searchButton}
//         >
//           <Icon2 name='search' style={styles.searchButtonIcon}/>
//           {/* <Text style={styles.searchButtonText}>Assemble the perfect team</Text> */}
//         </View>
//         <View 
//           style={styles.backArrowContainer}
//           >
//           <TouchableOpacity
//             onPress={() => router.back()}
//             >
//             <Icon3 name='arrowleft' style={styles.backArrow}/>
//           </TouchableOpacity>
//           <TextInput 
//             style={styles.searchButtonText}
//             placeholder="Find projects and dreamers"
//             placeholderTextColor="#4C4C4C"
//             autoFocus={true} 
//             value={text}
//             onChangeText={setText}
//           />
//         </View>

//     </View>
//     </SafeAreaView>
//   )
// }

// export default search

// const styles = StyleSheet.create({
//   tabsContainer: {
//   },
//   safeAreaViewContainer: {
//     flex: 1,
//   },
//   tabLabelContainer: {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//     marginHorizontal: 10,
//   }, 
//   tabLabelText: {
//     paddingTop: 5, 
//     paddingBottom: 0, 
//     fontSize: 12,
//   }, 
//   // Search Bar
//   searchBarContainer: {
//     marginHorizontal: windowWidth*0.05, 
//     paddingVertical: 10, 
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchButton: {
//     backgroundColor: 'lightgray',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginHorizontal: 10, 
//     borderRadius: 30, // This gives the rounded corners
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     borderWidth: 1, 
//     borderColor: 'black',
//   },
//   searchButtonIcon: {
//     fontSize: 20,
//     paddingRight: 10,
//     opacity: 0,
//   }, 
//   searchButtonText: {
//     color: '#4C4C4C',
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   filterButton: {
//     height: 35, 
//     width: 35, 
//     borderRadius: 20, 
//     backgroundColor: 'white', 
//     position: 'absolute',
//     right: 10,
//     justifyContent: 'center', 
//     alignItems: 'center',
//   },
//   filterButtonContainer: {
//     width: windowWidth*0.87,
//     height: '100%',
//     position: 'absolute',
//     justifyContent: 'center', 
//     alignItems: 'flex-end',
//   }, 
//   backArrowContainer: {
//     left: 10,
//     position: 'absolute',
//     flexDirection: 'row',
//   }, 
//   backArrow: {
//     fontSize: 20,
//     paddingLeft: 10,
//     paddingRight: 10, 
//   }, 
// })


import { View, Text, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;

const Search = () => {
  const [text, setText] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.searchBarContainer}>
        {/* Back Arrow */}
        

        {/* Search Input Container */}
        <View style={styles.textInputContainer}>
          {/* <Icon2 name='search' style={styles.searchButtonIcon} /> */}
          <Icon3 name='arrowleft' style={styles.backArrow} onPress={() => router.back()} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find projects and dreamers"
            placeholderTextColor="#4C4C4C"
            autoFocus={true}
            value={text}
            onChangeText={setText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: windowWidth * 0.05,
    paddingVertical: 10,
    flexDirection: 'row',  // Align elements in a row
    alignItems: 'center',   // Center items vertically
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    flex: 1,  // Ensure this takes the remaining space
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },
  searchInput: {
    flex: 1,  // Ensure TextInput takes available space
    fontSize: 16,
    color: '#4C4C4C',
    paddingLeft: 10,
  },
  searchButtonIcon: {
    fontSize: 20,
    color: '#4C4C4C',
  },
  backArrow: {
    fontSize: 20,
    color: '#4C4C4C',
  },
});
