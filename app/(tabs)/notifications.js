import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NotificationItem = ({ title, time, para }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationTitle}>{title}</Text>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationPara}>{para}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
  </View>
);

export default function NotificationsPage() {
  const notificationData = []

  //   { title: 'EID FITR 2023', time: '2 hrs ago', para: 'Machine fitter needed. Machine fitter needed.' },
  //   { title: 'EID AZHA 2023', time: '2 hrs ago', para: 'Machine fitter needed. Machine fitter needed.' },
  // ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notificationData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/notificationImage.png')} style={styles.image} />
          <Text style={styles.title}>No Notifications Yet</Text>
          <Text style={styles.subtitle}>You have no notifications right now. Come back later.</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {notificationData.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f1fc',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    width: '100%',
    height: 70,
    lineHeight: 70,
    textAlign: 'center',
    color: '#000',
    position: 'absolute',
    top: 0,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 80, // To account for the header height
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationContent: {
    marginTop: 4,
  },
  notificationPara: {
    color: '#888',
  },
  notificationTime: {
    color: '#888',
    marginTop: 4,
  },
});
