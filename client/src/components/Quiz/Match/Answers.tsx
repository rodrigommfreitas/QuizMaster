import type { FC } from 'react';

interface AnswersProps {
  answers: string[];
  hints: string[];
  handleAnswer: (answer: string) => void;
  hasAnswered: boolean;
}

export const Answers: FC<AnswersProps> = ({
  answers,
  hints,
  handleAnswer,
  hasAnswered,
}) => {
  return (
    <>
      <ul className='grid w-3/4 max-w-5xl grid-cols-1 gap-2 rounded-xl bg-white/25 p-2 shadow-2xl shadow-black/25 md:gap-4 md:p-4 lg:grid-cols-2'>
        {answers.map((answer, i) => (
          <li key={i}>
            <button
              disabled={hasAnswered}
              className='w-full rounded-md bg-portage-900 px-4 py-2 text-base font-semibold text-white transition hover:bg-portage-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-opacity-75 disabled:hover:bg-portage-900/75 sm:py-3 sm:text-lg lg:px-8 lg:py-4 lg:text-left lg:text-2xl'
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <ul className='mt-4'>
        {hints.map((hint, i) => (
          <li
            className={`rounded-md bg-white px-2 font-semibold ${
              hint.includes('wrong') ? 'text-red-500' : 'text-green-700'
            }
            `}
            key={i}
          >
            {hint}
          </li>
        ))}
      </ul>
    </>
  );
};
