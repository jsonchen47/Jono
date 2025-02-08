import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Dimensions, Text } from 'react-native';
import { List } from 'react-native-paper'; // Import List from react-native-paper
import { useNavigation } from '@react-navigation/native'; // For navigating to user profile
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface UsersListProps {
  users: any;
  loadMoreUsers: any;
  isFetchingMore: any;
}

const UsersList = ({ users, loadMoreUsers, isFetchingMore }: UsersListProps) => {
  const navigation = useNavigation();
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    return (
      <List.Item
        style={styles.listItem}
        // title={
        //   item.name
        // }
        title={() => (
          <View>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>@{item.username}</Text>
          </View>
        )}
        titleStyle={styles.userName}
        description={item.bio}
        left={
            props => 
                <List.Image {...props} 
                    source={{ uri: item.image }} 
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                        marginLeft: 20, // Optional spacing between image and text
                    }}
                />}
        onPress={() =>
          router.push({
            pathname: '/otherProfile',
            params: { id: item.id },
          })
        }
      />
    );
  };

  return (
    <FlatList
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreUsers}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isFetchingMore ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <View style={{ paddingVertical: windowWidth * 0.05 }} />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
    // paddingTop: windowWidth * 0.065,
  },
  listItem: {
    width: '100%',
    // marginBottom: windowWidth * 0.05,
  },
  userName: {
    fontWeight: '500', 
    fontSize: 15, 
    paddingBottom: 5, 
  }, 

});

export default UsersList;
