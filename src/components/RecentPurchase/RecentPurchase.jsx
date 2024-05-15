// RecentPurchase.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRecentPurchase } from '../../services/api';
import moment from 'moment';

const RecentPurchase = ({ refreshTrigger }) => {
  const [recentPurchases, setRecentPurchases] = useState([]);

  const fetchRecentPurchases = async () => {
    try {
      const data = await getRecentPurchase();
      setRecentPurchases(data);
    } catch (error) {
      console.error('Error fetching recent purchases:', error);
    }
  };

  useEffect(() => {
    fetchRecentPurchases();
  }, [refreshTrigger]);

  return (
    <View style={styles.container}>
      {recentPurchases?.map((purchase, index) => (
        <View key={index} style={styles.purchaseContainer}>
          <Text style={styles.projectName}>{purchase.projectname}</Text>
          <Text style={styles.purchaseTitle}>{moment(purchase.date).format('DD-MM-YYYY')}</Text>
          {purchase.Material.map((material, materialIndex) => (
            <View key={`${index}-${materialIndex}`} style={styles.materialContainer}>
              <Text style={styles.materialName}>Material: {material.name}</Text>
              <Text style={styles.materialCareof}>Careof: {material.careof}</Text>
              <Text style={styles.materialQuantity}>Quantity: {material.quantity}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RecentPurchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  purchaseContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  purchaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#008DDA'
  },
  materialContainer: {
    marginBottom: 10,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialCareof: {
    fontSize: 14,
    color: '#666',
  },
  materialQuantity: {
    fontSize: 14,
    color: '#666',
  },
});
