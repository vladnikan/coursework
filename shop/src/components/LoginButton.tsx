import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useAppDispatch } from '../hooks/redux-hooks';
import { removeUser } from '../store/slices/userSlice';

const LoginButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email } = useAuth();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  return (
    <div className='loginButton'>
    <button onClick={handleLogout}>
      Выйти
    </button>
    </div>
  );
};

  export default LoginButton;