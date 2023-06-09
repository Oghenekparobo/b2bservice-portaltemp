import { experimentalStyled } from '@mui/material';

// Function to check if the user should be redirected to the login page
export const CheckAuthorization = () => {
  // Check if either username or currentName is missing

  const { username, user, token } = getCredentials();

  if (!username || !user) {
    reset();
    return false;
  }

  // Check if currentName is not 'super-admin' or 'merchant'
  if (user !== 'super-admin' && user !== 'merchant' && !token) {
    reset();
    return false;
  }
  if (!token || token === null || token === '') {
    reset();
    return false;
  }

  // Return true if the user is authorized
  return true;
};

// Function to clear credentials
export const reset = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCredentials = () => {
  const username = localStorage.getItem('username');
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return { username, user, token };
};

// check if token has expired

// export function checkTokenExpiry() {
//   const { token } = getCredentials();
//   console.log(token);
//   return { token };
// }

export const getToken = () => {
  const token = localStorage.getItem('token');
  return { token };
};
