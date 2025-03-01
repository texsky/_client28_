import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Alert, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc'
import { BASE } from './api/base';
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseConfig from './firebase/firebase';
import { initializeApp } from 'firebase/app';
import { router } from 'expo-router';
import { Checkbox } from 'react-native-paper';

const app = initializeApp(firebaseConfig);

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [is_worker, setis_worker] = useState(false);


    const [loading, setLoading] = useState(false);

    // Function to handle submit
    const handleSubmit = async () => {

        if (!name || !email || !contact || !gender) {
            Alert.alert('Error', 'All fields except the image are required!');
            return;
        }

        setLoading(true);

        const profileData = {
            uid: "",
            name,
            email,
            contact,
            gender,
            is_worker,
            // Set image_url to an empty string if no image is selected
        };

        try {

            const auth = getAuth(app);

            const user = await createUserWithEmailAndPassword(auth, email, password);

            const formData = new FormData();

            formData.append('ProfileClass', JSON.stringify({ ...profileData, uid: user.user.uid }));

            // Send the POST request
            // const response = await axios.post(`${BASE}/Api/v1/save/profile`, formData);

            const res = await fetch(`${BASE}/Api/v1/save/profile`, {
                method: 'POST',
                body:formData
                },
            );

            const response = await res.json();
            
            if (response.status === "success") {
                Alert.alert('Success', 'Profile saved successfully!',);
                router.push("phone");
                setLoading(false);
            } else {
                Alert.alert('Error', 'Failed to save profile. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error saving profile:', error.response?.data || error.message);
            Alert.alert(`Error`, `Failed to save profile. ${error.message}.`);
            setLoading(false);
        }

    };


    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={tw`flex flex-col items-center justify-center mb-4`}>
                    <Image
                        source={require("./../assets/phone.png")}
                        style={tw`w-20 h-20 mb-5`}
                    />
                    <Text style={tw`text-2xl font-bold text-gray-800`}>
                        Signup
                    </Text>
                </View>
                {/* <Button title="Pick Profile Image (Optional)" onPress={pickImage} /> */}
                {/* {image && <Image source={{ uri: image }} style={styles.profileImage} />} */}
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contact"
                    value={contact}
                    onChangeText={setContact}
                    keyboardType="phone-pad"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Gender"
                    value={gender}
                    onChangeText={setGender}
                    style={styles.input}
                />
                <View style={tw`flex flex-row items-center gap-3 `}>
                    <Checkbox onPress={e => {
                        setis_worker(!is_worker);
                    }} status={is_worker ? "checked" : "unchecked"} label="Register as a is_worker" />
                    <TouchableOpacity onPress={() => setis_worker(!is_worker)}>
                        <Text style={tw`text-black`}>Register as a worker</Text>
                    </TouchableOpacity>
                </View>
                {!loading ? <TouchableOpacity style={tw`w-full p-3 bg-black rounded-md mt-3`} onPress={handleSubmit}>
                    <Text style={tw`text-white text-center`}>Sign up</Text>
                </TouchableOpacity> : <ActivityIndicator />}
                <Text style={tw`text-black text-xs mt-5 font-bold`}>OR</Text>
                <TouchableOpacity
                    style={tw`w-[95%] mt-2 h-12 justify-center items-center rounded-lg`}
                    onPress={() => router.push("phone")} // Moved onPress here
                >
                    <Text style={tw`text-black text-lg font-bold`}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: "100%",
        display: "flex",
        justifyContent: "center"
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        marginVertical: 10,
        width: '100%',
        borderRadius: 5,
    },
});

export default ProfileScreen;