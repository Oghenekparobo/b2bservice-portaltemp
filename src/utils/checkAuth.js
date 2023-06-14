// Function to check if the user should be redirected to the login page
export const CheckAuthorization = () => {
  const { username, user, token } = getCredentials();

  const checkTokenExpiration = () => {
    const expirationTime = 54 * 60 * 1000;
    const timestamp = localStorage.getItem('timestamp');

    if (!username || !user || !token || !timestamp) {
      reset();
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - Number(timestamp);

    if (elapsedTime >= expirationTime) {
      // Token has expired, refresh the token
      const newToken = 'your_new_token_here';
      localStorage.setItem('token', newToken);
      localStorage.setItem('timestamp', currentTime.toString());
    }
  };

  checkTokenExpiration();

  if (!username || !user || !token) {
    reset();
    return false;
  }

  if (user !== 'super-admin' && user !== 'merchant') {
    reset();
    return false;
  }

  return { user, username, token };
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
