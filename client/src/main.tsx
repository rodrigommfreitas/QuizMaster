import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Home, Quiz, Profile, Auth } from './pages';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='auth' element={<Auth />} />
      <Route path='/' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='quiz/:id' element={<Quiz />} />
      <Route path='profile/:id' element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
