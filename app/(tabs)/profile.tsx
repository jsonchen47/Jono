import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <ScrollView horizontal={true}>
        <Ionicons name="checkmark-circle" size={32} />
        <Ionicons name="checkmark-circle" size={32} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
