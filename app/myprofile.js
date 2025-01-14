import { View, Text, TouchableOpacity, Image, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";
import NavTitle from "./NavTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE } from './api/base';
import AntDesign from '@expo/vector-icons/AntDesign';

const myprofile = () => {

  const router = useRouter();

  const [user,setUser] = useState();
  const [loading, setLoading] = useState(true);


  /**
   * Retrieves user data from AsyncStorage.
   *
   * @returns {Object|null} The user data if found, or null if not.
   */
  const getUserData = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(await AsyncStorage.getItem('user'));
      if (userData.uid) { 
        console.log(userData);
        await axios.get(`${BASE}/Api/v1/get/profile/${userData.uid}`).then(resp=>{
          setUser(resp.data);
          setLoading(false);
        }).catch(err=>{
          console.log(err);
          Alert.alert('Error', 'Failed to retrieve user data.');
          router.push('phone');
        })
      }else{
        Alert.alert('Error', 'Failed to retrieve user data.');
        router.push('phone');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      Alert.alert('Error', 'Failed to retrieve user data.');
      router.push('phone');
    }
  }

  useEffect(() => {
    getUserData();
  },[]);



  return (
    <SafeAreaView>
      {(user && !loading ) ? <View style={tw`bg-[#F3F5FD]`}>
        <View style={tw`flex flex-row items-center justify-start bg-white px-4 py-4`}>
          <NavTitle name="My Profile" />
        </View>

        {/* <TouchableOpacity
          style={tw`flex flex-row justify-between items-center pl-4 py-6 bg-white mt-1`}
          onPress={() => router.push("editphoto")}
        >
          <Text style={tw`text-lg font-semibold font-semibold text-black`}>
            Profile Photo
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={require("../assets/myprofile/Profile.png")}
              style={tw`w-16 h-16 mr-6`}
            ></Image>
            <View style={tw`pr-4`}>
              <RadixIcon name="chevron-right" size={22} color="grey" />
            </View>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={tw`flex flex-row justify-between pl-4 py-6 bg-white mt-1`}
          onPress={() => router.push("editname")}
        >
          <Text style={tw`text-lg font-semibold `}>Name</Text>
          <View style={tw`pr-4 flex flex-row items-center`}>
            <Text>{!loading && user.name}</Text>
            <AntDesign name="right" size={22} color="grey" style={tw`ml-2`}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between pl-4 py-6 bg-white mt-1`}
          onPress={() => router.push("editmail")}
        >
          <Text style={tw`text-lg font-semibold`}>Email</Text>
          <View style={tw`pr-4 flex flex-row items-center`}>
            <Text>{!loading && user.email}</Text>
            <AntDesign name="right" size={22} color="grey" style={tw`ml-2`}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between pl-4 py-6 bg-white mt-1`}
          onPress={() => router.push("editphone")}
        >
          <Text style={tw`text-lg font-semibold`}>Contact</Text>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`pr-4 flex flex-row items-center`}>
            <Text>{!loading && user.contact}</Text>
            <AntDesign name="right" size={22} color="grey" style={tw`ml-2`}/>
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between pl-4 py-6 bg-white mt-1`}
          onPress={() => router.push("editgender")}
        >
          <Text style={tw`text-lg font-semibold`}>Gender</Text>
          <View style={tw`pr-4 flex flex-row items-center`}>
            <Text>{!loading && user.gender}</Text>
            <AntDesign name="right" size={22} color="grey" style={tw`ml-2`}/>
          </View>
        </TouchableOpacity>
      </View> : <ActivityIndicator/>}
    </SafeAreaView>
  );
};

export default myprofile;
