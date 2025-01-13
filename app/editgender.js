import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import tw from "twrnc";
import NavTitle from "./NavTitle";
import { useRouter } from "expo-router";

const EditGender = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView>
        <View style={tw`bg-[#F3F5FD] h-100%`}>
          <View
            style={tw`flex flex-row items-center justify-between bg-white px-4 py-4 mb-4`}
          >
            <NavTitle name="Edit Mail" />
            <TouchableOpacity
              style={tw`p-2 rounded-md bg-black`}
              onPress={() => router.back()}
            >
              <Text style={tw`text-xl text-white px-3 text-center`}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <RadioButton
              value="female"
              status={selectedGender === "female" ? "checked" : "unchecked"}
              onPress={() => setSelectedGender("female")} // Update state on selection
            />
            <Text style={tw`text-lg`}>Female</Text>
          </View>

          <View style={tw`flex-row items-center mb-4`}>
            <RadioButton
              value="male"
              status={selectedGender === "male" ? "checked" : "unchecked"}
              onPress={() => setSelectedGender("male")} // Update state on selection
            />
            <Text style={tw`text-lg`}>Male</Text>
          </View>

          <View style={tw`flex-row items-center mb-4`}>
            <RadioButton
              value="others"
              status={selectedGender === "others" ? "checked" : "unchecked"}
              onPress={() => setSelectedGender("others")} // Update state on selection
            />
            <Text style={tw`text-lg`}>Others</Text>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default EditGender;
