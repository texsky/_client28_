import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, FlatList, Image, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE } from "./api/base";


const RegisterasAdmin = () => {
    const navigation = useNavigation();
    const [workerData, setWorkerData] = useState({});
    const [showWorkTypeModal, setShowWorkTypeModal] = useState(false);
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);

    const workTypes = ["Plumber", "Cleaning", "Carpenter", "Electrician"];
    const countries = ["UAE", "India", "USA", "Canada"];

    // const toggleWorkType = (type) => {
    //     if (selectedWorkTypes.includes(type)) {
    //         setSelectedWorkTypes(selectedWorkTypes.filter((item) => item !== type));
    //     } else {
    //         setSelectedWorkTypes([...selectedWorkTypes, type]);
    //     }
    // };

    // const toggleCountry = (country) => {
    //     if (selectedCountries.includes(country)) {
    //         setSelectedCountries(selectedCountries.filter((item) => item !== country));
    //     } else {
    //         setSelectedCountries([...selectedCountries, country]);
    //     }
    // };

    const changeHandler = (key, value) => {
        setWorkerData({ ...workerData, [key]: value });
    };

    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {

        setLoading(true);

        try {
            const permissionGranted = await requestPermission();
            if (!permissionGranted) return;

            const token = await messaging().getToken();
            if (token) {
                console.log('FCM Token:', token);

                axios.post(`${BASE}/Api/v1/owner/save`, { ...workerData, token }).then((res) => {
                    setLoading(false);
                    if (res.data.status === "success") {
                        setShowSuccessModal(true);
                    } else {
                        Alert.alert(res.data.message);
                    }
                }).catch(err => {
                    setLoading(false);
                    console.log(err.message);
                    Alert.alert(err.message);
                })

            } else {
                Alert.alert('Error', 'Failed to retrieve FCM token');
            }
        } catch (error) {
            console.error('Error getting FCM token:', error);
            Alert.alert('Error', "Error retrieving FCM token: ${ error.message }");
        }
    };
    return (
        <SafeAreaView>
            <ScrollView
                style={tw`bg-[#F4F5FC]`}
                contentContainerStyle={tw`flex-grow`}
                showsVerticalScrollIndicator={false}
            >
                <View style={tw`flex-row items-center mb-4 bg-white p-4`}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={tw`text-xl font-black flex-1 text-center`}>Become A Admin</Text>
                </View>
    
                <View style={tw`flex-1 px-4`}>
                    <View style={tw`mb-4`}>
                        <Text style={tw`pb-2 font-normal text-md`}>Company Name</Text>
                        <TextInput
                            style={tw`w-full p-4 border border-gray-400 rounded-md`}
                            onChangeText={(value) => changeHandler("Companyname", value)}
                            value={workerData.Companyname}
                            placeholder="Company Name"
                        />
                    </View>
                    <View style={tw`mb-4`}>
                        <Text style={tw`pb-2 font-normal text-md`}>Full Name</Text>
                        <TextInput
                            style={tw`w-full p-4 border border-gray-400 rounded-md`}
                            onChangeText={(value) => changeHandler("FullName", value)}
                            value={workerData.FullName}
                            placeholder="Full Name"
                        />
                    </View>
    
                    <View style={tw`mb-4`}>
                        <Text style={tw`pb-2 font-normal text-md`}>Phone Number</Text>
                        <TextInput
                            style={tw`w-full p-4 border border-gray-400 rounded-md`}
                            onChangeText={(value) => changeHandler("PhoneNumber", value)}
                            value={workerData.PhoneNumber}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                        />
                    </View>
    
                    <View style={tw`mb-4`}>
                        <Text style={tw`pb-2 font-normal text-md`}>Email Address</Text>
                        <TextInput
                            style={tw`w-full p-4 border border-gray-400 rounded-md`}
                            onChangeText={(value) => changeHandler("Email", value)}
                            value={workerData.Email}
                            placeholder="Enter Email address"
                            keyboardType="email-address"
                        />
                    </View>
    
                    {/* <View style={tw`mb-4`}>
                            <Text style={tw`pb-2 font-normal text-md`}>Work Type</Text>
                            <TouchableOpacity
                                style={tw`w-full p-4 border border-gray-400 rounded-md`}
                                onPress={() => setShowWorkTypeModal(true)}
                            >
                                <Text>{selectedWorkTypes.join(", ") || "Select Work Type"}</Text>
                            </TouchableOpacity>
                        </View> */}
    
                    {/* <View style={tw`mb-4`}>
                            <Text style={tw`pb-2 font-normal text-md`}>Years Of Experience</Text>
                            <TextInput
                                style={tw`w-full p-4 border border-gray-400 rounded-md`}
                                onChangeText={(value) => changeHandler("YearsOfExperience", value)}
                                value={workerData.YearsOfExperience}
                                placeholder="Enter years of experience"
                                keyboardType="numeric"
                            />
                        </View> */}
    
                    {/* <View style={tw`mb-4`}>
                            <Text style={tw`pb-2 font-normal text-md`}>Experience Country</Text>
                            <TouchableOpacity
                                style={tw`w-full p-4 border border-gray-400 rounded-md`}
                                onPress={() => setShowCountryModal(true)}
                            >
                                <Text>{selectedCountries.join(", ") || "Select Countries"}</Text>
                            </TouchableOpacity>
                        </View> */}
    
                    {loading ? <ActivityIndicator /> : <TouchableOpacity style={tw`bg-black p-4 rounded-md mb-4`} onPress={submitHandler}>
                        <Text style={tw`text-white text-center`}>Submit</Text>
                    </TouchableOpacity>}
                </View>
    
                {/* Work Type Modal */}
                <Modal visible={showWorkTypeModal} animationType="slide" transparent={true}>
                    <View style={tw`flex-1 justify-end bg-gray-800 bg-opacity-50`}>
                        <View style={tw`bg-white mx-4 mb-4 p-4 rounded-lg`}>
                            <Text style={tw`text-lg text-center font-bold mb-4`}>Select Work Type</Text>
                            <FlatList
                                data={workTypes}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={tw`flex-row items-center mb-2 py-2 border-b border-gray-300`}
                                        onPress={() => toggleWorkType(item)}
                                    >
                                        <Ionicons
                                            name={selectedWorkTypes.includes(item) ? "checkbox" : "square-outline"}
                                            size={24}
                                            color="black"
                                        />
                                        <Text style={tw`ml-2`}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={tw`bg-black p-4 rounded-md mt-4`}
                                onPress={() => setShowWorkTypeModal(false)}
                            >
                                <Text style={tw`text-white text-center`}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
                {/* Country Modal */}
                <Modal visible={showCountryModal} animationType="slide" transparent={true}>
                    <View style={tw`flex-1 justify-end bg-gray-800 bg-opacity-50`}>
                        <View style={tw`bg-white mx-4 mb-4 p-4 rounded-lg`}>
                            <Text style={tw`text-lg text-center font-bold m-4 `}>Select Countries</Text>
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={tw`flex-row items-center mb-2 border-b border-gray-300 py-2`}
                                        onPress={() => toggleCountry(item)}
                                    >
                                        <Ionicons
                                            name={selectedCountries.includes(item) ? "checkbox" : "square-outline"} size={24} color="black"
                                        />
                                        {/* <Ionicons name="radio-button-off" size={24} color="black" /> */}
                                        <Text style={tw`ml-6 `}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={tw`bg-black p-4 rounded-md mt-4`}
                                onPress={() => setShowCountryModal(false)}
                            >
                                <Text style={tw`text-white text-center`}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
                {/* Success Modal */}
                <Modal visible={showSuccessModal} animationType="slide" transparent={true}>
                    <View style={tw`flex-1 justify-end items-center bg-gray-800 bg-opacity-50`}>
                        <View style={tw`bg-white mx-4 mb-4 p-6 rounded-lg items-center`}>
                            <Image source={require("../assets/check.png")} style={tw`w-14 h-14 mb-4 bg-green-500 rounded-full`} />
                            <Text style={tw`text-lg font-bold mb-2`}>Registration Submitted</Text>
                            <Text style={tw`text-center mb-4`}>Thank you for registering as a skilled worker with us. We will get back to you soon.</Text>
                            <TouchableOpacity
                                style={tw`bg-black p-4 rounded-md`}
                                onPress={() => setShowSuccessModal(false)}
                            >
                                <Text style={tw`text-white font-bold text-center w-35`}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );

};


export default RegisterasAdmin;
