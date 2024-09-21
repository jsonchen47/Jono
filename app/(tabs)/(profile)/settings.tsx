import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';


export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Settings</Text> */}
      <View style={styles.page}>
      <PagerView style={styles.pagerViewContainer} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
