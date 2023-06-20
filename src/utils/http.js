import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCredentials } from './checkAuth';

let navigation;

const customFetch = axios.create({
  baseURL: 'http://141.144.237.21:3000',
});

customFetch.setNavigation = (navigate) => {
  navigation = navigate;
};

customFetch.interceptors.request.use((config) => {
  const { token } = getCredentials();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const { user } = getCredentials();

    if (user === 'super-admin') {
      if (error.response.data.status === 401 || error.response.data.status === 403) {
        if (user === 'super-admin') {
          navigation('/super-admin/login');
        }
      }
    }

    if (user === 'merchant') {
      console.log('merchant', error.response.data.status);

      if (error.response.data.status === 401) {
        toast.error('Session Expired.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTimeout(() => {
          navigation('/login');
        }, 2000);
      }

      if (error.response.data.status === 403) {
        toast.error('Maximum limit reached!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }

    if (error.response.data.status === 409) {
      toast.error('Username already exists.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }
);

export default customFetch;

export const sendRequest = async (user, body) => {
  if (user === 'super-admin') {
    try {
      const data = await customFetch.post('/create-merchant', body);
      if (data) {
        toast.success('Merchant Created Successfully', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  } else if (user === 'merchant') {
    try {
      const data = await customFetch.post('/create-subMerchant', body);

      if (data) {
        toast.success('Merchant Created Successfully', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(error);
      // The error will be handled by the interceptor
    }
  }
};
export const useActionMerchant = () => {
  const queryClient = useQueryClient();
  const { mutate: actionMerchant, isLoading } = useMutation({
    mutationFn: async ({ username, type }) => {
      const { data } = await customFetch.put(type === 'activate' ? '/activate-merchant' : '/suspend-merchant', {
        username,
      });
      return { data, username, type };
    },
    onSuccess: ({ data, username, type }) => {
      queryClient.invalidateQueries({ queryKey: 'fetch-merchants' });
      if (data.status === 200) {
        if (type === 'activate') {
          toast.success(`${username} activated successfully`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: 'light',
          });
        }
      } else if (type === 'suspend') {
        toast.success(`${username} has been suspended`, {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: 'light',
        });
      }
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Operation Failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
      });
    },
  });

  return { actionMerchant, isLoading };
};

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate('/');
  const { mutate: updateMerchant, isLoading } = useMutation({
    mutationFn: async ({ body }) => {
      const { data } = await customFetch.put('/update-merchant', body);
      return { data };
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: 'fetch-merchants' });
      if (data.status === 200) {
        toast.success('Updated Succesfully ', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Operation Failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
      });
    },
  });

  return { updateMerchant, isLoading };
};
