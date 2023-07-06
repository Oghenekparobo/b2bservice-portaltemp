import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUpdateMerchant } from '../../../utils/http';
import { CheckAuthorization } from '../../../utils/checkAuth';
import Iconify from '../../../components/iconify';

export default function UpdateForm() {
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split('/');
  const usernameParam = parts[parts.length - 1];

  const { updateMerchant, isLoading } = useUpdateMerchant();

  const [newCompanyName, setNewCompanyName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const { user } = CheckAuthorization();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(newUsername)) {
      setMessage('Username must be an E-mail address');
      return;
    }
    if (usernameParam === '' || newUsername === '' || newCompanyName === '' || newPassword === '') {
      setMessage('All fields are required');
      return;
    }

    if (user === 'super-admin') {
      const body = {
        username: usernameParam,
        newName: newCompanyName,
        newUsername,
        newPassword,
        airtimeID: '',
        dataID: '',
        b2bID: '',
      };
      updateMerchant(body);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <Collapse in={message !== ''}>
          <div style={{ color: 'red', marginTop: '0.5rem', transition: 'all 0.3s' }}>{message}</div>
        </Collapse>

        <TextField name="username" label="Username" value={usernameParam} disabled />
        <TextField
          name="newCompanyName"
          label="New Company Name"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          onBlur={() => setMessage('')}
        />
        <TextField
          name="newUsername"
          type="email"
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
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : ' Update'}
        </LoadingButton>
      )}
    </>
  );
}
