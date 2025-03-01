import React, { useState } from "react";
import { SafeAreaView,View,Text, TextInput, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import axios from "axios";
import { BASE } from './api/base';

const WorkerDetails = () => {

    const { data } = useLocalSearchParams();

    const myObject = data ? JSON.parse(decodeURIComponent(data)) : {};

    const [loading, setLoading] = useState(false);  

    const [workerID,setWorkerID] = useState("");

    const Verify = () =>{
        
        setLoading(true);
        axios.post(`${BASE}/Api/v1/check/worker/${workerID}/${myObject.uid}`).then(resp=>{
            console.log(resp);
            if(resp.data.status === "success"){
                Alert.alert(myObject.uid);
                axios.put(`${BASE}/Api/v1/update/worker/${myObject.uid}/true`).then(res=>{
                    if(resp.data.statyus === "success"){
                        router.push('/worker');
                    }
                    setLoading(false);
                }).catch(err=>{
                    console.log(err.message);
                    setLoading(false);
                })
            }else{
                setLoading(false);
                Alert.alert(resp.data.message);
            }
        }).catch(err=>{
            Alert.alert(err.message);
            setLoading(false);
            console.log(err);
        })
    }
    return (
        <SafeAreaView>
            <View style={tw`p-3 flex flex-col`}>
                <Text style={tw`font-bold text-2xl mt-3`}>WorkerDetails</Text>
                <View>
                    <TextInput placeholder="Enter Worker ID" style={tw`w-[90%] p-3 mt-4 border border-gray-300 mx-auto`} onChangeText={txt=>setWorkerID(txt)}/>
                    {!loading ? <TouchableOpacity style={tw`mx-auto mt-4 bg-black p-3 rounded-md w-[50%]`} onPress={Verify}>
                        <Text style={tw`text-white text-center`}>Verify</Text>
                    </TouchableOpacity> : <ActivityIndicator style={tw`mt-5`}/>}
                    <TouchableOpacity style={tw`mx-auto mt-4 p-3 rounded-md w-[50%]`} onPress={()=>router.push('phone')}>
                        <Text style={tw`text-black text-center`}>go back </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WorkerDetails;