import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import tw from "twrnc";
import { BASE } from '../api/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';



/**
 * A single order item in the orders list.
 * @param {Object} props Component props
 * @param {string} props.title The title of the order
 * @param {string} props.status The status of the order
 * @param {string} props.time The time the order was created
 * @param {string} props.para The description of the order
 * @returns {React.ReactElement} A single order item
 */
const OrderItem = ({ name, category, pending, success,assigned,accepted, details, orderDate }) => {

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
                <Text style={[styles.status,{borderColor: statusColor[pending === 1.0 ? "Pending" : "Completed"],borderWidth:1,padding:5,borderRadius:10}]}>{pending === 1.0 ? "Pending" : "Completed"}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.time}>{details}</Text>
                <Text style={styles.time}>{orderDate}</Text>
            </View>
        </View>
    );
};

/**
 * The OrdersPage component renders a list of orders.
 *
 * The component displays two tabs (Pending and Completed) and renders a list of orders based on the selected tab.
 *
 * @returns {React.ReactElement} The rendered OrdersPage component.
 */
export default function OrdersPage() {

    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const [user,setUser] = useState();


    const [Dialog,setDialog] = useState(false);

    /**
     * Fetches the orders from the server and updates the orders state.
     *
     * This function first checks if the user is logged in by checking for the presence of the 'user' key in AsyncStorage.
     * If the user is logged in, it makes a GET request to the server to fetch the orders for the user and updates the orders state.
     * If the user is not logged in, it navigates to the '/phone' route.
     *
     * @returns {Promise<void>} A promise that resolves when the orders state has been updated.
     */
    const fetchOrders = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            if(user){
                setUser(user);
                const response = await fetch(`${BASE}/Api/v1/orders/${user.uid}`);
                const data = await response.json();
                console.log(data);
                setOrders(data);
                console.log(data);
            }else{
                router.push('/phone');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[isPendingTabSelected]);

    const [isPendingTabSelected, setIsPendingTabSelected] = useState(true);

    const pendingOrders = [
        { title: 'Plumber needed for plumbing...', status: 'Pending', time: '2 hrs ago', para: 'Machine fitter needed. Machine fitter needed. ' },
        { title: 'Machine fitter needed. Machine fitter needed...', status: 'Assigned', time: '2 hrs ago', para: 'Machine fitter needed. Machine fitter needed. ' },
    ];

    const historyOrders = []

    const [selectedOrder,setSelectedOrder] = useState([]);
    // [
    //   { title: 'Machine fitter needed. Machine fitter needed...', status: 'Confirmed', time: '2 hrs ago',  para:'Machine fitter needed. Machine fitter needed. ' },
    //   { title: 'Plumber needed for plumbing...', status: 'Cancelled', time: '2 hrs ago', para:'Machine fitter needed. Machine fitter needed. ' },
    //   { title: 'Plumber needed for plumbing...', status: 'Completed', time: '2 hrs ago', para:'Machine fitter needed. Machine fitter needed. ' },
    // ];

    /**
     * Handles the tab press event.
     *
     * This function takes a single argument (tabName) which is the name of the tab that was pressed.
     * It updates the isPendingTabSelected state variable to true if the Pending tab was pressed,
     * and false otherwise.
     *
     * @param {string} tabName - The name of the tab that was pressed.
     */
    const handleTabPress = (tabName) => {
        setIsPendingTabSelected(tabName === 'Pending');
    };

    return (
        <View style={styles.container}>
            <Modal visible={Dialog} transparent animationType='slide'>
                <View style={tw`w-full h-full`}>
                    <View style={tw`w-[80%] h-[50%] bg-white mx-auto my-auto`}>
                        <View style={tw`flex flex-row items-center justify-end p-2`}>
                            <TouchableOpacity onPress={()=>{
                                setDialog(false);
                            }}>
                                <AntDesign name="close" size={20} color="black" style={tw`font-bold`}/>
                            </TouchableOpacity>
                        </View>
                        <View style={tw`mt-3`}>
                            <Text style={tw`text-center text-2xl font-bold`}>Order Details</Text>
                            <View style={tw`flex flex-row items-center justify-between`}>
                                <View style={tw`flex flex-col items-start justify-start p-3 gap-4`}>
                                    <Text style={tw`font-bold`}>Order Id : <Text style={tw`font-normal`}>{selectedOrder.id && selectedOrder.id}</Text></Text>
                                    <Text style={tw`font-bold`}>Category :  <Text style={tw`font-normal`}>{selectedOrder.category && selectedOrder.category}</Text></Text>
                                    <Text style={tw`font-bold`}>Location : <Text style={tw`font-normal`}>{selectedOrder.location && selectedOrder.location}</Text></Text>
                                </View>
                            </View>
                            <View style={tw``}>
                                <Text style={tw`font-bold text-center text-2xl`}>OTP</Text>
                                <View style={tw`w-[70%] border mx-auto border-gray-300 mt-2 p-4`}>
                                    <Text style={tw`text-3xl font-bold text-center`}>{selectedOrder.otp && selectedOrder.otp}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.header}>Orders</Text>
            {/* <Ionicons name="cart-outline" size={64} color="#007AFF" /> */}
            {(pendingOrders.length == 0) && (historyOrders.length == 0) ? <View style={styles.emptyContainer}>
                <Image
                    source={require('../../assets/ordersImage.png')}
                    style={styles.image}
                />
                <Text style={styles.noDataTitle}>No Orders Yet</Text>
                <Text style={styles.noDataSubtitle}>
                    You have no active order right now.
                </Text>
            </View>
                :
                <View style={styles.headerBelow}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            onPress={() => handleTabPress('Pending')}
                            style={[styles.tab, isPendingTabSelected && styles.activeTab]}
                        >
                            <Text style={[isPendingTabSelected && styles.tabText]}>Pending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleTabPress('Completed')}
                            style={[styles.tab, !isPendingTabSelected && styles.activeTab]}
                        >
                            <Text style={[!isPendingTabSelected && styles.tabText]}>Completed</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orderList}>
                        {isPendingTabSelected ? (
                            (orders.length === 0) ? <View style={styles.emptyContainer}>
                                <Image
                                    source={require('../../assets/ordersImage.png')}
                                    style={styles.image}
                                />
                                <Text style={styles.noDataTitle}>No Orders Yet</Text>
                                <Text style={styles.noDataSubtitle}>
                                    You have no orders right now.
                                </Text>
                            </View> :
                                !loading && orders.map((order, index) => (
                                    order.pending === 1.0 && <TouchableOpacity onPress={()=>{
                                        setSelectedOrder(order);
                                        setDialog(true);
                                    }}>
                                        <OrderItem key={index} {...order}/>
                                    </TouchableOpacity>
                                ))
                        ) : (
                            (orders.length === 0) ? <View style={styles.emptyContainer}>
                                <Image
                                    source={require('../../assets/ordersImage.png')}
                                    style={styles.image}
                                />
                                <Text style={styles.noDataTitle}>No Orders Yet</Text>
                                <Text style={styles.noDataSubtitle}>
                                    You have no orders right now.
                                </Text>
                            </View> :
                                historyOrders.map((order, index) => (
                                    !loading && orders.map((order, index) => (
                                        order.completed === 1.0 && <OrderItem key={index} {...order} />
                                    ))
                                ))
                        )}
                    </View>
                </View>}
        </View>

    );
}

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
});

