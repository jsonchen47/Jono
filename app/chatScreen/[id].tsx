import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, FlatList, Platform, SafeAreaView } from 'react-native';
import Message from '../../src/components/Message';
import messages from '../../assets/data/messages.json';
import InputBox from '../../src/components/InputBox'
import { useHeaderHeight } from '@react-navigation/elements'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const bg = require("../../assets/images/BG.png");


export default function DetailsScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const height = useHeaderHeight()
  const navigation = useNavigation();

  useEffect(() => {
    // Set the header title to the user's name
    navigation.setOptions({
      title: name || 'Chat',  // Fallback to 'Chat' if name is not available
      headerBackTitle: 'Chat',
    });
  }, [name, navigation]);

  return (
    // <View style={styles.container}>
    //   <Text>Details of user {id} named {name} </Text>
    // </View>
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      keyboardVerticalOffset={height}
      behavior={ Platform.OS == "ios" ? "padding" : "height"}
      style={styles.bg}
    >
        
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => 
            <Message message={item}/>
          }
          style={styles.list}
          inverted
        />
        <InputBox/>
      </ImageBackground>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  }
});
