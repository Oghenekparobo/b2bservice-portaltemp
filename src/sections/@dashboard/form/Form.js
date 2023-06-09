import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getCredentials } from '../../../utils/checkAuth';
import Iconify from '../../../components/iconify';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const { user, token } = getCredentials();

  console.log(token);

  const handleClick = async (e) => {
    e.preventDefault();
    if (companyName === '' || username === '' || password === '') {
      setMessage('All fields are required');
      return;
    }

    if (user === 'super-admin') {
      try {
        const body = {
          name: companyName,
          username,
          password,
        };

        const { data } = await axios.post('http://141.144.237.21:3000/create-merchant', body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Merchant Created Successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.log(data);
      } catch (error) {
        console.log(error.message);
        toast.error('Username Has Already Been Created', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else if (user === 'merchant') {
      // Perform additional logic for merchant
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <Collapse in={message !== ''}>
          <div style={{ color: 'red', marginTop: '0.5rem', transition: 'all 0.3s' }}>{message}</div>
        </Collapse>

        <TextField
          name="companyName"
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          onBlur={() => setMessage('')}
        />

        <TextField
          name="username"
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

      {user === 'super-admin' && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Onboard
        </LoadingButton>
      )}

      {/* {user === 'merchant' && createdSubmerchants.length < 2 && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Onboard
        </LoadingButton>
      )}

      {user === 'merchant' && createdSubmerchants.length >= 2 && (
        <div>You have reached the maximum number of submerchants</div>
      )} */}
    </>
  );
}
