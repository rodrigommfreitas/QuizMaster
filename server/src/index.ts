/**
 * Setup socket server and run.
 */

import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import axios from 'axios';
import { Server } from 'socket.io';
import EnvVars from './constants/EnvVars';
import server from './server';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/socket/events';
import { Question, Room } from './types/socket/misc';
import { tick } from './util/misc';

// **** Run **** //

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));

// **** Setup **** //

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: 'http://localhost:4000',
  },
});

let rooms: Room[] = [];

const categories: Record<number, string> = {
  9: 'General Knowledge',
  11: 'Films',
  12: 'Music',
  15: 'Videogames',
  22: 'Geography',
  23: 'History',
};

let currentQuestion = 0;
let questions: Question[] = [];

// *** Events *** //

io.on('connection', (socket) => {
  socket.on('findMatch', async (user) => {
    const isAlreadyPlaying = rooms.find((r) =>
      r.players.some((p) => p.id === user.id)
    );

    if (isAlreadyPlaying) return;

    let joinedRoom = false;
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (room.players.length < 4) {
        room.players.push(user);
        socket.join(room.id.toString());
        io.in(room.id.toString()).emit('joinRoom', {
          roomId: room.id,
          roomPlayers: room.players,
        });
        joinedRoom = true;
        if (room.players.length === 4) {
          await tick(500);
          io.in(room.id.toString()).emit('startVoting', categories);
        }
        break;
      }
    }

    if (!joinedRoom) {
      const newRoom = {
        id: rooms.length + 1,
        players: [user],
        votes: [],
        scores: {},
        answered: [],
        isOngoing: false,
      };
      rooms.push(newRoom);
      socket.join(newRoom.id.toString());
      io.in(newRoom.id.toString()).emit('joinRoom', {
        roomId: newRoom.id,
        roomPlayers: newRoom.players,
      });
    }
  });

  socket.on('vote', async ({ category, playerId }) => {
    const room = rooms.find((r) => r.players.some((p) => p.id === playerId));
    if (!room) return;

    console.log(`Received vote for ${category}`);
    room.votes.push(category);

    if (room.votes.length === 4) {
      const votes = room.votes.reduce(
        (acc: Record<string, number>, curr: string) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        },
        {}
      );
      const winner = Object.keys(votes).reduce((a, b) =>
        votes[a] > votes[b] ? a : b
      );
      const tiedCategories = Object.keys(votes).filter(
        (v) => votes[v] === votes[winner]
      );
      let selectedCategory: number;
      if (tiedCategories.length === 1) {
        selectedCategory = Number(winner);
      } else {
        selectedCategory = Number(
          tiedCategories[Math.floor(Math.random() * tiedCategories.length)]
        );
      }
      // Setup room for match
      room.isOngoing = true;
      questions = await fetchQuestions(selectedCategory);
      console.log(questions);
      const categoryString = categories[selectedCategory];
      await tick(500);
      io.in(room.id.toString()).emit('startMatch', {
        category: categoryString,
        firstQuestion: questions[0],
      });
    }
  });

  socket.on('answer', async ({ answer, playerId }) => {
    const room = rooms.find((r) => r.players.some((p) => p.id === playerId));
    if (!room) return;

    console.log(`Received answer ${answer}`);

    if (!room.answered.includes(playerId)) {
      room.answered.push(playerId);
    }

    const question = questions[currentQuestion];
    const isCorrect = question.correctAnswer === answer;
    if (isCorrect) {
      room.scores[playerId] = (room.scores[playerId] || 0) + 1;
    }
    await tick(500);
    io.in(room.id.toString()).emit('answerResult', {
      isCorrect,
      playerId,
      answer,
    });

    if (room.answered.length === room.players.length || isCorrect) {
      room.answered = [];
      currentQuestion++;
      if (currentQuestion < questions.length) {
        await tick(500);
        io.in(room.id.toString()).emit(
          'nextQuestion',
          questions[currentQuestion]
        );
      } else {
        const winnerId = Object.keys(room.scores).reduce((a, b) =>
          room.scores[a] > room.scores[b] ? a : b
        );

        /*
        console.log('scores: ');
        for (const [key, value] of Object.entries(room.scores)) {
          console.log(`${key}: ${value}`);
        }
        console.log('winner id: ' + winnerId);
        */

        await tick(500);
        io.in(room.id.toString()).emit('gameOver', winnerId);
        // Reset variables for future games and remove room
        currentQuestion = 0;
        questions = [];
        rooms = rooms.filter((r) => r.id !== room.id);
      }
    }
  });
});

async function fetchQuestions(category: number): Promise<Question[]> {
  const apiUrl = 'https://opentdb.com/api.php';
  const res = await axios.get<{ results: Question[] }>(apiUrl, {
    params: {
      amount: 7,
      category,
      difficulty: 'easy',
      type: 'multiple',
      encode: 'base64',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const questions: Question[] = res.data.results.map((result: any) => ({
    question: Buffer.from(result.question, 'base64').toString('utf-8'),
    choices: [...result.incorrect_answers, result.correct_answer]
      .map((answer) => Buffer.from(answer, 'base64').toString())
      .sort(),
    correctAnswer: Buffer.from(result.correct_answer, 'base64').toString(
      'utf-8'
    ),
  }));
  return questions;
}
