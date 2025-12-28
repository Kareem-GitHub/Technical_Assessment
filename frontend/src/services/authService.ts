import api from '../api/api';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<void> => {
    await api.post('/auth/register', data);
  }
};