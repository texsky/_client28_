import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import tw from "twrnc";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { BASE } from "./api/base";
import { router } from "expo-router";
import axios from "axios";

const editname = () => {

  const router = useRouter();

  const { data } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSave = async () => {

    setLoading(true);

    const myObject = data ? JSON.parse(decodeURIComponent(data)) : {};

    const profileData = {
      ...myObject,
      // Set image_url to an empty string if no image is selected
      name:name
    };
    const formData = new FormData();

      formData.append('ProfileClass', JSON.stringify({ ...profileData, uid: myObject.uid }));

      // Send the POST request
      const response = await axios.post(`${BASE}/Api/v1/save/profile`, formData);

      if (response.status === 200) {
        Alert.alert('Success', 'Profile saved successfully!',);
        setLoading(false);
      } else {
        Alert.alert('Error', 'Failed to save profile. Please try again.');
        setLoading(false);
      }
      setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={tw`bg-[#F3F5FD]`}>
        <View style={tw`flex flex-row items-center justify-between w-full bg-white px-4 py-4`}>
          <View style={tw`flex flex-row items-center justify-start bg-white`}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={25} color="black" />            </TouchableOpacity>
            <Text style={tw`text-lg font-bold text-black ml-4`}>Edit Name</Text>
          </View>
          {!loading ? <TouchableOpacity style={tw`p-2 rounded-md bg-black`}>
            <Text style={tw`text-lg font-bold text-white`} onPress={HandleSave}>Save</Text>
          </TouchableOpacity> : <TouchableOpacity>
            <ActivityIndicator /></TouchableOpacity>}
        </View>
        <TextInput
          placeholder="Enter Your Name"
          style={tw`border-b-2 border-gray-200 mx-auto mt-4 p-3 w-92% `}
          onChangeText={(text) => setName(text)}
        />
      </View>
    </SafeAreaView>
  );
};

export default editname;
