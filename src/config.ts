export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const config = {
  apiBaseUrl: API_BASE_URL,
  tokenKey: 'vet_system_token',
  userKey: 'vet_system_user',
} as const;
