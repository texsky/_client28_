import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, Modal } from "react-native";
import tw from 'twrnc';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The Index component serves as the introductory screen for the app.
 *
 * This screen displays a welcoming message and an image, inviting users
 * to get started with the app. It includes a "Get Started" button that
 * navigates users to the 'Choose Service' screen.
 *
 * @returns {JSX.Element} The rendered Index screen component.
 */

const Index = () =>{


    const [loading,setLoading] = useState(true);

    const checkOboard = async () =>{
        const state = JSON.parse(await AsyncStorage.getItem('onboard') && JSON.parse(await AsyncStorage.getItem('auth')));
        if(state){
            router.push('home');
        }else{
            router.push('phone');
        }
    }

    useEffect(()=>{
        checkOboard();
    },[]);


    return(
        <View>
            <SafeAreaView style={tw`flex flex-col justify-evenly h-full items-center`}>
                <View>
                    <Text style={tw`text-3xl font-bold`}>Best Helping</Text>
                    <Text style={tw`text-3xl font-bold`}>Hands for you</Text>
                </View>
                <View>
                    <Text style={tw`text-base`}>With Our On-Demand Services App,</Text>
                    <Text style={tw`text-base`}>We Give Better Services To You</Text>
                </View>
                <Image source={require('../assets/getStarted/img.png')} style={tw`w-full h-[50%]`}/>
                <TouchableOpacity style={tw`bg-black p-4 w-[80%] rounded-md`} onPress={()=>router.push('/chooseService')}>
                    <Text style={tw`text-green-200 text-center`}>Get Started</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default Index;