import React from 'react';
import { View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { router } from 'expo-router';

const getQuote = () =>{
    return(
        <View>  
            <SafeAreaView style={tw`flex flex-col justify-evenly items-center h-full`}>
                <Image source={require('../assets/getQuote/quote.png')} style={tw`w-[90%] h-[50%] mx-auto`}/>
                <Text style={tw`text-2xl font-bold`}>Get a Quote</Text>
                <View>
                    <Text>Request price estimates from</Text>
                    <Text>professionals to help you make informed</Text>
                    <Text>decisions with ease.</Text>
                </View>
                <View style={tw`flex flex-row gap-2 justify-center`}>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-black`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                </View>
                <View style={tw`flex flex-row items-center justify-between w-full p-10`}>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-4 rounded-md bg-black`} onPress={()=>router.push('/workDone')}>
                        <Text style={tw`text-xl text-green-200 w-30 text-center`}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};  

export default getQuote;