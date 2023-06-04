/**
 * Express router paths go here.
 */

import { Immutable } from '../../other/types';

const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
    Register: '/register',
  },
  Users: {
    Base: '/users',
    GetAll: '/',
    Leaderboard: '/leaderboard/:quantity', // params: quantity of users to get
    GetOne: '/:id', // params: id to get
    Update: '/:id', // params: id to update; body: id of who is updating
    Delete: '/:id', // params: id to delete; body: id of who is deleting
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
