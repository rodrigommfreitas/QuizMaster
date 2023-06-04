import { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IPrivateMatchModalProps {
  setIsPrivateMatchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PrivateMatchModal = ({
  setIsPrivateMatchModalOpen,
}: IPrivateMatchModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsPrivateMatchModalOpen(false));

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
      <div
        ref={ref}
        className='flex w-4/5 max-w-sm flex-col items-center justify-center gap-2 rounded-lg bg-white p-6  shadow-lg shadow-black/25'
      >
        <div className='flex w-full justify-between'>
          <h1 className='mb-6 text-2xl font-bold'>Private match</h1>
          <button className='h-fit w-fit'>
            <XMarkIcon
              onClick={() => setIsPrivateMatchModalOpen(false)}
              className='h-8 w-8'
            />
          </button>
        </div>

        <div></div>

        <div className='flex w-full justify-center gap-4'>
          <input
            type='text'
            placeholder='Private key'
            className='rounded-lg bg-gray-200 p-2'
          />
          <button className='rounded-lg bg-portage-800 py-2 px-4'>Join</button>
        </div>
      </div>
    </div>
  );
};
