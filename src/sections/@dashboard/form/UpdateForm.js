import React, { useState } from 'react';
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import customFetch from '../../../utils/http';
import { CheckAuthorization } from '../../../utils/checkAuth';
import Iconify from '../../../components/iconify';

export default function UpdateForm() {
  const [username, setUsername] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const { user, token } = CheckAuthorization();

  const handleClick = async (e) => {
    e.preventDefault();
    if (username === '' || newUsername === '' || newCompanyName === '' || newPassword === '') {
      setMessage('All fields are required');
      return;
    }

    console.log(username, newUsername, newCompanyName, newPassword);
    if (user === 'super-admin') {
      const body = {
        username,
        newUsername,
        newName: newCompanyName,
        newPassword,
      };
      try {
        const response = await customFetch.put(
          '/update-merchant',
          { body },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.message);
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
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setMessage('')}
        />
        <TextField
          name="newCompanyName"
          label="New Company Name"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          onBlur={() => setMessage('')}
        />

        <TextField
          name="newUsername"
          label="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          onBlur={() => setMessage('')}
        />

        <TextField
          name="newPassword"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          Update
        </LoadingButton>
      )}
    </>
  );
}
