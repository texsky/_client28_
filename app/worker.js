import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';

/**
 * Renders a single order item with its details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the order.
 * @param {string} props.category - The category of the order.
 * @param {boolean} props.pending - Whether the order is pending.
 * @param {boolean} props.success - Whether the order is successful.
 * @param {boolean} props.assigned - Whether the order is assigned.
 * @param {boolean} props.accepted - Whether the order is accepted.
 * @param {string} props.details - The details of the order.
 * @param {string} props.orderDate - The date of the order.
 * @returns {React.ReactElement} The rendered order item.
 */
const OrderItem = ({ name, category, pending, success, assigned, accepted, details, orderDate }) => {

    const statusColor = {
        Pending: '#FF9900',
        Confirmed: '#228B22',
        Assigned: '#00BFFF',
        Accepted: '#4B0082',
        Cancelled: '#E54545',
        Completed: '#228B22'
    };

    return (
        <View style={styles.orderItem}>
            <View style={styles.statusContainer}>
                <Text style={[styles.orderTitle, tw`text-ellipsis w-[70%]`]}>{category}</Text>
                <Text style={[styles.status, { borderColor: statusColor[pending === 1.0 ? "Pending" : "Completed"], borderWidth: 1, padding: 5, borderRadius: 10 }]}>{pending === 1.0 ? "Pending" : "Completed"}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.time}>{details}</Text>
                <Text style={styles.time}>{orderDate}</Text>
            </View>
        </View>
    );
};


/**
 * Worker component for managing and displaying orders.
 *
 * This component allows users to view and interact with pending and completed orders.
 * It includes functionality to select tabs for "pending" and "completed" orders, display
 * order details in a modal, and verify the order completion through an OTP prompt.
 * 
 * State Variables:
 * - selectedTab: Tracks the currently selected tab ("pending" or "completed").
 * - visible: Controls the visibility of the order details modal.
 * - selectedOrder: Stores the order currently selected for viewing details.
 *
 * Functions:
 * - CompleteOrder: Prompts the user to enter an OTP for order verification.
 *
 * @returns {JSX.Element} The rendered Worker component.
 */
const Worker = () => {

    const [selectedTab, setSelectedTab] = useState("pending");

    const [visible, setVisible] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState({});

    const pendingOrders = [
        { category: 'Plumber needed for plumbing...', pending: 1.0, time: '2 hrs ago', details: 'Machine fitter needed. Machine fitter needed. ', orderDate: '25-10-24' },
        { category: 'Machine fitter needed. Machine fitter needed...', status: 'Assigned', time: '2 hrs ago', details: 'Machine fitter needed. Machine fitter needed. ', orderDate: '25-10-25', completed: 1.0 },
    ];


    const CompleteOrder = () =>{
        Alert.prompt("Enter OTP","Enter the Order OTP",[{text:"Verify",style:"default",onPress:(otp)=>{
            if(otp === selectedOrder.otp){

            }else{
                Alert.alert("OTP Verification Failed !")
            }
        }}]);
    }

    return (
        <View>
            <SafeAreaView style={tw`h-full`}>
                <SafeAreaView>
                    <Modal visible={visible} transparent={true} animationType="slide">
                        <View style={styles.overlay}>
                            <View style={styles.modalContent}>
                                <View style={tw`flex flex-col h-full justify-end`}>
                                    <View style={tw`w-full h-full`}>
                                        <View style={tw`p-5`}>
                                            <Text style={tw`font-bold text-xl mt-10`}>Order Details</Text>
                                            <View style={tw`flex flex-col gap-4 mt-5`}>
                                                <Text style={tw`font-bold`}>Order ID : <Text>1234</Text></Text>
                                                <Text style={tw`font-bold`}>Category : <Text style={tw`font-normal`}>{selectedOrder.category}</Text></Text>
                                                <Text style={tw`font-bold`}>Contact : <Text style={tw`font-normal`}>{selectedOrder.contact}</Text></Text>
                                                <Text style={tw`font-bold`}>Order Date : <Text style={tw`font-normal`}>{selectedOrder.orderDate}</Text></Text>
                                                <Text style={tw`font-bold`}>Order Details : <Text style={tw`font-normal`}>{selectedOrder.details}</Text></Text>
                                            </View>
                                        </View>
                                        <View>
                                            <MapView style={tw`w-full h-[65%] mt-3`} region={{ latitude: selectedOrder.latitude, longitude: selectedOrder.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                                <Marker coordinate={{ latitude: selectedOrder.latitude, longitude: selectedOrder.longitude }}>
                                                    <Text style={tw`text-4xl`}>📍</Text>
                                                </Marker>
                                            </MapView>
                                            <TouchableOpacity style={tw`w-[100%] p-3 bg-black self-center rounded-lg mt-5`} onPress={() => CompleteOrder()}>
                                                <Text style={tw`text-center text-white`}>Completed</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={tw`w-[100%] p-3 self-center rounded-lg mt-2`} onPress={() => {
                                                setVisible(false);
                                            }}>
                                                <Text style={tw`text-center text-black`}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
                <View style={tw`flex flex-row  w-full items-center justify-evenly`}>
                    <TouchableOpacity onPress={e => {
                        setSelectedTab("pending");
                    }} style={tw`w-[40%]`}>
                        <Text style={tw`font-bold text-xl ${selectedTab === "pending" ? "border-b-2 border-blue-400 text-blue-600 text-blue-600" : "border-b-2 border-gray-400"} text-center`}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e => {
                        setSelectedTab("completed");
                    }} style={tw`w-[40%]`}>
                        <Text style={tw`font-bold text-xl ${selectedTab === "completed" ? "border-b-2 border-blue-400 text-blue-600" : "border-b-2 border-gray-400 text-gray-500"} text-center`}>Completed</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`mt-4`}>
                    {
                        selectedTab === "pending" && pendingOrders.map(itm => {
                            if (itm.pending === 1.0)
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setSelectedOrder(itm);
                                        console.log(itm);
                                        setVisible(true);
                                    }}>
                                        <OrderItem {...itm} />
                                    </TouchableOpacity>
                                );
                        })
                    }
                    {
                        selectedTab === "completed" && pendingOrders.map(itm => {
                            if (itm.completed === 1.0)
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setSelectedOrder(itm);
                                        console.log(itm);
                                        setVisible(true);
                                    }}>
                                        <OrderItem {...itm} />
                                    </TouchableOpacity>
                                );
                        })
                    }
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f1fc',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        backgroundColor: 'white',
        width: '100%',
        height: 70,
        lineHeight: 70,
        textAlign: 'center',
        color: '#000',
    },
    headerBelow: {
        flex: 1,
        marginTop: 70,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    noDataTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    noDataSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        paddingBottom: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        // active tab styling
    },
    tabText: {
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderColor: 'black',
        paddingBottom: 10,
    },
    orderList: {
        flex: 1,
        padding: 10,
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    status: {
        fontWeight: 'bold',
    },
    time: {
        marginTop: 4,
        color: '#888',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
    },
    bottomNavItemText: {
        fontSize: 12,
    },
    overlay: {
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: "100%"
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        height: "100%"
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});


export default Worker;