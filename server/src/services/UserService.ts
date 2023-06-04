import { User } from '@prisma/client';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { RouteError } from '../other/classes';
import UserRepo from '../repos/UserRepo';

// **** Variables **** //

export const Errors = {
  IdNotFound(id: string) {
    return `User with id "${id}" not found`;
  },
  IdNotMatch(id1: string, id2: string) {
    return `User with id "${id1}" does not match user with id "${id2}"`;
  },
  UsernameNotFound(username: string) {
    return `User with username "${username}" not found`;
  },
  Quantity: 'Invalid quantity',
} as const;

// **** Functions **** //

// Get one user by their id
async function getOneById(id: string): Promise<User | null> {
  const persists = await UserRepo.persistsById(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.IdNotFound(id));
  }
  return UserRepo.getOneById(id) ?? null;
}

// Get one user by their username
async function getOneByUsername(username: string): Promise<User | null> {
  const persists = await UserRepo.persistsByUsername(username);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.UsernameNotFound(username)
    );
  }
  return UserRepo.getOneByUsername(username) ?? null;
}

// Get all users
function getAll(): Promise<User[]> {
  return UserRepo.getAll();
}

function getLeaderboard(quantity: number): Promise<User[]> {
  if (isNaN(quantity) || quantity < 1) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, Errors.Quantity);
  }
  return UserRepo.getManyByTotalScore(quantity);
}

// Update one user
async function updateOne(user: Partial<User>, id: string): Promise<void> {
  if (user.id !== id) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      Errors.IdNotMatch(user.id as string, id)
    );
  }

  const persists = await UserRepo.persistsById(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.IdNotFound(user.id!)
    );
  }
  // Return user
  return UserRepo.update(user);
}

// Delete a user by their id
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persistsById(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.IdNotFound(id));
  }
  // Delete user
  return UserRepo.delete(id);
}

export default {
  getAll,
  getLeaderboard,
  getOneById,
  getOneByUsername,
  updateOne,
  delete: _delete,
} as const;
