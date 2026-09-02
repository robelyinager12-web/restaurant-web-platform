// File: frontend/src/lib/auth.ts
import { apiClient } from './api-client';
import type { User } from '../types/user';

interface AuthResponse {
  user: User;
  token: string;
}

export function registerRequest(data: { name: string; email: string; password: string; phone?: string }) {
  return apiClient.post<AuthResponse>('/auth/register', data);
}

export function loginRequest(data: { email: string; password: string }) {
  return apiClient.post<AuthResponse>('/auth/login', data);
}

export function meRequest() {
  return apiClient.get<{ user: User }>('/auth/me');
}