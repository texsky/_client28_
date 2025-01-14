import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
const becomeAWorker = () => {
  const navigation = useNavigation();
  return (
    <ScrollView 
      style={tw`bg-white`} 
      contentContainerStyle={tw`flex-grow`} // Ensure content fills the ScrollView
      showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
    >
      <View style={tw`flex-1 bg-white w-full`}>
        {/* Header */}
        
        <View style={tw`relative w-full h-70`}>
    {/* Image */}
    <Image
      source={require(`../assets/workerImage.png`)}
      style={tw`w-full h-full object-cover`}
    />
    {/* Back Icon */}
    <View style={tw`absolute top-6 right-6 bg-white rounded-full p-2 shadow-lg`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-black text-center`}>
            BECOME A WORKER WITH US?
          </Text>
          <Text style={tw`text-sm font-normal text-center`}>
            Join Our Workforce Today
          </Text>
        </View>

        {/* Main Content */}
        <View style={tw`p-4`}>
          {/* Increased Job Opportunities */}
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={require('../assets/clockImage.png')}
              style={tw`w-16 h-16 mr-4`}
              resizeMode="contain"
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-medium mb-1`}>
                Increased Job Opportunities
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                Expand your client base and enjoy flexible working hours.
              </Text>
            </View>
          </View>

          {/* Enhanced Professional Reputation */}
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={require('../assets/medalImage.png')}
              style={tw`w-16 h-16 mr-4`}
              resizeMode="contain"
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-medium mb-1`}>
                Enhanced Professional Reputation
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                Build credibility through user reviews and showcase your work.
              </Text>
            </View>
          </View>

          {/* Convenient Business Management */}
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={require('../assets/walletImage.png')}
              style={tw`w-16 h-16 mr-4`}
              resizeMode="contain"
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-medium mb-1`}>
                Convenient Business Management
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                Enjoy a hassle-free payment process, with secure and direct
                earnings deposited into your account.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={tw`p-4`}>
          <TouchableOpacity style={tw`bg-black p-4 rounded-md mb-4`} onPress={() => router.push('/workerDetail')}>
            <Text style={tw`text-white text-center`}>Register Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-gray-200 p-4 rounded-md`}>
            <Text style={tw`text-gray-800 text-center`}>Need Help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default becomeAWorker;