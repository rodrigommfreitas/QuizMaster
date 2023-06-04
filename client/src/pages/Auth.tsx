import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaderboard, Login } from '../components';
import { useAuth } from '../hooks/useAuth';

export const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center gap-16 sm:gap-32'>
      <h1 className='select-none text-5xl font-black text-white drop-shadow sm:text-6xl'>
        QuizMaster
      </h1>

      <div className='flex items-center justify-center gap-32 xl:gap-48'>
        <Login />
        <div className='hidden lg:block'>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};
