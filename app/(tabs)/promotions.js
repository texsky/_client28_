import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PromotionItem = ({ title, status, time, para }) => {
  const statusColor = {
    Expired: '#E54545',
    Active: '#0F9918',
  };

  return (
    <View style={styles.promotionItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.status,
            {
              color: statusColor[status],
              borderColor: statusColor[status],
            },
          ]}
        >
          {status}
        </Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.description}>{para}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default function PromotionPage() {
//   const promotionData = [];
  // Uncomment for testing:
  const promotionData = [
    // { title: 'EID FITR 2023', status: 'Expired', time: '2 hrs ago', para: 'Machine fitter needed.' },
    // { title: 'EID AZHA 2023', status: 'Active', time: '1 day ago', para: 'Limited time offer available!' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Promotions</Text>
      <View style={styles.body}>
        {promotionData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/promotionImage.png')}
              style={styles.image}
            />
            <Text style={styles.noDataTitle}>No Promotions Yet</Text>
            <Text style={styles.noDataSubtitle}>
              No promotions available at the moment. Come back later.
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {promotionData.map((promo, index) => (
              <PromotionItem key={index} {...promo} />
            ))}
          </View>
        )}
      </View>
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
    backgroundColor: '#fff',
    width: '100%',
    height: 70,
    lineHeight: 70,
    textAlign: 'center',
    color: '#000',
    position: 'absolute',
    top: 0,
  },
  body: {
    flex: 1,
    paddingTop: 80, // To account for header
    paddingHorizontal: 20,
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
  listContainer: {
    width: '100%',
  },
  promotionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    borderRadius: 20,
    borderWidth: 1.5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  itemContent: {
    marginTop: 8,
  },
  description: {
    color: '#555',
    marginBottom: 5,
  },
  time: {
    color: '#888',
  },
});
