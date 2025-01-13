import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, SafeAreaView, Platform, Clipboard, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import tw from 'twrnc'; // Import tailwind class utility
import { useNavigation } from '@react-navigation/native';


const contactScreen = () => {
  const navigation = useNavigation();
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const phoneNumber = '+9234709635';
  const email = 'contact@mafimumshkil.services';

  // Handle phone number actions
  const handlePhonePress = () => setShowPhoneOptions(true);
  const handleCallPress = () => Linking.openURL(`tel:${phoneNumber}`);
  const handleWhatsappPress = () => Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  const handleCopyPhoneNumber = () => {
    Clipboard.setString(phoneNumber); // Use React Native Clipboard API
    alert('Phone number copied');
  };

  // Handle email actions
  const handleEmailPress = () => setShowEmailOptions(true);
  const handleSendEmail = () => Linking.openURL(`mailto:${email}`);
  const handleCopyEmail = () => {
    Clipboard.setString(email); // Use React Native Clipboard API
    alert('Email copied');
  };

  return (
    <SafeAreaView>
      {/* Header with back button */}
      <View style={tw`flex-row items-center mb-8`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* <Text style={tw`text-2xl font-bold flex-1 text-center`}>Contact Us</Text> */}
      </View>

      {/* Main Content */}
      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold mb-4 mt-4`}>Contact Us</Text>
        <Text style={tw`text-lg text-center mb-12`}>If you have any questions, we are happy to help</Text>

        <TouchableOpacity onPress={handlePhonePress} style={tw` items-center mb-6`}>
          {/* <Ionicons name="call" size={24} color="green" /> */}
          {/* <Image source={require('../../assets/phoneImage')}/> */}
          <Image source={require('../assets/phoneImage.png')} style={tw`w-12 h-12 rounded-lg`} />
          <Text style={tw`text-lg ml-2`}>{phoneNumber}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmailPress} style={tw`items-center mb-4`}>
          <Image source={require('../assets/emailImage.png')} style={tw`w-12 h-12 rounded-lg`} />
          <Text style={tw`text-lg ml-2`}>{email}</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Number Options Modal */}
      <Modal visible={showPhoneOptions}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPhoneOptions(false)}
      >
        <View style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-5 w-full max-w-xs rounded-2xl mb-8`}>
            {/* Copy Phone Number */}
            <TouchableOpacity
              onPress={handleCopyPhoneNumber}
              style={tw`py-4 border-b border-gray-300 flex-row items-center justify-between`}
            >
              <MaterialCommunityIcons name="content-copy" size={24} color="black" />
              <Text style={tw`text-lg flex-1 text-left pl-2`}>Copy phone number</Text>
            </TouchableOpacity>

            {/* Call Us */}
            <TouchableOpacity
              onPress={handleCallPress}
              style={tw`py-4 border-b border-gray-300 flex-row items-center justify-between`}
            >
              <Ionicons name="call-outline" size={24} color="black" />
              <Text style={tw`text-lg flex-1 text-left pl-2`}>Call us</Text>
            </TouchableOpacity>

            {/* Open in WhatsApp */}
            <TouchableOpacity
              onPress={handleWhatsappPress}
              style={tw`py-4 flex-row items-center justify-between`}
            >
              <Ionicons name="logo-whatsapp" size={24} color="black" />
              <Text style={tw`text-lg flex-1 text-left pl-2`}>Open in WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Email Options Modal */}
      <Modal visible={showEmailOptions} animationType="slide" transparent={true} onRequestClose={() => setShowEmailOptions(false)}>
        <View style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-5 w-full max-w-xs rounded-2xl mb-8`}>

            <TouchableOpacity
              onPress={handleCopyEmail}
              style={tw`py-4 border-b border-gray-300 flex-row items-center justify-between`}
            >
              <MaterialCommunityIcons name="content-copy" size={24} color="black" />
              <Text style={tw`text-lg flex-1 text-left pl-2`}>Copy email</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={handleSendEmail}
              style={tw`py-4 flex-row items-center justify-between`}
            >
              <MaterialCommunityIcons name="email-send-outline" size={24} color="black" />
              <Text style={tw`text-lg flex-1 text-left pl-2`}>Send email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={tw`items-center`}>
        <Text style={tw`text-xl font-normal mb-2 mt-8`}>Get Connected</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.linkedin.com/in/your-profile')}
            style={tw`items-center mx-px`}
          >
            <Ionicons name="logo-linkedin" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.facebook.com/your-profile')}
            style={tw`items-center mx-px`}
          >
            <Ionicons name="logo-facebook" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://twitter.com/your-profile')}
            style={tw`items-center mx-px`}
          >
            <Ionicons name="logo-twitter" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.instagram.com/your-profile')}
            style={tw`items-center mx-px`}
          >
            <Ionicons name="logo-instagram" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/your-whatsapp-number')}
            style={tw`items-center mx-px`}
          >
            <Ionicons name="logo-whatsapp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`my-6 border-b border-gray-200`}></View>
      <View style={tw`flex-row justify-center items-center`}>
        <Image source={require('../assets/logoImage.png')} style={tw`w-20 h-20`} />
        <Text style={tw`text-lg font-bold  `}>Logo Name</Text>
      </View>

    </SafeAreaView>
  );
};

export default contactScreen;
