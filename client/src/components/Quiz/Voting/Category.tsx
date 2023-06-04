import { FC } from 'react';

interface CategoryProps {
  categoryIndex: string;
  categoryText: string;
  handleVote: (key: string) => void;
  hasVoted: boolean;
}

export const Category: FC<CategoryProps> = ({
  categoryIndex,
  categoryText,
  handleVote,
  hasVoted,
}) => {
  return (
    <li>
      <button
        disabled={hasVoted}
        className='w-full rounded-md bg-portage-900 px-4 py-2 font-bold text-white transition hover:bg-portage-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-opacity-75 disabled:hover:bg-portage-900/75'
        onClick={() => handleVote(categoryIndex)}
      >
        {categoryText}
      </button>
    </li>
  );
};
