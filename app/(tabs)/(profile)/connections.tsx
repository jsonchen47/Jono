import { View, Text, FlatList } from 'react-native'
import React from 'react'
import chats from '../../../assets/data/chats.json'
import ContactListItem from '../../../src/components/ContactListItem'

const connections = () => {
  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({item}) => 
            <ContactListItem user={item.user}/>
        }
        />
    </View>
  )
}

export default connections
