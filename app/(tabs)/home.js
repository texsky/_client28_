import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, Text, TextInput, View, Platform, TouchableOpacity, ScrollView, Modal, ActivityIndicator, RefreshControl, Alert } from "react-native";
import tw from "twrnc";
import { useRouter } from 'expo-router';
import { SimpleGrid } from 'react-native-super-grid';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE } from "../api/base";
import { signOut, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebase";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

/**
 * The Home screen of the app.
 *
 * This screen renders the app's navigation header and a search bar for services.
 * It also renders a list of services that can be searched, with each service
 * represented by an icon and a bold text label.
 *
 * @returns {React.ReactElement} JSX for the Home screen
 */
const Home = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [services, setServices] = useState([]);
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

/**
 * Checks the user's authentication status.
 *
 * This asynchronous function retrieves the 'auth' data from AsyncStorage
 * and parses it to determine the user's authentication status.
 * If the user is not authenticated, they are redirected to the phone
 * authentication screen.
 *
 * @returns {Promise<void>} A promise that resolves when the authentication
 * status is checked and the user is redirected if not authenticated.
 */
    const checkAuth = async () =>{
        const Auth = JSON.parse(await AsyncStorage.getItem('auth'));
        if(!Auth){
            router.push("/phone");
        }
    }


    useEffect(() => {
        checkAuth();
    },[]);


/**
 * Fetches the list of services from the remote server.
 *
 * This asynchronous function sends a GET request to the specified endpoint
 * to retrieve the services data. Once the data is successfully fetched,
 * it is stored in the 'services' state variable. If an error occurs during
 * the fetching process, the error is logged to the console.
 *
 * @returns {Promise<void>} A promise that resolves when the services are fetched and set.
 */
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${BASE}/Api/v1/Get/services`,{withCredentials: true});
            setServices(response.data);
        }
        catch (error) {
            console.error("Error fetching services", error);
        }
    }

    /**
     * Triggers a refresh of the services list.
     *
     * This function is a callback for the RefreshControl component.
     * It sets the 'refreshing' state to true, fetches the services list
     * from the remote server, and sets the 'refreshing' state to false.
     *
     * @returns {void} No return value.
     */
    const onRefreshControl = () => {
        setRefreshing(true);
        fetchServices();
        setRefreshing(false);
    }

    const Logout = async () =>{

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        await AsyncStorage.removeItem('auth');
        await AsyncStorage.removeItem('user');
        await signOut(auth).then(response => {
            setModalVisible(false);
            router.push("/phone");
        }).catch(error => {
            console.log(error);
            Alert.alert(error.message);
        });
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <View style={tw`bg-[#F4F5FC] h-full`}>
            <Modal visible={modalVisible} animationType="fade">
                <SafeAreaView>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}>
                        <View style={tw`p-5 flex flex-row items-center justify-between`}>
                            <Text style={tw`text-2xl`}>CLIENT 28</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={tw`bg-[#F4F5FC] w-full h-full`}>
                            <TouchableOpacity
                                onPress={() => router.push("myprofile")}>
                                <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(false);
                                        router.push("myprofile");
                                    }}>
                                        <View style={tw`flex flex-row items-center gap-4`}>
                                        <Feather name="user" size={24} color="gray" />
                                            <Text>My Profile</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View>
                                        <AntDesign name="right" size={20} color="grey"/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                        setModalVisible(false);
                                        router.push("contactScreen");
                                    }}>
                                <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                    <View style={tw`flex flex-row items-center gap-4`}>
                                    <Feather name="message-square" size={24} color="gray" />
                                        <Text>Contact Us</Text>
                                    </View>
                                    <View>
                                        <AntDesign name="right" size={20} color="grey"/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                        setModalVisible(false);
                                        router.push("becomeAWorker");
                                    }}>
                                <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                    <View style={tw`flex flex-row items-center gap-4`}>
                                    <FontAwesome name="hand-stop-o" size={24} color="gray" />
                                        <Text>Become a Worker</Text>
                                    </View>
                                    <View>
                                        <AntDesign name="right" size={20} color="grey"/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                <View style={tw`flex flex-row items-center gap-4`}>
                                    <RadixIcon name="component" size={24} color="gray" />
                                    <Text>Register a Company</Text>
                                </View>
                                <View>
                                    <AntDesign name="right" size={20} color="grey"/>
                                </View>
                            </View> */}
                            <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                <View style={tw`flex flex-row items-center gap-4`}>
                                <AntDesign name="sharealt" size={24} color="gray" />
                                    <Text>Share</Text>
                                </View>
                                <View>
                                    <AntDesign name="right" size={20} color="grey"/>
                                </View>
                            </View>
                            <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                <View style={tw`flex flex-row items-center gap-4`}>
                                <Feather name="star" size={24} color="gray" />
                                    <Text>Rate</Text>
                                </View>
                                <View>
                                    <AntDesign name="right" size={20} color="grey"/>
                                </View>
                            </View>
                            <View style={tw`p-5 flex flex-row items-center justify-between bg-white mt-3`}>
                                <TouchableOpacity onPress={()=>{
                                    Logout();
                                }}>
                                    <View style={tw`flex flex-row items-center gap-4`}>
                                    <Feather name="log-out" size={24} color="gray" />
                                        <Text>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <AntDesign name="right" size={20} color="grey"/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
            <View style={tw`${Platform.OS === "android" ? "h-30" : "h-52"} bg-[#CCFD01] flex flex-row items-center justify-between px-5`}>
                <View style={tw`flex flex-row`}>
                    <Feather name="framer" size={32} color="black" />
                    <Text style={tw`text-2xl font-bold`}>Radix</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Feather name="menu" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <TextInput placeholder="Search for services" style={tw`border border-gray-100 rounded-md p-5 w-[95%] mx-auto ${Platform.OS === "ios" ? "-mt-10" : "-mt-7"} bg-white`} />
            </View>
            <View>
                <SafeAreaView>
                    <ScrollView>
                        <View style={tw`p-5 pb-20`}>
                            <Text style={tw`text-2xl font-bold mt-5`}>Services</Text>
                            {
                                services.length > 0 ? (
                                    <SimpleGrid
                                        itemDimension={130}
                                        data={[...services.slice(0,7), { service: "More", image: "More", image: "https://static.thenounproject.com/png/683450-200.png"}]}
                                        renderItem={({ item }) => (<TouchableOpacity onPress={() => {
                                            if (item.service === "More") {
                                                router.push({pathname:"categories", params:{item:item}});
                                            }else{
                                                router.push(`placeorder?data=${encodeURIComponent(JSON.stringify(item))}`)
                                            }
                                        }}>
                                            <View style={tw`flex flex-col items-center justify-center p-4 rounded-md bg-white gap-4`}>
                                                <Image source={{uri:item.image}} key={item.id} style={tw`w-10 h-10 rounded-full`} />
                                                <Text style={tw`text-xs text-center font-bold`}>{item.service}</Text>
                                            </View>
                                        </TouchableOpacity>)}
                                    />
                                ) : (
                                    <ActivityIndicator/>
                                )
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
};

export default Home;