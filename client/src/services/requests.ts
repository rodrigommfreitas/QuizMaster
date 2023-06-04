import { AuthData } from '../types/Context';
import { User } from '../types/User';
import api from './api';

// **** Functions **** //

// Auth

export const authenticate = async (credentials: AuthData) => {
  try {
    const res = await api.post<User>('/auth/login', credentials);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const register = async (credentials: AuthData) => {
  try {
    const res = await api.post('/auth/register', credentials);
    return res.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Users

export const fetchUser = async (id: string) => {
  try {
    const res = await api.get<User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
};

export const fetchLeaderboard = async (amount: number) => {
  try {
    const res = await api.get<User[]>(`/users/leaderboard/${amount}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch leaderboard.');
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    const res = await api.patch<User>(`/users/${id}`, data);
    return res.status;
  } catch (error) {
    throw new Error('Failed to update user.');
  }
};
