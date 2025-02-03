import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChannelList } from 'stream-chat-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChannelListScreen = () => {
  const navigation = useNavigation<any>();

  // Set up header with the pen icon
  useEffect(() => {
    navigation.setOptions({
      title: 'Messages',
      headerStyle: { backgroundColor: 'white' },
      headerTintColor: 'black',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('GroupChannelCreate')} style={styles.iconContainer}>
          <Icon name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ChannelList
        onSelect={(channel) => navigation.navigate('GroupChannel', { channelId: channel.id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  iconContainer: { 
    marginRight: 15 
  },
});

export default ChannelListScreen;
