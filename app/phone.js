import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import tw from "twrnc"; // Import Tailwind for React Native
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { Actions } from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneNumberScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const Login = async () =>{
    try{
      setLoading(true);
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const state = await signInWithEmailAndPassword(auth,Email,Password);
      if(state.user){
        setLoading(false);
        dispatch(Actions.setAuth(true));
        dispatch(Actions.setUser(state.user));
        await AsyncStorage.setItem('user', JSON.stringify(state.user));
        await AsyncStorage.setItem('auth', JSON.stringify(true));
        router.push("/home");
      }else{
        setLoading(false);
        Alert.alert("Login Failed");
      }
    }catch(e){
      setLoading(false);
      Alert.alert(e.message);
    }
  }

  return (
    <SafeAreaView>
      <View style={tw`flex w-full h-full p-10 justify-center items-center px-5 bg-white`}>
        <Image
          source={require("./../assets/phone.png")}
          style={tw`w-20 h-20 mb-5`}
        />
        <Text style={tw`text-2xl font-bold text-gray-800`}>
          Login
        </Text>
        <Text style={tw`text-s text-gray-500 mt-4 mb-2 w-full`}>Enter Email Address</Text>
        <View style={tw`flex-row justify-center items-center w-full  mb-5`}>
          <TextInput
            style={tw`flex-1 h-12 border border-gray-300 rounded-lg px-3 text-lg bg-white`}
            placeholder="johndoe@example.com"
            value={Email}
            onChangeText={txt => setEmail(txt)}
          />
        </View>
        <Text style={tw`text-s text-gray-500 mt-4 mb-2 w-full`}>Enter Password</Text>
        <View style={tw`flex-row justify-center items-center w-full  mb-5`}>
          <TextInput
            style={tw`flex-1 h-12 border border-gray-300 rounded-lg px-3 text-lg bg-white`}
            value={Password}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry
          />
        </View>
        {!loading ? <TouchableOpacity
          style={tw`w-[95%] h-12 bg-black justify-center items-center rounded-lg`}
          onPress={Login} // Moved onPress here
        >
          <Text style={tw`text-white text-lg font-bold`}>Login</Text>
        </TouchableOpacity> : <ActivityIndicator/>}
        <Text style={tw`text-black text-xs mt-5 font-bold`}>OR</Text>
        <TouchableOpacity
          style={tw`w-[95%] mt-2 h-12 justify-center items-center rounded-lg`}
          onPress={() => router.push("signup")} // Moved onPress here
        >
          <Text style={tw`text-black text-lg font-bold`}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
