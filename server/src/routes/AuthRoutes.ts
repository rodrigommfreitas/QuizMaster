import HttpStatusCodes from '../constants/HttpStatusCodes';
import AuthService from '../services/AuthService';
import { IReq, IRes } from '../types/express/misc';
import SessionUtil from '../util/SessionUtil';

/// **** Types **** //

interface IAuthReq {
  username: string;
  password: string;
}

// **** Functions **** //

// Login
async function login(req: IReq<IAuthReq>, res: IRes) {
  const { username, password } = req.body;
  const user = await AuthService.login(username, password);
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, {
    id: user.id,
    name: user.username,
  });
  return res.status(HttpStatusCodes.OK).json(user).end();
}

// Logout
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}

// Register
async function register(req: IReq<IAuthReq>, res: IRes) {
  const { username, password } = req.body;
  await AuthService.register(username, password);
  return res.status(HttpStatusCodes.CREATED).end();
}

export default {
  login,
  logout,
  register,
} as const;
