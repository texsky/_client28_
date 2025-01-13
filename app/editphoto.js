import { View, Text, Image, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { RadixIcon } from "radix-ui-react-native-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import NavTitle from "./NavTitle";

const EditPhoto = () => {
  const router = useRouter();
  const [image, setimage] = useState({
    uri: "../assets/myprofile/Profile.png",
    updated: false,
  });
  const [modalVisible, setmodalVisible] = useState(false);

  const UploadImage = async (mode) => {
    try {
      let result;
      if (mode === "Gallery") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access gallery is required!");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to use camera is required!");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        console.log("Image selected:", result.assets[0].uri);
        await saveImage(result.assets[0].uri);
      }
    } catch (e) {
      alert("Error: " + e);
    }
  };

  const saveImage = async (imageUri) => {
    try {
      console.log("Image saved with URI:", imageUri);
      setmodalVisible(true);
      setimage({ uri: imageUri, updated: true });
    } catch (e) {
      console.error("Error saving image:", e);
    }
  };

  return (
    <SafeAreaView>
      <View style={tw`bg-[#F3F5FD] h-100%`}>
        <View
          style={tw`flex flex-row items-center justify-start bg-white px-4 py-4 mb-4`}
        >
          <NavTitle name="Edit Photo" />
        </View>
        <View style={tw`flex justify-center items-center mt-6`}>
          <Image
            source={
              image.updated
                ? { uri: image.uri }
                : require("../assets/myprofile/Profile.png")
            }
            style={tw`w-48 h-48 mb-10`}
          />
          <View style={tw`flex justify-center items-center`}>
            <TouchableOpacity
              style={tw`flex-row justify-around items-center p-4 w-76% bg-[#E2E8FF] mb-6`}
              onPress={() => UploadImage("Gallery")}
            >
              <Image
                source={require("../assets/myprofile/Gallery.png")}
                style={tw`w-8 h-8`}
              />
              <Text style={tw`text-lg font-bold text-gray-800 text-center`}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row justify-around items-center p-4 w-76 bg-[#E2E8FF] mb-2`}
              onPress={() => UploadImage("Camera")}
            >
              <Image
                source={require("../assets/myprofile/Camera.png")}
                style={tw`w-8 h-8`}
              />
              <Text style={tw`text-lg font-bold text-gray-800 text-center`}>
                Take Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View
            style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}
          >
            <View
              style={tw`w-[95%] bg-white rounded-xl p-5 justify-center items-center mb-5`}
            >
              <View
                style={tw`w-16 h-16 rounded-full bg-green-500 justify-center items-center mb-4`}
              >
                <Image
                  source={require("../assets/check.png")}
                  style={tw`w-8 h-8`}
                />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>
                Image Updated Successfully
              </Text>
              <TouchableOpacity
                style={tw`w-full h-12 bg-[#282828] justify-center items-center rounded-lg mt-4`}
                onPress={() => setmodalVisible(false)}
              >
                <Text style={tw`text-white text-lg font-bold`}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default EditPhoto;
