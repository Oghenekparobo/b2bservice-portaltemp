import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customFetch = axios.create({
  baseURL: 'http://141.144.237.21:3000',
});

export default customFetch;

export const sendRequest = async (user, body, token) => {
  if (user === 'super-admin') {
    try {
      const { data } = await customFetch.post('/create-merchant', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Merchant Created Successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } catch (error) {
      console.log(error.message);

      toast.error('Username Has Already Been Created', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
      });
    }
  } else if (user === 'merchant') {
    try {
      const { data } = await customFetch.post('/create-subMerchant', body, {
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
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
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

      if (error.response.status === 409) {
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
  }
};

export const useActionMerchant = () => {
  const queryClient = useQueryClient();
  const { mutate: actionMerchant, isLoading } = useMutation({
    mutationFn: async ({ username, token, type }) => {
      const { data } = await customFetch.put(
        type === 'activate' ? '/activate-merchant' : '/suspend-merchant',
        { username },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    mutationFn: async ({ body, token }) => {
      const { data } = await customFetch.put('/update-merchant', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
