import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { RadixIcon } from "radix-ui-react-native-icons";
import tw from "twrnc";
import { router } from "expo-router";
import { SimpleGrid } from 'react-native-super-grid';
import axios from "axios";
import { BASE } from "./api/base";


/**
 * The Categories component renders a list of categories as a scrollable
 * grid of cards. Each card contains an icon and a text label. The
 * component also includes a "More" button at the bottom of the screen
 * that navigates to the full list of categories.
 *
 * @returns {JSX.Element} The rendered Categories screen component.
 */
const Categories = () => {

    const [services, setServices] = useState([]);
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${BASE}/Api/v1/Get/services`, { withCredentials: true });
            setServices(response.data);
        }
        catch (error) {
            console.error("Error fetching services", error);
        }
    }

    useEffect(()=>{
        fetchServices();
    },[]);


    return (
        <View>
            <SafeAreaView>
                <View style={tw`flex flex-row items-center p-2 gap-4 pb-5`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <RadixIcon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={tw`font-bold text-xl`}>Categories</Text>
                </View>
                <View style={tw`bg-[#F4F5FC] h-full w-full`}>
                    <ScrollView>
                        <View style={tw`p-5`}>
                            {
                                services.length > 0 ? (
                                    <SimpleGrid
                                        itemDimension={130}
                                        data={[...services]}
                                        renderItem={({ item }) => (<TouchableOpacity onPress={() => {
                                            if (item.service === "More") {
                                                router.push({ pathname: "categories", params: { item: item } });
                                            } else {
                                                router.push(`placeorder?data=${encodeURIComponent(JSON.stringify(item))}`)
                                            }
                                        }}>
                                            <View style={tw`flex flex-col items-center justify-center p-4 rounded-md bg-white gap-4`}>
                                                <Image source={{ uri: item.image }} key={item.id} style={tw`w-10 h-10 rounded-full`} />
                                                <Text style={tw`text-xs text-center font-bold`}>{item.service}</Text>
                                            </View>
                                        </TouchableOpacity>)}
                                    />
                                ) : (
                                    <ActivityIndicator />
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Categories;