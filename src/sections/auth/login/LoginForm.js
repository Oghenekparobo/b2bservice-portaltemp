import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

LoginForm.propTypes = {
  adminType: PropTypes.string, // Add the prop type validation for the "user" prop
};

export default function LoginForm({ adminType }) {
  const navigate = useNavigate();

  useEffect(() => {}, [adminType]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const inputUsername = username.trim();
    const inputPassword = password.trim();
    console.log(inputUsername, inputPassword);

    if (inputUsername === '' || inputPassword === '') {
      setMessage('Invalid User Credentials');
      return;
    }

    if (adminType === 'super-admin') {
      console.log('this is the super admin access');

      // if (inputUsername !== 'vasadmin' || inputPassword !== '2919') {
      //   setMessage('username or password is incorrect');
      //   return;
      // }
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(
        'http://141.144.237.21:3000/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.status);
      // const response = await fetch('http://132.145.231.191/b2bapp-stephen/login', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
      localStorage.setItem('user', adminType);
      localStorage.setItem('username', username);

      navigate('/dashboard', { replace: true });
    } else {
      console.log('this is the merchant access');
      if (inputUsername !== 'shalina' || inputPassword !== '2913') {
        setMessage('username or password is incorrect');
        return;
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      // perform authentication on seyis, get token
      // const response = await fetch('http://132.145.231.191/b2bapp-stephen/login', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
      localStorage.setItem('user', 'merchant');
      localStorage.setItem('username', username);

      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <Collapse in={message !== ''}>
          <div style={{ color: 'red', marginTop: '0.5rem', transition: 'all 0.3s' }}>{message}</div>
        </Collapse>

        <TextField
          name="name"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setMessage('')}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setMessage('')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
