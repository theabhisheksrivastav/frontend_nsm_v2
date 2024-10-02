import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from "../services/authService";
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [button, setButton] = useState('login');

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(loginAction({ userData }));
          setButton('logout');
        } else {
          dispatch(logoutAction());
          setButton('login');
        }
      })
      .catch(() => {
        setButton('login');
      });
  }, [dispatch]);

  const handleButtonClick = async () => {
    if (button === 'logout') {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        toast.error("No user is currently logged in");
        return;
      }

      try {
        await authService.logout();
        dispatch(logoutAction());
        setButton('login');
        toast.success('Logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed: ' + error.message);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {button}
      </button>
    </div>
  );
};

export default Home;
