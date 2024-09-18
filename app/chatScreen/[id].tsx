import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, FlatList, Platform, SafeAreaView } from 'react-native';
import Message from '../../src/components/Message';
import messages from '../../assets/data/messages.json';
import InputBox from '../../src/components/InputBox'
import { useHeaderHeight } from '@react-navigation/elements'



const bg = require("../../assets/images/BG.png");


export default function DetailsScreen() {
  const { id, name } = useLocalSearchParams();
  const height = useHeaderHeight()

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
