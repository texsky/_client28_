import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, Modal, StyleSheet, TextInput, Dimensions, Alert, ActivityIndicator } from "react-native";
import { RadixIcon } from "radix-ui-react-native-icons";
import tw from 'twrnc';
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from "axios";
import { BASE } from './api/base';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * A screen to place an order.
 *
 * This screen allows users to select the categories of the order, add the address, add details, and add photos.
 *
 * The selected categories are displayed at the top of the screen.
 *
 * The user can add the address by clicking on the "Add Address" button.
 *
 * The user can add details by clicking on the "Add Details" button.
 *
 * The user can add photos by clicking on the "Add Photos" button.
 *
 * The photos are displayed in a grid below the "Add Photos" button.
 *
 * The user can confirm the order by clicking on the "Confirm Order" button.
 *
 * When the user clicks on the "Confirm Order" button, the app will navigate to the "WorkDone" screen.
 *
 * @return {JSX.Element} A JSX element representing the Placeorder screen.
 */
const Placeorder = () => {

    const [modal, setModal] = useState(false);

    const [images, setImages] = useState([]);

    const [user,setUser] = useState();

    const { data } = useLocalSearchParams();

    const myObject = data ? JSON.parse(decodeURIComponent(data)) : {};

    const [order, setOrder] = useState({
        id: "", uid: "", category: myObject.service, location: "", details: "", latitude: "", longitude: "", pending: true, success: false,
        accepted: false, assigned: false, urls: [], alternate:"",
    });

    const [categories, setCategories] = useState([myObject]);

    const getUser = async () =>{
        const state = await JSON.parse(await AsyncStorage.getItem('user'));
        if(state){
            setUser(state);
        }else{
            router.push('/phone');
        }
    }


    useEffect(()=>{
        getUser();
    },[]);


    /**
     * Toggle the modal state.
     *
     * This function toggles the modal state to show or hide the modal.
     */
    const toggleModal = () => {
        setModal(!modal);
    };


    // const [categoryModal, setCategoryModal] = useState(false);

    // /**
    //  * Toggle the category modal state.
    //  *
    //  * This function toggles the category modal state to show or hide the modal.
    //  */
    // const toggleCategoryModal = () => {
    //     setCategoryModal(!categoryModal);
    // };

    /**
     * Removes a category from the categories list.
     *
     * This function takes a category item as input, finds its index in the categories
     * array, and removes it if it exists. It then updates the state with the new
     * array of categories.
     *
     * @param {Object} item - The category item to be removed from the list.
     */

    // const RemoveCategory = (item) => {
    //     const index = categories.indexOf(item);
    //     if (index > -1) {
    //         categories.splice(index, 1);
    //         setCategories([...categories]);
    //     }
    // }

    /**
     * Saves the selected image URI to the images state.
     *
     * This asynchronous function takes an image URI as a parameter, logs the URI 
     * to the console, and updates the images state by appending the new image 
     * object with the URI and an updated flag. If an error occurs during the 
     * process, it logs the error message to the console.
     *
     * @param {string} imageUri - The URI of the image to be saved.
     */

    /**
     * Saves the selected image URI to the images state.
     *
     * This asynchronous function takes an image URI as a parameter, logs the URI 
     * to the console, and updates the images state by appending the new image 
     * object with the URI and an updated flag. If an error occurs during the 
     * process, it logs the error message to the console.
     *
     * @param {string} imageUri - The URI of the image to be saved.
     */
    const saveImage = async (imageUri) => {
        try {
            console.log("Image saved with URI:", imageUri);
            setImages([...images, { uri: imageUri, updated: true }]);
        } catch (e) {
            console.error("Error saving image:", e);
        }
    };

    /**
     * Prompts the user to select an image from the gallery or take a new photo 
     * using the camera and saves the selected image URI to the images state.
     *
     * This asynchronous function takes a mode parameter, which can be either
     * "Gallery" or "Camera". If the mode is "Gallery", it requests the user's 
     * foreground media library permissions and, if granted, launches the 
     * image library picker. If the mode is "Camera", it requests the user's 
     * foreground camera permissions and, if granted, launches the camera 
     * interface. If the user selects an image, it logs the image URI to the 
     * console and updates the images state by appending the new image object 
     * with the URI and an updated flag. If an error occurs during the process, 
     * it logs the error message to the console.
     *
     * @param {string} mode - The mode of image selection, either "Gallery" or "Camera".
     */
    const UploadImage = async (mode) => {
        try {
            if (images.length < 1) {
                let result;
                if (mode === "Gallery") {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        alert("Permission to access gallery is required!");
                        return;
                    }
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });
                } else {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== "granted") {
                        alert("Permission to use camera is required!");
                        return;
                    }
                    result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });
                }
                if (!result.canceled) {
                    console.log("Image selected:", result.assets[0].uri);
                    await saveImage(result.assets[0].uri);
                }
            } else {
                Alert.alert("Images Limit Reached !");
            }

        } catch (e) {
            alert("Error: " + e);
        }
    };

    const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

    const [loading, setLoading] = useState(false);

    // Handle the drag event and update coordinates
    const onDragEnd = (e) => {
        console.log(e);
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude: latitude, longitude: longitude });
    };


    const [loading2,setLoading2] = useState(false);

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

    const [detailsModal, setDetailsModal] = useState(false);
    const [locationModal, setLocationModal] = useState(false);

    // Function to place the order
    const placeOrder = async () => {

        setLoading2(true);
        //Validate fields
        if (!order.category || !order.details || !location.latitude || !location.longitude) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        if (!images[0]) {
            Alert.alert('Error', 'Please select an image!');
            return;
        }

        // Prepare the OrderClass object
        const orderClass = {
            uid: user.uid, // Replace with actual user ID
            category: order.category,
            location: '', // Add location details if applicable
            details: order.details,
            latitude: location.latitude,
            longitude: location.longitude,
            pending: 1,
            success: 0,
            assigned: 0,
            accepted: 0,
            alternate:"",
            url: '', // Ensure this matches backend expectations 
        }
        // Compress the image
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            images[0].uri, // URI of the image
            [{ resize: { width: 800 } }], // Resize to width of 800px
            { compress: 0.25, format: ImageManipulator.SaveFormat.JPEG } // Compress to 50% quality in JPEG format
        );

        // Convert compressed image into a valid file for FormData
        const compressedFile = {
            uri: manipulatedImage.uri,
            type: "image/jpeg",
            name: "compressed_image.jpg",
        };
        
        // Create FormData
        const formData = new FormData();
        formData.append('orderClass', JSON.stringify(orderClass)); // Add OrderClass as JSON string
        formData.append('photos', compressedFile);

        try {
            // Send the POST request
            const response = await axios.post(`${BASE}/Api/v1/place/order`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Order placed successfully!');
                setLoading2(false);
            } else {
                Alert.alert('Error', 'Failed to place order. Please try again.');
                setLoading2(false);
            }
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to place order. Please try again.');
            setLoading2(false);
        }
    };


    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View>
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContent}>
                            <View style={tw`flex flex-row items-center justify-center`}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <RadixIcon name="minus" size={25} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={tw`flex flex-col gap-4`}>
                                <TouchableOpacity onPress={() => UploadImage("Gallery")}>
                                    <View style={tw`flex flex-row items-center justify-start gap-4 px-3`}>
                                        <RadixIcon name="image" size={25} color="black" />
                                        <Text>Upload from Gallery</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => UploadImage("Camera")}>
                                    <View style={tw`flex flex-row items-center justify-start gap-4 px-3`}>
                                        <RadixIcon name="camera" size={25} color="black" />
                                        <Text>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* <Modal transparent={true} visible={categoryModal} onRequestClose={toggleCategoryModal}>
                    <View style={styles.overlay}>
                        <View style={styles.modalContent}>
                            <View style={tw`flex flex-row items-center justify-center`}>
                                <TouchableOpacity onPress={toggleCategoryModal}>
                                    <RadixIcon name="minus" size={25} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text>Select Categories</Text>
                                <View>
                                    <SimpleGrid
                                        itemDimension={130}
                                        data={[{
                                            id: 1,
                                            name: "Cleaning",
                                            img: require('../assets/home/1.png')
                                        }, {
                                            id: 2,
                                            name: "Repairing",
                                            img: require('../assets/home/2.png')
                                        }, {
                                            id: 3,
                                            name: "Plumbing",
                                            img: require('../assets/home/3.png')
                                        }, {
                                            id: 4,
                                            name: "Electrician",
                                            img: require('../assets/home/4.png')
                                        }, {
                                            id: 5,
                                            name: "Painting",
                                            img: require('../assets/home/5.png')
                                        }, {
                                            id: 6,
                                            name: "Carpentry",
                                            img: require('../assets/home/6.png')
                                        }, {
                                            id: 7,
                                            name: "Gardening",
                                            img: require('../assets/home/7.png')
                                        }, {
                                            id: 8,
                                            name: "Cooking",
                                            img: require('../assets/home/8.png')
                                        }]}
                                        renderItem={({ item }) => (<TouchableOpacity onPress={() => { setCategories([...categories, item]) }}>
                                            <View style={tw`flex flex-col items-center justify-center p-4 rounded-md bg-white gap-4`}>
                                                <Image source={item.img} key={item.id} style={tw`w-10 h-10`} />
                                                <Text style={tw`text-xs text-center font-bold`}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>)}
                                    />
                                </View>
                            </View>                   
                        </View>n
                    </View>
                </Modal> */}
                <Modal visible={detailsModal} transparent={true} animationType="slide">
                    <View style={styles.overlay}>
                        <View style={styles.modalContent}>
                            <View style={tw`flex flex-row items-center justify-center`}>
                                <TouchableOpacity onPress={() => setDetailsModal(false)}>
                                    <RadixIcon name="minus" size={25} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View>
                                    <View style={tw`p-5`}>
                                        <Text>Add Details</Text>
                                        <TextInput style={tw`w-full h-60 font-bold border border-gray-300 rounded-lg px-3 text-lg bg-white mt-5`} multiline={true} numberOfLines={4} onChangeText={e => setOrder({ ...order, details: e })} />
                                        <TouchableOpacity style={tw`mt-4 w-full bg-black p-3 rounded-md`} onPress={() => setDetailsModal(false)}>
                                            <Text style={tw`text-white text-center`}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal visible={locationModal} transparent={true} animationType="slide">
                    <View style={styles.overlay}>
                        <View style={{ width: "100%" }}>
                            <View>
                                <View>
                                    <View>
                                        {!loading ? <MapView style={tw`w-full h-full`} region={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                            <Marker draggable coordinate={location} onDragEnd={onDragEnd}>
                                                <Text style={tw`text-4xl`}>📍</Text>
                                            </Marker>
                                        </MapView> : <Text style={tw`p-5`}>Loading...</Text>}
                                        {!loading && <TouchableOpacity style={[tw`p-4 bg-black absolute w-[90%] mx-auto rounded-md ml-5`, { bottom: Dimensions.get('screen').height * 0.15 }]}>
                                            <Text style={tw`text-white text-center font-bold`} onPress={() => setLocationModal(false)}>Done</Text>
                                        </TouchableOpacity>}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={tw`flex flex-row items-center p-2 gap-4 pb-5`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <RadixIcon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={tw`font-bold text-xl`}>Place order</Text>
                </View>
                <View style={tw`p-3`}>
                    <Text style={tw`text-lg font-bold`}>Category</Text>
                    <View style={tw`mt-3 flex flex-row gap-4 flex-wrap`}>
                        {
                            categories.length > 0 ? categories.map((item, index) => (
                                <View style={tw`w-30 flex flex-col items-center justify-center p-4 rounded-md bg-white gap-4`} key={index}>
                                    {/* <TouchableOpacity style={tw`absolute top-1 right-1`} onPress={() => RemoveCategory(item)}>
                                        <RadixIcon name="cross-2" size={25} color="grey" />
                                    </TouchableOpacity> */}
                                    <Image source={{ uri: item.image }} style={tw`w-10 h-10`} />
                                    <Text style={tw`text-xs text-center font-bold`}>{item.service}</Text>
                                </View>
                            )) : <React.Fragment></React.Fragment>
                        }
                    </View>
                    <View style={tw`mt-5 flex flex-col gap-4`}>
                        <TouchableOpacity onPress={() => setLocationModal(true)}>
                            <View style={tw`bg-[#F4F5FD] p-4 gap-4 flex flex-row items-center rounded-md`}>
                                <RadixIcon name="sewing-pin" size={24} color="black" />
                                <Text>Add Address</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDetailsModal(true)}>
                            <View style={tw`bg-[#F4F5FD] p-4 gap-4 flex flex-row items-center rounded-md`}>
                                <RadixIcon name="clipboard" size={24} color="black" />
                                <Text>Add Details</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModal(true)}>
                            <View style={tw`bg-[#F4F5FD] gap-4 p-4 flex flex-row items-center rounded-md`}>
                                <RadixIcon name="camera" size={24} color="black" />
                                <Text>Add Photos</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={tw`flex flex-row gap-4 flex-wrap`}>
                            {
                                images.length > 0 && images.map((item, index) => (
                                    <Image source={item} key={index} style={tw`w-24 h-24`} />
                                ))
                            }
                        </View>
                        {!loading2 ? <TouchableOpacity style={tw`p-4 bg-black rounded-md`} onPress={placeOrder}>
                            <Text style={tw`text-white text-center`}>Confirm Order</Text>
                        </TouchableOpacity> : <ActivityIndicator/>}
                    </View>
                </View>
            </SafeAreaView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#1e88e5',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default Placeorder;