import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://aapsuj.accevate.co/flutter-api';

export const saveToken = async (token) => {
  await AsyncStorage.setItem('user_token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('user_token');
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('user_token');
};

export const login = async (userid, password) => {
  try {
    console.log('Login attempt for userid:', userid , 'with password:', password) ;
    const response = await axios.post(
      `${BASE_URL}/login.php`,
      { userid, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Login response:', response.data);
    if (response.data.status === true) {
      return { success: true, userid: response.data.userid };
    }
    return { success: false, message: response.data.message || 'Invalid credentials' };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Network error. Please try again.' 
    };
  }
};

export const verifyOtp = async (userid, otp) => {
  try {
    console.log('Verifying OTP for userid:', userid , 'with otp:', otp) ;
    const response = await axios.post(
      `${BASE_URL}/verify_otp.php`,
      { userid, otp },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('OTP verification response:', response.data);
    if (response.data.status === true && response.data.token) {
      await saveToken(response.data.token);
      
      return { success: true, token: response.data.token };
    }
    return { success: false, message: response.data.message || 'Invalid OTP' };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Verification failed' 
    };
  }
};

export const getDashboardData = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    const response = await axios.post(
      `${BASE_URL}/dashboard.php`,
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (response.data.status === true) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data.message || 'Failed to load dashboard' };
  } catch (error) {
    if (error.response?.status === 401) {
      await clearToken();
      return { success: false, message: 'Session expired. Please login again' };
    }
    return { 
      success: false, 
      message: error.response?.data?.message || 'Network error' 
    };
  }
};