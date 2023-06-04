export type User = {
  id: string;
  username: string;
  password: string;
  wins: number;
  totalScore: number;
  playedGames: number;
  createdAt?: Date;
  updatedAt?: Date;
  score?: number;
};
