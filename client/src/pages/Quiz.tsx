import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Voting } from '../components/Quiz/Voting/Voting';
import { Lobby } from '../components/Quiz/Lobby/Lobby';
import { useAuth } from '../hooks/useAuth';
import { socket } from '../services/socket';
import { User } from '../types/User';
import { Match } from '../components/Quiz/Match/Match';
import { End } from '../components/Quiz/End';
import { Question } from '../types/Question';
import { updateUser } from '../services/requests';

export const Quiz: FC = () => {
  const [quizState, setQuizState] = useState<
    'waiting' | 'voting' | 'playing' | 'end'
  >('waiting');
  const [players, setPlayers] = useState<User[]>([]);
  const [winner, setWinner] = useState<User>();
  const [categories, setCategories] = useState<Record<number, string>>([]);
  const [category, setCategory] = useState<string>('');
  const [firstQuestion, setFirstQuestion] = useState<Question | null>(null);
  const { user } = useAuth();
  const location = useLocation();
  const { update } = useAuth();

  useEffect(() => {
    const roomPlayers = location.state.roomPlayers as User[];
    setPlayers(roomPlayers);

    socket.on('joinRoom', ({ roomPlayers }) => {
      setPlayers(roomPlayers);
    });

    socket.on('startVoting', (categories) => {
      setQuizState('voting');
      setCategories(categories);
    });

    socket.on('startMatch', ({ category, firstQuestion }) => {
      setQuizState('playing');
      setCategory(category);
      setFirstQuestion(firstQuestion);
    });

    return () => {
      socket.off('joinRoom');
      socket.off('startVoting');
      socket.off('startMatch');
    };
  }, []);

  useEffect(() => {
    socket.on('gameOver', async (winnerId) => {
      setWinner(players.find((player) => player.id === winnerId));
      setQuizState('end');

      if (user?.id === winnerId) {
        update({
          id: user?.id as string,
          wins: (user?.wins as number) + 1,
        });

        await updateUser(user?.id as string, {
          id: user?.id as string,
          wins: (user?.wins as number) + 1,
        });
      }

      update({
        id: user?.id as string,
        playedGames: (user?.playedGames as number) + 1,
      });

      await updateUser(user?.id as string, {
        id: user?.id as string,
        playedGames: (user?.playedGames as number) + 1,
      });
    });

    return () => {
      socket.off('gameOver');
    };
  }, [players]);

  return (
    <div className='absolute inset-0 flex items-center justify-center px-8'>
      {quizState === 'waiting' && <Lobby players={players} />}
      {quizState === 'voting' && <Voting categories={categories} />}
      {quizState === 'playing' && (
        <Match
          category={category}
          firstQuestion={firstQuestion as Question}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {quizState === 'end' && <End winner={winner as User} players={players} />}
    </div>
  );
};
