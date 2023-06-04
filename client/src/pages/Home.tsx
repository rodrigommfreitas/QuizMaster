import { Link, useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { PrivateMatchModal } from '../components/PrivateMatchModal';
import { useAuth } from '../hooks/useAuth';
import { socket } from '../services/socket';
import { User } from '../types/User';

export const Home = () => {
  const [isPrivateMatchModalOpen, setIsPrivateMatchModalOpen] =
    useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'QuizMaster';
    if (!user) navigate('../auth');
  }, []);

  const findMatch = () => {
    socket.emit('findMatch', user as User);

    socket.on('joinRoom', ({ roomId, roomPlayers }) => {
      console.log(roomId, roomPlayers);
      navigate(`../quiz/${roomId}`, { state: { roomPlayers } });
    });
  };

  const btnStyle =
    'w-80 rounded-lg bg-portage-400 transition hover:scale-110 hover:bg-portage-300 active:opacity-80 lg:h-64 drop-shadow flex items-center justify-center';
  const svgStyle = 'absolute h-full w-full opacity-10';

  return (
    <>
      <div className='flex h-[calc(100vh-76px)] w-full items-center justify-center gap-8 text-4xl font-bold text-gray-800'>
        <div className='grid h-[calc(100vh-150px)] grid-cols-1 grid-rows-3 gap-8 lg:grid-cols-3 lg:grid-rows-1 lg:items-center'>
          <button onClick={findMatch} className={btnStyle}>
            FIND MATCH
            <MagnifyingGlassIcon className={svgStyle} />
          </button>
          <button
            className={btnStyle}
            onClick={() => setIsPrivateMatchModalOpen(true)}
          >
            PRIVATE MATCH
            <LockClosedIcon className={svgStyle} />
          </button>
          <Link
            to={`../profile/${user?.id}`}
            className={`${btnStyle} flex items-center justify-center`}
          >
            YOUR PROFILE
            <UserIcon className={svgStyle} />
          </Link>
        </div>
      </div>

      {isPrivateMatchModalOpen && (
        <PrivateMatchModal
          setIsPrivateMatchModalOpen={setIsPrivateMatchModalOpen}
        />
      )}
    </>
  );
};
