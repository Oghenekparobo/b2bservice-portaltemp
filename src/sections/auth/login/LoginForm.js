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
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      try {
        const body = {
          username,
          password,
        };
        const { data } = await axios.post('http://141.144.237.21:3000/login', body);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', adminType);
        localStorage.setItem('username', username);

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
          username,
          password,
        };
        const { data } = await axios.post('http://141.144.237.21:3000/login', body);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', 'merchant');
        localStorage.setItem('username', username);

        if (data.token) {
          console.log(data.token);
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        setMessage('username or password is incorrect');
      }
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
