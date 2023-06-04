import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface IMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu = ({ setIsMenuOpen }: IMenuProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    setIsMenuOpen(false);
    navigate('/auth');
  };

  return (
    <div className='absolute right-4 top-[72px] z-10 flex flex-col rounded-2xl bg-white font-semibold drop-shadow'>
      <Link
        to={`profile/${user?.id}`}
        onClick={() => setIsMenuOpen(false)}
        className='rounded-t-2xl px-8 py-1 transition hover:bg-gray-200 active:bg-gray-300'
      >
        Your Profile
      </Link>
      <button
        onClick={handleLogout}
        className='rounded-b-2xl px-8 py-1 transition hover:bg-gray-200 active:bg-gray-300'
      >
        Leave
      </button>
    </div>
  );
};
