import { Question } from './Question';
import { User } from './User';

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: unknown) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  joinRoom: (data: { roomId: number; roomPlayers: User[] }) => void;
  createdRoom: (data: { roomId: number }) => void;
  startVoting: (categories: Record<number, string>) => void;
  startMatch: (data: { category: string; firstQuestion: Question }) => void;
  answerResult: (data: {
    isCorrect: boolean;
    playerId: string;
    answer: string;
  }) => void;
  nextQuestion: (question: Question) => void;
  gameOver: (winnerId: string) => void;
}

export interface ClientToServerEvents {
  findMatch: (user: User) => void;
  vote: (data: { category: string; playerId: string }) => void;
  answer: (data: { answer: string; playerId: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
