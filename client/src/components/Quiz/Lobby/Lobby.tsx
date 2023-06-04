import { FC, useEffect } from 'react';
import { User } from '../../../types/User';
import { PlayerCard } from './PlayerCard';

export const Lobby: FC<{ players: User[] }> = ({ players }) => {
  useEffect(() => {
    document.title = 'QuizMaster | Lobby';
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h3 className='mb-16 text-2xl font-bold text-white'>
        Waiting for players -<span> {players.length}/4</span>
      </h3>
      <ul className='flex gap-4 sm:gap-8 md:gap-12'>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </ul>
    </div>
  );
};
