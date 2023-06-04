import { User } from '../types/User';

export const setUserLocalStorage = (user: User | null) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserLocalStorage = (): User | null => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
