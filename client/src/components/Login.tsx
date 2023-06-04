import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterModal } from './RegisterModal';

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoggingIn(true);

    if (username === '' || password === '') {
      // set Errors to prev array + new error
      if (!errors.includes('Please fill in all fields.'))
        setErrors((prev) => [...prev, 'Please fill in all fields.']);
      setIsLoggingIn(false);
      return;
    }
    if (errors.includes('Please fill in all fields.'))
      setErrors((prev) =>
        prev.filter((error) => error !== 'Please fill in all fields.')
      );

    try {
      const user = await login({ username, password });
      if (user) navigate('/'); // if user is truthy, navigate to home page
    } catch (err) {
      console.error(err);
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      {isRegisterModalOpen && (
        <RegisterModal setIsRegisterModalOpen={setIsRegisterModalOpen} />
      )}
      <div className='flex w-4/5 max-w-sm flex-col items-center gap-6 rounded-lg bg-white p-6 shadow-lg shadow-black/25 lg:w-96'>
        <div className={errors.length > 0 ? 'block' : 'hidden'}>
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
              id='username'
              onChange={(e) => setUsername(e.target.value)}
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
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              type='password'
              placeholder='********'
            />
            <span className='inline-block align-baseline text-sm font-bold'>
              Forgot Password?{' '}
              <button className='text-portage-900 hover:text-portage-700'>
                Reset your password
              </button>
            </span>
          </div>

          <button
            onClick={(e) => handleLogin(e)}
            className='focus:shadow-outline rounded bg-portage-900 px-4 py-2 font-bold text-white transition hover:bg-portage-700 focus:outline-none disabled:bg-opacity-75'
            type='button'
            disabled={isLoggingIn}
          >
            Log in
          </button>
        </form>

        <span className='text-sm font-bold'>
          Don{"'"}t have an account?{' '}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className='text-portage-900 hover:text-portage-700'
          >
            Sign up
          </button>
        </span>
      </div>
    </>
  );
};
