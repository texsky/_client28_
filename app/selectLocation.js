import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import tw from "twrnc";
import { router } from "expo-router";
import { RadixIcon } from "radix-ui-react-native-icons";
import * as Location from 'expo-location';


/**
 * A React component that displays a map and allows the user to select their location.
 * The component requests the user's foreground location permission and, if granted,
 * retrieves the current geographical location with high accuracy.
 * The location is updated and displayed on the map with predefined deltas.
 * If the location permission is denied or an exception occurs, an error message is logged.
 * The component also renders a loading message until the location is retrieved.
 * @returns {JSX.Element} The rendered SelectLocation component.
 */
const selectLocation = () => {

    const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

    const [loading, setLoading] = useState(false);

    // Handle the drag event and update coordinates
    const onDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({latitude:latitude,longitude:longitude});
    };

    // Get the current position when the component mounts

    /**
     * Asynchronously requests the user's foreground location permission and, if granted, 
     * retrieves the current geographical location with high accuracy. 
     * Updates the location state with the obtained latitude, longitude, and predefined deltas.
     * Logs an error message if the location permission is denied or if an exception occurs.
     */

    const getLocation = async () => {
        try {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.log("Location permission denied");
            } else {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }); // console.log(location.coords.latitude, location.coords.longitude);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error requesting location permission:", error);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View>
            <SafeAreaView>
                <View style={tw`flex flex-row items-center p-2 gap-4 pb-5`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <RadixIcon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={tw`font-bold text-xl`}>Select Location</Text>
                </View>
                {!loading ? <MapView style={tw`w-full h-full`} region={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                    <Marker draggable coordinate={location} onDragEnd={onDragEnd}>
                        <Text style={tw`text-4xl`}>📍</Text>
                    </Marker>
                </MapView> : <Text style={tw`p-5`}>Loading...</Text>}
                {!loading &&<TouchableOpacity style={[tw`p-4 bg-black absolute w-[90%] mx-auto rounded-md ml-5`,{bottom:Dimensions.get('screen').height*0.15}]}>
                    <Text style={tw`text-white text-center font-bold`}>Done</Text>
                </TouchableOpacity>}
            </SafeAreaView>
        </View>
    );
}

export default selectLocation;