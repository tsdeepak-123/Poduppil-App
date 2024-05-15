import React, { useState } from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../services/AuthService';
import { AdminAction } from '../../store/AdminAuth';
import { useDispatch } from 'react-redux';

const Header = () => {
   const dispatch=useDispatch()
   const navigation = useNavigation()

   const handleLogout=async()=>{
      logout()
      dispatch(AdminAction.AdminLogout());
      navigation.navigate('Home')
   }
 return (
    <View style={styles.container}>
        <Image source={require('../../../assets/podu.png')} style={styles.logo} />
        <TouchableOpacity>
        <Ionicons name="log-out-outline" onPress={handleLogout} size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
    </View>
 );
};

export default Header;

const styles = StyleSheet.create({
 container: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Evenly space items horizontally
    marginTop: 30,
    width: '100%', 
    height: 80,
    alignItems: 'center', // Align items vertically
    marginRight: 20
 },

 logo: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
 },

 icon: {
    marginRight: 10 
 },
});
