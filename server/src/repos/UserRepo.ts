import { User } from '@prisma/client';
import { prisma } from '../../db';

// **** Functions **** //

// Get one user by their id
async function getOneById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user ?? null;
}

// Get one user by their username
async function getOneByUsername(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user ?? null;
}

// Get all users
async function getAll(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

// Get many users starting ordered by highest total score
async function getManyByTotalScore(quantity: number): Promise<User[]> {
  const users = await prisma.user.findMany({
    orderBy: {
      totalScore: 'desc',
    },
    take: quantity,
  });
  return users;
}

// See if a user with the given id exists
async function persistsById(id: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user !== null;
}

// See if a user with the given username exists
async function persistsByUsername(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user !== null;
}

// Add one user
async function add(username: string, password: string): Promise<void> {
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

// Update a user
async function update(user: Partial<User>): Promise<void> {
  await prisma.user.update({
    where: {
      id: user.id as string,
    },
    data: {
      wins: user.wins,
      totalScore: user.totalScore,
      playedGames: user.playedGames,
    },
  });
}

// Delete one user
async function delete_(id: string): Promise<void> {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  getOneById,
  getOneByUsername,
  persistsById,
  persistsByUsername,
  getAll,
  getManyByTotalScore,
  add,
  update,
  delete: delete_,
} as const;
