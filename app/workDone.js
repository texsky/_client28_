import React from 'react';
import { View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const workDone = () =>{

    const workDone = async () => {
        await AsyncStorage.setItem('onboard', JSON.stringify(true));
    }

    return(
        <View>  
            <SafeAreaView style={tw`flex flex-col justify-evenly items-center h-full`}>
                <Image source={require('../assets/workDone/workdone.png')} style={tw`w-[90%] h-[50%] mx-auto`}/>
                <Text style={tw`text-2xl font-bold`}>Work done</Text>
                <View>
                    <Text>Sit back and relax while skilled experts</Text>
                    <Text>efficiently take care of your tasks,</Text>
                    <Text>ensuring a job well done.</Text>
                </View>
                <View style={tw`flex flex-row gap-2 justify-center`}>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-gray-400`}></View>
                    <View style={tw`w-3 h-3 rounded-full bg-black`}></View>
                </View>
                <View style={tw`flex flex-row items-center justify-between w-full p-10`}>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-4 rounded-md bg-black`} onPress={()=>{
                        workDone();
                        router.push('/home');
                    }}>
                        <Text style={tw`text-xl text-green-200 w-30 text-center`}>Finish</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};  

export default workDone;