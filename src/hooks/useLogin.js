import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customFetch from '../utils/http';

export const useLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = async (adminType, username, inputUsername, inputPassword) => {
    if (adminType === 'super-admin') {
      console.log('this is the super admin access');

      try {
        const body = {
          username: inputUsername,
          password: inputPassword,
        };
        const { data } = await customFetch.post('http://141.144.237.21:3000/login', body);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', adminType);
        localStorage.setItem('username', username);
        const timestamp = Date.now();
        localStorage.setItem('timestamp', timestamp.toString());

        if (data.token) {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        setMessage('username or password is incorrect');
      }
    } else {
      console.log('this is the merchant access');

      try {
        const body = {
          username: inputUsername,
          password: inputPassword,
        };
        const { data } = await customFetch.post('http://141.144.237.21:3000/login', body);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', 'merchant');
        localStorage.setItem('username', username);
        const timestamp = Date.now();
        localStorage.setItem('timestamp', timestamp.toString());

        if (data.token) {
          console.log(data.token);
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        setMessage('username or password is incorrect');
      }
    }
  };

  return { message, setMessage, handleLogin };
};
