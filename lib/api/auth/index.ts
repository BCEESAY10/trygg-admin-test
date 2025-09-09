import axios from 'axios';
import Cookies from 'js-cookie';
import { setCookie } from 'nookies';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type {
  AuthResponse,
  ChangePasswordInputs,
  LoginCredentials,
  RegisterInputs,
} from '@/types/auth';
import { handleAxiosError } from '@/utils/error';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Login Response ', response.data);

  Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.data.accessToken, {
    secure: true,
    sameSite: 'strict',
  });

  const cookieOptions = {
    maxAge: 60 * 60,
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'strict' as const,
  };

  setCookie(
    null,
    STORAGE_KEYS.ACCESS_TOKEN,
    response.data.data.accessToken,
    cookieOptions
  );

  return response.data.data;
};

const register = async (inputs: RegisterInputs): Promise<AuthResponse> => {
  const response = await apiClient.post('/register', inputs);

  return response.data.data;
};

const changePassword = async (inputs: ChangePasswordInputs): Promise<any> => {
  const response = await apiClient.post('/change-password', inputs);

  return response.data.data;
};

const logout = async (): Promise<void> => {
  try {
    const response = await apiClient.post(`${BASE_URL}/admin/logout`);

    console.log('Logout Response ', response.data);
  } catch (error) {
    const { message, status } = handleAxiosError(error);
    console.warn(`Logout API call failed: ${message} (${status})`);
  }
};
export const authApi = {
  login,
  register,
  changePassword,
  logout,
};
