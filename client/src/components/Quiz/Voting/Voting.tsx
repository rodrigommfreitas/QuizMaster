import { FC, useEffect, useState } from 'react';
import { Category } from './Category';
import { socket } from '../../../services/socket';
import { useAuth } from '../../../hooks/useAuth';

interface VotingProps {
  categories: Record<number, string>;
}

export const Voting: FC<VotingProps> = ({ categories }) => {
  const { user } = useAuth();
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'QuizMaster | Voting';
  }, []);

  const handleVote = (key: string) => {
    socket.emit('vote', { category: key, playerId: user?.id as string });
    setHasVoted(true);
  };

  return (
    <div className='flex flex-col items-center rounded-xl bg-white p-8'>
      <h3 className='mb-8 rounded-xl text-2xl font-bold text-black'>
        Choose a category!
      </h3>
      <ul className='grid grid-cols-1 grid-rows-6 justify-center gap-4 rounded-xl bg-slate-300 p-4 md:grid-cols-2 md:grid-rows-3'>
        {Object.entries(categories).map(([key, value], i) => (
          <Category
            handleVote={handleVote}
            key={i}
            categoryIndex={key}
            categoryText={value}
            hasVoted={hasVoted}
          />
        ))}
      </ul>
    </div>
  );
};
