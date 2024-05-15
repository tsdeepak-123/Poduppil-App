// Login.js
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, Dimensions, ToastAndroid } from "react-native";
import { useDispatch } from 'react-redux';
import { login } from '../../services/api';
import { AdminAction } from '../../store/AdminAuth'; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'

const screenWidth = Dimensions.get('window').width;

const Login = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            if (!data.success) {
                showToast(data.message);
            } else {
                await AsyncStorage.setItem('token',data?.adminSignin?.token );
                dispatch(AdminAction.AddAdmin({ token: data?.adminSignin?.token })); 
                navigation.navigate('dashboard');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            showToast(error.message); // Show toast on login error
        }
    };

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/podu.png')} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true} // This makes the password input secure
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} color="green" />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '90%',
    },
    buttonContainer: {
        width: screenWidth * 0.8,
        height: 80,
        borderRadius: 10,
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});
