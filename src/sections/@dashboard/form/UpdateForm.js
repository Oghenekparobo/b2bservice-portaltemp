import React, { useState } from 'react';
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getCredentials } from '../../../utils/checkAuth';
import Iconify from '../../../components/iconify';

export default function UpdateForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [createdSubmerchants, setCreatedSubmerchants] = useState([]);

  const { user } = getCredentials();

  const isUsernameUnique = (username) => !createdSubmerchants.includes(username);

  const createSubmerchant = () => {
    if (!isUsernameUnique(username)) {
      setMessage('Username is already taken');
    } else {
      setCreatedSubmerchants([...createdSubmerchants, username]);
      setMessage('merchant onboarded successfully');
      // Perform additional logic for submerchant onboarding
    }

    // Reset form fields
    setUsername('');
    setPassword('');
    setCompanyName('');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (companyName === '' || username === '' || password === '') {
      setMessage('All fields are required');
      return;
    }

    if (user === 'super-admin') {
      if (!isUsernameUnique(username)) {
        setMessage('Username is already taken');
        return;
      }
      createSubmerchant();
      // Perform additional logic for super-admin
    } else if (user === 'merchant') {
      if (createdSubmerchants.length >= 2) {
        setMessage('You have reached the maximum number of submerchants');
        return;
      }
      createSubmerchant();
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

      {user === 'merchant' && createdSubmerchants.length < 2 && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Onboard
        </LoadingButton>
      )}

      {user === 'merchant' && createdSubmerchants.length >= 2 && (
        <div>You have reached the maximum number of submerchants</div>
      )}
    </>
  );
}
