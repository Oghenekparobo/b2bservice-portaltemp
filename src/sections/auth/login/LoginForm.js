import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLogin } from '../../../hooks/useLogin';
import Iconify from '../../../components/iconify';

LoginForm.propTypes = {
  adminType: PropTypes.string, // Add the prop type validation for the "user" prop
};

export default function LoginForm({ adminType }) {
  useEffect(() => {}, [adminType]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { message, setMessage, handleLogin } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const inputUsername = username.trim();
    const inputPassword = password.trim();
    console.log(inputUsername, inputPassword);

    if (inputUsername === '' || inputPassword === '') {
      setMessage('Invalid User Credentials');
      return;
    }

    setIsLoading(true);
    await handleLogin(adminType, username, inputUsername, inputPassword);
    setIsLoading(false);
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
        {isLoading ? 'please wait...' : 'login'}
      </LoadingButton>
    </>
  );
}
