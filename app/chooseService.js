import React from 'react';
import { View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { router } from 'expo-router';

const chooseService = () =>{
    return(
        <View>  
            <SafeAreaView style={tw`flex flex-col justify-evenly items-center h-full`}>
                <Image source={require('../assets/chooseService/choose.png')} style={tw`w-[90%] h-[50%] mx-auto`}/>
                <Text style={tw`text-2xl font-bold`}>Choose a Service</Text>
                <View>
                    <Text>Find the right service for your needs</Text>
                    <Text>easily, with a variety of options</Text>
                    <Text>available at your fingertips</Text>
                </View>
                <View style={tw`flex flex-row gap-2 justify-center`}>
                    <View style={tw`w-3 h-3 rounded-full bg-black`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                </View>
                <View style={tw`flex flex-row items-center justify-between w-full p-10`}>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-4 rounded-md bg-black`} onPress={()=>router.push('/getQuote')}>
                        <Text style={tw`text-xl text-green-200 w-30 text-center`}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};  

export default chooseService;