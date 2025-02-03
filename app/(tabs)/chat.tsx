import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import ChatNavigator from '@/src/navigation/ChatNavigator';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { useRouter } from 'expo-router';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;


const ChatScreen = () => {
  // const { sdk } = useSendbirdChat();
  // const router = useRouter();
  // const [isPremium, setIsPremium] = useState(false);

  // useEffect(() => {
  //   const checkPremiumStatusAndShowPaywall = async () => {
  //     try {
  //       const customerInfo = await Purchases.getCustomerInfo();
  //       const premium = !!customerInfo.entitlements.active['premium'];
  //       setIsPremium(premium);

  //       if (!premium) {
  //         await showPaywall(); // Trigger the paywall immediately
  //       }
  //     } catch (error) {
  //       console.error('Error checking premium status:', error);
  //       Alert.alert('Error', 'An error occurred while checking your subscription status.');
  //     }
  //   };

  //   checkPremiumStatusAndShowPaywall();
  // }, []);

  // const showPaywall = async () => {
  //   try {
  //     const offerings = await Purchases.getOfferings();

  //     if (offerings.current) {
  //       const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
  //         offering: offerings.current,
  //         requiredEntitlementIdentifier: 'premium',
  //       });

  //       if (paywallResult === RevenueCatUI.PAYWALL_RESULT.PURCHASED) {
  //         console.log('Purchase successful! Unlocking premium features.');
  //         setIsPremium(true); // Update the premium state
  //       } else {
  //         console.log('Paywall dismissed without purchase');
  //         router.replace('/'); // Redirect the user if they dismiss the paywall
  //       }
  //     } else {
  //       console.error('No offerings configured in RevenueCat.');
  //       Alert.alert('Error', 'No available offerings found.');
  //     }
  //   } catch (error) {
  //     console.error('Error presenting paywall:', error);
  //     Alert.alert('Error', 'An error occurred while processing the paywall.');
  //   }
  // };

  // if (!isPremium) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       {/* Header */}
  //       <View style={styles.header}>
  //         <Text style={styles.headerText}>Chat</Text>
  //       </View>

  //       {/* Non-Premium Content */}
  //       <View style={styles.content}>
  //         <Text style={styles.message}>Upgrade to Premium to use Chat!</Text>
  //         <Image
  //           source={require('../../assets/images/alien.png')} // Correct way to include a local image
  //           style={styles.image}
  //           resizeMode="contain"
  //         />
  //         <TouchableOpacity style={styles.upgradeButton} onPress={showPaywall}>
  //           <Text style={styles.buttonText}>Upgrade Now</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return <ChatNavigator />;
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 30,
    // backgroundColor: '#003B7B',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 12, 
    // color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20, 
  },
  image: {
    width: windowWidth*0.5,
    // height: 150,
    height: 150, 
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#004068', // Teal/Dark Blue
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 70,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
