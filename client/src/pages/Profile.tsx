import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchUser } from '../services/requests';
import { User } from '../types/User';

export const Profile = () => {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const userId = useParams<{ id: string }>().id as string;

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('../auth');
    fetchUser(userId).then((user) => setProfileUser(user));
  }, [userId]);

  return (
    <div className='flex h-[calc(100vh-76px)] w-full flex-col items-center justify-center gap-8 sm:gap-12'>
      <Link
        to='../'
        className='h-fit w-fit rounded-full bg-black/25 p-4 text-white transition hover:bg-black/40 active:scale-95 active:bg-black/50'
      >
        <ArrowUturnLeftIcon className='h-8 w-8 sm:h-12 sm:w-12' />
      </Link>
      <div className='w-4/5 rounded-2xl bg-white px-6 py-12 shadow-lg shadow-black/25 sm:w-[560px]'>
        <div className='flex items-center justify-center gap-6 sm:gap-12'>
          <img
            src='../../public/user.png'
            className='h-24 w-24 rounded-full border-2 border-black bg-orange-500 sm:h-48 sm:w-48'
          ></img>
          <div>
            <h1 className='text-3xl font-bold sm:text-5xl'>
              {profileUser?.username}
            </h1>
            <h3 className='mt-3 text-xl font-semibold text-portage-900 sm:mt-6 sm:text-3xl'>
              {profileUser?.wins === 1
                ? profileUser?.wins + ' win'
                : profileUser?.wins + ' wins'}
            </h3>
          </div>
        </div>

        <div className='my-8 h-[1px] w-full bg-gray-500'></div>

        <div className='flex w-full items-center justify-center text-left text-xl font-bold text-gray-800 sm:text-2xl'>
          <div className='flex w-72 flex-col gap-4 text-left'>
            <div>
              <span className='text-portage-900'>
                {profileUser?.totalScore}
              </span>{' '}
              Total Score
            </div>
            <div>
              <span className='text-portage-900'>
                {profileUser?.playedGames}
              </span>{' '}
              Played Games
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
