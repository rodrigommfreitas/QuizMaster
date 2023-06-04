import HttpStatusCodes from '../constants/HttpStatusCodes';
import UserService from '../services/UserService';
import { IReq, IRes } from '../types/express/misc';
import { User } from '@prisma/client';

// **** Types **** //

// **** Functions **** //

// Get one user by their id
async function getOneById(req: IReq, res: IRes) {
  const id = req.params.id;
  const user = await UserService.getOneById(id);
  if (!user) {
    return res.status(HttpStatusCodes.NOT_FOUND).end();
  }
  return res.status(HttpStatusCodes.OK).json(user);
}

// Get all users
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json(users);
}

// Get leaderboard
async function getLeaderboard(req: IReq, res: IRes) {
  const quantity = Number(req.params.quantity);
  const users = await UserService.getLeaderboard(quantity);
  return res.status(HttpStatusCodes.OK).json(users);
}

// Update one user
async function update(req: IReq<Partial<User>>, res: IRes) {
  const id = req.params.id;
  const user = req.body;
  await UserService.updateOne(user, id);
  return res.status(HttpStatusCodes.OK).end();
}

// Delete one user
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  getLeaderboard,
  getOneById,
  update,
  delete: delete_,
} as const;
