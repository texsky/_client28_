import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
  } from "react-native";
  import React, { useState } from "react";
  import tw from "twrnc";
  import { useRouter } from "expo-router";
  import NavTitle from "./NavTitle";
  
  const editmail = () => {
    const router = useRouter();
    return (
      <SafeAreaView>
        <View style={tw`bg-[#F3F5FD] h-100%`}>
        <View
          style={tw`flex flex-row items-center justify-between bg-white px-4 py-4 mb-4`}
        >
          <NavTitle name="Edit Mail"/>
          <TouchableOpacity
            style={tw`p-2 rounded-md bg-black`}
            onPress={() => router.back()}
          >
            <Text style={tw`text-xl text-white px-3 text-center`}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-col items-center p-2`}>
          <TextInput
            placeholder="Enter Your Email"
            style={tw`border-b-2 border-gray-200  w-92%  mx-auto p-3`}
          />
        </View>
      </View>
      </SafeAreaView>
    );
  };
  
  export default editmail;
  