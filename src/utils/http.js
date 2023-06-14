import axios from 'axios';
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
      console.log(data);
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
      console.log(data);
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
