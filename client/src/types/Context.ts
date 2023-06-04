import { User } from './User';

export interface AuthData {
  username: string;
  password: string;
}

export interface AuthContextProvider {
  children: JSX.Element;
}

export interface Context {
  login: (user: AuthData) => Promise<User | null>;
  logout: () => void;
  update: (data: Partial<User>) => void;
  user: User | null;
}
