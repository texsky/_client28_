import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
const editname = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={tw`bg-[#F3F5FD]`}>
        <View style={tw`flex flex-row items-center justify-between w-full bg-white px-4 py-4`}>
          <View style={tw`flex flex-row items-center justify-start bg-white`}>
            <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={25} color="black" />            </TouchableOpacity>
            <Text style={tw`text-lg font-bold text-black ml-4`}>Edit Name</Text>
          </View>
          <TouchableOpacity style={tw`p-2 rounded-md bg-black`}>
            <Text style={tw`text-lg font-bold text-white`}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Enter Your Name"
          style={tw`border-b-2 border-gray-200 mx-auto mt-4 p-3 w-92% `}
        />
      </View>
    </SafeAreaView>
  );
};

export default editname;
