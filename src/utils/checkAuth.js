// Function to check if the user should be redirected to the login page
export const CheckAuthorization = () => {
  // Check if either username or currentName is missing

  const { username, user } = getCredentials();
  if (!username || !user) {
    reset();
    console.log('1');
    return false;
  }

  // Check if currentName is not 'super-admin' or 'vas2nets'
  if (user !== 'super-admin' && user !== 'merchant') {
    reset();
    console.log('2');
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

  return { username, user };
  // const username = localStorage.getItem('username')
};
