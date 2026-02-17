import { apiClient } from './api';
import { config } from '../config';
import type { User, CreateUserDto, LoginDto, LoginResponse } from '../types/User';

export const authService = {
  async register(data: CreateUserDto): Promise<User> {
    const user = await apiClient.post<User>('/users', data, false);
    return user;
  },

  async login(data: LoginDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/login', data, false);
    
    localStorage.setItem(config.tokenKey, response.token);
    localStorage.setItem(config.userKey, JSON.stringify(response.user));
    
    return response;
  },

  logout(): void {
    localStorage.removeItem(config.tokenKey);
    localStorage.removeItem(config.userKey);
    window.location.href = '/login';
  },

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(config.userKey);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem(config.tokenKey);
    const user = this.getCurrentUser();
    return !!token && !!user;
  },

  getToken(): string | null {
    return localStorage.getItem(config.tokenKey);
  },
};
