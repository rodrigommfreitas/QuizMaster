import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/User';

interface PlayerRowProps {
  player: User;
  index: number;
  isLast: boolean;
}

export const PlayerRow: FC<PlayerRowProps> = ({ player, index, isLast }) => {
  return (
    <tr className={`font-medium ${isLast && 'rounded-b-lg'}`}>
      <td className='px-4 py-2'>{index}</td>
      <td className='py-2'>
        <Link
          to={'../profile/' + 'rdrgwrld'}
          className='cursor-pointer text-portage-900'
        >
          {player.username}
        </Link>
      </td>
      <td className='py-2'>{player.wins}</td>
      <td className='py-2'>{player.totalScore}</td>
    </tr>
  );
};
