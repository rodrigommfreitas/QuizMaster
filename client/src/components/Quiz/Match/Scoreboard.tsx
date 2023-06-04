import { FC, useEffect, useState } from 'react';
import { User } from '../../../types/User';

interface ScoreboardProps {
  players: User[];
}

export const Scoreboard: FC<ScoreboardProps> = ({ players }) => {
  const [sortedPlayers, setSortedPlayers] = useState<User[]>([]);
  useEffect(() => {
    setSortedPlayers(
      players.sort((a, b) => {
        if (!a.score) a.score = 0;
        if (!b.score) b.score = 0;
        return (a.score as number) < (b.score as number) ? 1 : -1;
      })
    );
  }, [players]);

  return (
    <div className='w-3/4 max-w-lg text-center shadow-2xl shadow-black/25'>
      <h1 className='rounded-t-xl border-b border-black bg-white/30 py-1 text-base font-medium md:text-lg'>
        Scoreboard
      </h1>
      <ul className='flex flex-col gap-2 rounded-b-xl bg-white/20 px-4 py-2'>
        {sortedPlayers.map((player) => (
          <li key={player.id} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src='../../../../public/user.png'
                className='h-6 w-6 rounded-full'
              />
              <p className='text-base md:text-lg'>{player.username}</p>
            </div>
            <p className='text-gray-200'>{player.score ?? 0} pts</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
