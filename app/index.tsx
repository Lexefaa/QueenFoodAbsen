import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Redirect to login if the token is missing
          router.replace('/HomePage');
        }
      } catch (error) {
        console.error('Login First');
      }
    };

    checkAuth();
  }, []);
  const handleLogin = async () => {
  try {
    const response = await axios.post('https://039e-27-131-1-4.ngrok-free.app/login',{
      username,password
    });
    if(response.data.success){
            await AsyncStorage.setItem('authToken', response.data.token);

      Alert.alert('Login Success', response.data.message);
      router.push('/HomePage');
    } else {
      Alert.alert('Login Failed', response.data.message);
    }

  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while logging in');
  }

    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  }
  return (
    <View className='flex justify-center flex-col px-10 h-[100vh]'>
      <Text className='mb-6 text-xl font-extrabold text-black'>Queen Food's Sales App</Text>
      <View style={styles.formContainer} className="w-full max-w-md px-5 py-10 bg-white">
        <View className="flex gap-4">
          
        <Text className='text-lg font-extrabold'>Login!</Text>

        <View className=''>
          <View className='flex flex-col gap-4'>

            <View>
              <Text className='font-extrabold'>Username</Text>
              <TextInput
              editable
              className='border-[0.5px] border-gray-300 px-2'
              maxLength={40}
              onChangeText={(username) => setUsername(username)} 
              value={username}
            />
            </View>
            <View>
              <Text className='font-extrabold'>Password</Text>
              <TextInput
              editable
              className='border-[0.5px] border-gray-300 px-2'
              maxLength={40}
              onChangeText={(password) => setPassword(password)} 
              secureTextEntry
              value={password}
            />
            </View>
            <TouchableOpacity onPress={handleLogin} className="bg-[#159847] py-2 px-2">
              <Text className="text-sm font-bold text-center text-white">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  formContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20, // For Android shadow
  },
});
export default Login