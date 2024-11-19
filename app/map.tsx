import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const map = () => {
    const router = useRouter(); 
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ marginLeft: 10 }}>
            <FontAwesome6 name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
        ),
        headerTitle: 'Map',
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
        <MapView 
            provider={PROVIDER_GOOGLE} 
            style={styles.map} 
        />
      </View>
    )
}

export default map


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });