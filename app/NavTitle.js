import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { RadixIcon } from "radix-ui-react-native-icons";
import { useRouter } from "expo-router";

const NavTitle = ({ name }) => {
  const router = useRouter();
  return (
    <View style={tw`flex flex-row items-center justify-start bg-white`}>
      <TouchableOpacity onPress={() => router.back()}>
        <RadixIcon name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-lg font-bold text-black ml-4`}>{name}</Text>
    </View>
  );
};

export default NavTitle;
