import type { FC } from 'react';
import { User } from '../../../types/User';

export const PlayerCard: FC<{ player: User }> = ({ player }) => {
  return (
    <li className='flex flex-col items-center rounded-lg bg-white p-2 shadow-2xl shadow-black/25 sm:p-8'>
      <img
        className='h-20 w-20 rounded-full border border-black bg-orange-500 sm:h-32 sm:w-32 md:h-48 md:w-48'
        src='../../../../public/user.png'
        alt={`${player.username}'s user image`}
      />
      <h2 className='mb-2 mt-4 text-xl font-bold sm:mb-4 sm:mt-8 sm:text-3xl'>
        {player.username}
      </h2>
      <p className='text-lg font-bold text-portage-900 sm:text-xl'>
        {player.wins} {player.wins === 1 ? 'win' : 'wins'}
      </p>
    </li>
  );
};
