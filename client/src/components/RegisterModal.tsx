import { useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { register } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface RegisterModalProps {
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterModal = ({
  setIsRegisterModalOpen,
}: RegisterModalProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsRegisterModalOpen(false));
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsRegistering(true);

    if (username === '' || password === '' || confirmPassword === '') {
      // set Errors to prev array + new error
      if (!errors.includes('Please fill in all fields.'))
        setErrors((prev) => [...prev, 'Please fill in all fields.']);
      setIsRegistering(false);
      return;
    }
    if (errors.includes('Please fill in all fields.'))
      setErrors((prev) =>
        prev.filter((error) => error !== 'Please fill in all fields.')
      );

    if (password !== confirmPassword) {
      if (!errors.includes('Passwords do not match.'))
        setErrors((prev) => [...prev, 'Passwords do not match.']);
      setIsRegistering(false);
      return;
    }
    if (errors.includes('Passwords do not match.'))
      setErrors((prev) =>
        prev.filter((error) => error !== 'Passwords do not match.')
      );

    try {
      const status = await register({ username, password });
      if (status === 201) {
        const user = await login({ username, password });
        if (user) navigate('/');
      }
    } catch (e) {
      if (!errors.includes('Username already exists.'))
        setErrors((prev) => [...prev, 'Username already exists.']);
    }
    setIsRegistering(false);
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
      <div
        ref={ref}
        className='w-4/5 max-w-sm rounded-lg bg-white p-6 shadow-lg shadow-black/25'
      >
        <div className='flex justify-between'>
          <h1 className='mb-6 text-2xl font-bold'>Create account</h1>
          <button className='h-fit w-fit'>
            <XMarkIcon
              onClick={() => setIsRegisterModalOpen(false)}
              className='h-8 w-8'
            />
          </button>
        </div>
        <div className='mb-4'>
          {errors.map((error, i) => (
            <p key={i} className='text-sm italic text-red-500'>
              {error}
            </p>
          ))}
        </div>
        <form className='flex flex-col'>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='mb-2 block text-sm font-bold text-gray-700'
            >
              Username
            </label>
            <input
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              id='username'
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              type='text'
              placeholder='Username'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-bold text-gray-700'
            >
              Password
            </label>
            <input
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              className={`${
                errors.includes('Passwords do not match.')
                  ? 'border-red-500'
                  : 'border-transparent'
              } focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
              type='password'
              placeholder='********'
            />
            <label
              htmlFor='confirm-password'
              className='mb-2 block text-sm font-bold text-gray-700'
            >
              Confirm Password
            </label>
            <input
              autoComplete='off'
              onChange={(e) => setConfirmPassword(e.target.value)}
              id='confirm-password'
              className={`${
                errors.includes('Passwords do not match.')
                  ? 'border-red-500'
                  : 'border-transparent'
              } focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
              type='password'
              placeholder='********'
            />
          </div>

          <button
            onClick={(e) => handleRegister(e)}
            className='focus:shadow-outline rounded bg-portage-900 px-4 py-2 font-bold text-white transition hover:bg-portage-700 focus:outline-none disabled:bg-opacity-75'
            type='button'
            disabled={isRegistering}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
