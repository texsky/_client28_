import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

const becomeAWorker = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <Image source={require(`../assets/workerImage.png`)}/>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-center`}>BECOME A WORKER WITH US?</Text>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 p-4`}>
        <View style={tw`flex-row justify-between mb-4`}>
          {/* Increased Job Opportunities */}
          <View style={tw`flex-1 items-center`}>
            <Image source={require('../assets/clockImage.png')} style={tw`w-20 h-20 mb-2`} />
            <Text style={tw`text-lg font-medium text-center`}>Increased Job Opportunities</Text>
            <Text style={tw`text-sm text-center`}>Expand your client base and enjoy flexible working hours.</Text>
          </View>

          {/* Enhanced Professional Reputation */}
          <View style={tw`flex-1 items-center`}>
            <Image source={require('../assets/medalImage.png')} style={tw`w-20 h-20 mb-2`} />
            <Text style={tw`text-lg font-medium text-center`}>Enhanced Professional Reputation</Text>
            <Text style={tw`text-sm text-center`}>Build credibility through user reviews and showcase your work.</Text>
          </View>

          {/* Convenient Business Management */}
          <View style={tw`flex-1 items-center`}>
            <Image source={require('../assets/walletImage.png')} style={tw`w-20 h-20 mb-2`} />
            <Text style={tw`text-lg font-medium text-center`}>Convenient Business Management</Text>
            <Text style={tw`text-sm text-center`}>Enjoy a hassle-free payment process, with secure and direct earnings deposited into your account.</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-around`}>
          <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-md`}>
            <Text style={tw`text-white text-center`}>Register Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-gray-200 p-3 rounded-md`}>
            <Text style={tw`text-gray-800 text-center`}>Need Help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default becomeAWorker;