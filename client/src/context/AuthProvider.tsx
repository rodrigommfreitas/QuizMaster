import { createContext, useEffect, useState } from 'react';
import { authenticate } from '../services/requests';
import { AuthData, AuthContextProvider, Context } from '../types/Context';
import { User } from '../types/User';
import { getUserLocalStorage, setUserLocalStorage } from './util';

export const AuthContext = createContext<Context>({} as Context);

export const AuthProvider = ({ children }: AuthContextProvider) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) setUser(user);
  }, []);

  const login = async (data: AuthData) => {
    const payload = await authenticate(data);
    setUser(payload);
    setUserLocalStorage(payload);
    return payload;
  };

  const logout = () => {
    setUser(null);
    setUserLocalStorage(null);
  };

  const update = (data: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...data };
      setUserLocalStorage(newUser);
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};
