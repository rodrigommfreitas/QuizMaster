import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types/User';
import { Scoreboard } from './Match/Scoreboard';

interface EndProps {
  winner: User;
  players: User[];
}

export const End: FC<EndProps> = ({ winner, players }) => {
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id === winner.id) setIsWinner(true);
  }, []);

  return (
    <div className='flex flex-col items-center text-center'>
      <h1 className='mb-8 w-[350px] text-xl'>
        {isWinner
          ? 'Congratulations, you won the match!'
          : `The winner is ${winner.username}!`}
      </h1>
      <Scoreboard players={players} />
      <button
        className='mt-8 rounded-md bg-white px-4 py-2 font-semibold transition hover:bg-white/75'
        onClick={() => navigate('../')}
      >
        Return to menu
      </button>
    </div>
  );
};
