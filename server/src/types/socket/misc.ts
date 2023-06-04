import { User } from '@prisma/client';

export interface Room {
  id: number;
  players: User[];
  votes: string[];
  scores: Record<string, number>;
  answered: string[];
  isOngoing: boolean;
}

export interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}
