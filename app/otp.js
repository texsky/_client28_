import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";
import tw from "twrnc";

/**
 * OTP - One Time Password verification screen
 *
 * This screen takes an OTP as input and verifies it. On successful verification, it shows a success message and navigates to the Home screen.
 *
 * @returns {JSX.Element} OTP verification screen
 */
const OTP = () => {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleVerify = () => {
        // Add logic to verify OTP if needed
        setModalVisible(true); // Show the popup/modal
    };

    return (
        <View style={tw`flex flex-col justify-center gap-5 items-center bg-white h-full`}>
            <View style={tw`flex flex-col justify-center items-center px-5`}>
                <Image
                    source={require("../assets/otp.png")}
                    style={tw`w-20 h-20 mb-5`}
                />
                <Text style={tw`text-2xl font-bold text-gray-800`}>
                    Enter the Code to Continue
                </Text>
                <Text style={tw`text-s text-gray-500 mt-4 mb-2`}>
                    A verification code has been sent
                </Text>
                <Text style={tw`text-s text-gray-500 mt-0.5 mb-2`}>
                    to +91 9963512598 via SMS.
                </Text>
            </View>

            {/* OTP Input */}
            <TextInput
                style={tw`h-12 border border-gray-300 rounded-lg px-3 text-lg bg-white mb-6 w-96`}
                placeholder="Enter Code here"
                keyboardType="numeric"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
            />

            <TouchableOpacity
                style={tw`w-92 h-12 bg-[#282828] justify-center items-center rounded-lg mb-5`}
                onPress={handleVerify}
            >
                <Text style={tw`text-white text-lg font-bold`}>Verify</Text>
            </TouchableOpacity>

            <Text style={tw`text-[#ABD10E] font-bold`}>Resend Code</Text>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)} // For Android back button
            >
                <View
                    style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}
                >
                    <View
                        style={tw`w-[95%] bg-white rounded-xl p-5 justify-center items-center mb-5`}
                    >
                        {/* Check Icon */}
                        <View
                            style={tw`w-16 h-16 rounded-full bg-green-500 justify-center items-center mb-4`}
                        >
                            <Image
                                source={require("../assets/check.png")} // Replace with your checkmark image
                                style={tw`w-8 h-8`}
                            />
                        </View>

                        {/* Success Message */}
                        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>
                            Verification Successful
                        </Text>

                        {/* Go to Home Button */}
                        <TouchableOpacity
                            style={tw`w-full h-12 bg-[#282828] justify-center items-center rounded-lg mt-4`}
                            onPress={() => {
                                console.log("otp")
                                setModalVisible(false); // Close the modal
                                router.push("home"); // Navigate to Home screen
                            }}
                        >
                            <Text style={tw`text-white text-lg font-bold`}>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OTP;
