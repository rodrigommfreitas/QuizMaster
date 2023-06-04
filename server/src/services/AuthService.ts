import PwdUtil from '../util/PwdUtil';
import { tick } from '../util/misc';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { User } from '@prisma/client';
import UserRepo from '../repos/UserRepo';
import { RouteError } from '../other/classes';

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  Password: 'Password is incorrect',
  UsernameNotFound(username: string) {
    return `User with username "${username}" not found`;
  },
  UsernameAlreadyExists(username: string) {
    return `User with username "${username}" already exists`;
  },
} as const;

// **** Functions **** //

// Login a user

async function login(username: string, password: string): Promise<User> {
  // Fetch user
  const user = await UserRepo.getOneByUsername(username);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.UsernameNotFound(username)
    );
  }
  // Check password
  const hash = user.password ?? '',
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms, this will increase security
    await tick(500);
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, Errors.Password);
  }

  return user;
}

// Register a user
async function register(username: string, password: string) {
  // Check if user already exists
  const userExists = await UserRepo.persistsByUsername(username);
  if (userExists) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.UsernameAlreadyExists(username)
    );
  }
  // Hash password
  const hash = await PwdUtil.getHash(password);
  // Add user
  await UserRepo.add(username, hash);

  return { username, password };
}

export default {
  login,
  register,
} as const;
