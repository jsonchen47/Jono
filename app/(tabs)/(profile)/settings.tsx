import { View, Text, StyleSheet, Button } from 'react-native';
import PagerView from 'react-native-pager-view';
import {Auth} from 'aws-amplify';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Button onPress = {() => Auth.signOut()} title="Sign out"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: "100%",
	// height:"100%",
  },
  pagerViewContainer: {
    // flex: 1,
    width: "100%",
	height:"100%",
  }, 
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
	height:"100%",
  },
});
