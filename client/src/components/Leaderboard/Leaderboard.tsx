import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../../services/requests';
import { User } from '../../types/User';
import { PlayerRow } from './PlayerRow';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    fetchLeaderboard(10).then((leaderboard) => setLeaderboard(leaderboard));
  }, []);

  return (
    <div className='rounded-lg bg-white shadow-lg shadow-black/25'>
      <h1 className='w-96 px-6 py-3 text-xl font-bold'>Top Players</h1>
      <table className='w-full'>
        <thead>
          <tr className='text-left font-light uppercase tracking-wide text-gray-500 '>
            <th className='px-4 py-2'>#</th>
            <th className='py-2 '>Player</th>
            <th className='py-2 '>Wins</th>
            <th className='py-2'>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              index={index + 1}
              isLast={leaderboard.length === index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
