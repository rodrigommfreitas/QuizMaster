import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu } from './Menu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const location = useLocation();
  const path = location.pathname.includes('quiz')
    ? 'quiz'
    : location.pathname.includes('auth')
    ? 'auth'
    : 'home';
  const url = path === 'quiz' || path === 'auth' ? location : 'home';

  return (
    <header
      className={`flex h-[76px] w-full items-center p-4 ${
        path === 'quiz' ? 'justify-center' : 'justify-between'
      }
      ${path === 'auth' ? 'hidden' : 'block'}`}
    >
      <Link
        to={url}
        className='select-none text-3xl font-extrabold text-white drop-shadow sm:text-4xl'
      >
        QuizMaster
      </Link>

      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${
          path === 'quiz' ? 'hidden' : 'flex'
        } items-center rounded-full bg-white p-2 drop-shadow transition active:scale-95`}
      >
        <img
          className='h-7 w-7 rounded-full'
          src='../../../public/user.png'
          alt=''
        />
        <span className='ml-2 font-semibold'>{user?.username}</span>
      </button>
    </header>
  );
};
