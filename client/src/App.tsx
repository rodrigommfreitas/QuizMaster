import { Outlet } from 'react-router-dom';
import { Navbar } from './components';

const App = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-bl from-portage-900 to-portage-500'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
