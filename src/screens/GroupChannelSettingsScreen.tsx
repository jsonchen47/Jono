import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useChatContext } from 'stream-chat-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupChannelSettingsScreen = () => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { params } = useRoute<any>();

  const channelId = params?.channelId;
  const [channel, setChannel] = useState<any>(null);
  const [channelName, setChannelName] = useState('');
  const [channelImage, setChannelImage] = useState('');
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchChannel = async () => {
      if (!channelId) return;
      try {
        const fetchedChannel = client.channel('messaging', channelId);
        await fetchedChannel.watch();

        setChannel(fetchedChannel);
        setChannelName(fetchedChannel.data?.name || '');
        setChannelImage(fetchedChannel.data?.image || '');

        // Fetch members list
        const memberList = Object.values(fetchedChannel.state.members);
        setMembers(memberList);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannel();
  }, [channelId]);

  const updateChannel = async () => {
    if (!channel) return;
    try {
      await channel.update({
        name: channelName,
        image: channelImage,
      });
      Alert.alert('Success', 'Channel updated successfully!');
    } catch (error) {
      console.error('Error updating channel:', error);
      Alert.alert('Error', 'Failed to update channel');
    }
  };

  const leaveChannel = async () => {
    if (!channel) return;
    try {
      await channel.removeMembers([client.userID]);
      Alert.alert('Left Channel', 'You have left the group chat.');
      navigation.goBack();
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  };

  const deleteChannel = async () => {
    if (!channel) return;
    Alert.alert(
      'Delete Channel',
      'Are you sure you want to delete this group chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await channel.delete();
              Alert.alert('Deleted', 'Group chat has been deleted.');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting channel:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Chat Settings</Text>
      </View>

      {/* Channel Info Section */}
      <View style={styles.channelCard}>
        <Image source={{ uri: channelImage }} style={styles.channelImage} />
        <TextInput
          mode="outlined"
          label="Channel Name"
          value={channelName}
          onChangeText={setChannelName}
          style={styles.input}
        />
        <Button mode="contained" onPress={updateChannel} style={styles.updateButton}>
          Update Channel
        </Button>
      </View>

      {/* Members Section */}
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.user.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Image source={{ uri: item.user.image }} style={styles.memberAvatar} />
            <View style={styles.memberDetails}>
              <Text style={styles.memberName}>{item.user.name || item.user.id}</Text>
              <Text style={styles.memberRole}>{item.role === 'owner' ? 'Admin' : 'Member'}</Text>
            </View>
          </View>
        )}
      />

      {/* Actions */}
      <View style={styles.actions}>
        {/* <Button mode="outlined" color="black" onPress={deleteChannel} style={styles.actionButton} textColor={'#2B96E2'}>
          Delete Group Chat
        </Button> */}
        <Button mode="outlined" color="black" onPress={leaveChannel} style={styles.actionButton} textColor={'red'}>
          Leave Group Chat
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GroupChannelSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  channelCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  channelImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#ddd',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#1D3557',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberRole: {
    fontSize: 14,
    color: 'gray',
  },
  actions: {
    marginTop: 20,
  },
  actionButton: {
    marginBottom: 10,
    borderRadius: 10,
  },
});
