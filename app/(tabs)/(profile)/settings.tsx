import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';




export default function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const settingsData = [
    {
      id: '1',
      title: 'Sign out',
      onPress: () => Auth.signOut(),
      showChevron: false,
      icon: 'log-out',
    },
    {
      id: '2',
      title: 'Delete Account',
      onPress: () => {
        router.push('/(tabs)/(profile)/deleteAccount')
      },
      showChevron: true,
      icon: 'trash-2',
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => item.onPress(navigation)}
    >
      <View style={styles.listItemContent}>
        <Icon name={item.icon} size={20} color="#333" />
        <Text style={styles.listItemText}>{item.title}</Text>
      </View>
      {item.showChevron && (
        <Icon name="chevron-right" size={20} color="#333" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    marginTop: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 12,
  },
});
