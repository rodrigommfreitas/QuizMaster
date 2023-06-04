import { Router } from 'express';
import AuthRoutes from './AuthRoutes';
import Paths from './constants/Paths';
import UserRoutes from './UserRoutes';

// **** Variables **** //

const apiRouter = Router();

// **** Setup **** //

// ** Add Auth Router ** //

const authRouter = Router();

// Login user
authRouter.post(Paths.Auth.Login, AuthRoutes.login);

// Register user
authRouter.post(Paths.Auth.Register, AuthRoutes.register);

// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add Auth Router
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add User Router ** //

const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.GetAll, UserRoutes.getAll);

// Get leaderboard
userRouter.get(Paths.Users.Leaderboard, UserRoutes.getLeaderboard);

// Get one user
userRouter.get(Paths.Users.GetOne, UserRoutes.getOneById);

// Update one user
userRouter.patch(Paths.Users.Update, UserRoutes.update);

// Delete one user
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add User Router

apiRouter.use(Paths.Users.Base, userRouter);

export default apiRouter;
