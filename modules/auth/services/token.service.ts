import AsyncStorage from '@react-native-async-storage/async-storage';

// Jwt.
import { jwtDecode } from 'jwt-decode';

interface Token {
    id: number,
    exp: number,
}

export const decodeToken = async (): Promise<Token | null> => {
  const token = await getAuthKey();
  if (!token) return null;

  return jwtDecode<Token>(token);
};

export const getAuthKey = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('authKey');
};

export const setAuthKey = async (value: string): Promise<void> => {
  await AsyncStorage.setItem('authKey', value);
};

export const removeAuthKey = async (): Promise<void> => {
  await AsyncStorage.removeItem('authKey');
};

export const isValidToken = async (): Promise<boolean> => {
  const token = await getAuthKey();
  if (!token) return false;

  const decoded = jwtDecode<Token>(token);
  const currentTime: number = Date.now() / 1000;

  return decoded.exp > currentTime;
};
