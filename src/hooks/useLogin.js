import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginFetch = axios.create({
  baseURL: 'http://141.144.237.21:3000',
});

export const useLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = async (adminType, username, inputUsername, inputPassword) => {
    if (adminType === 'super-admin') {
      try {
        const body = {
          username: inputUsername,
          password: inputPassword,
        };
        const { data } = await loginFetch.post('http://141.144.237.21:3000/login', body);

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
      try {
        const body = {
          username: inputUsername,
          password: inputPassword,
        };
        const { data } = await loginFetch.post('http://141.144.237.21:3000/login', body);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', 'merchant');
        localStorage.setItem('username', username);
        const timestamp = Date.now();
        localStorage.setItem('timestamp', timestamp.toString());

        if (data.token) {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        setMessage('username or password is incorrect');
      }
    }
  };

  return { message, setMessage, handleLogin };
};
