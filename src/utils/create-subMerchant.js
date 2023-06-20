// import axios from 'axios';

// const subMerchantInstance = axios.create({
//   baseURL: 'http://141.144.237.21:3000',
// });

// subMerchantInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('error', error);
//     return Promise.reject(error);
//   }
// );

// subMerchantInstance.interceptors.request.use((config) => {
//   const { token } = getCredentials();
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const useCreateSubMerchant = async () => {
//   try {
//     const { data } = await subMerchantInstance.post('/create-subMerchant', body);

//     console.log(data.status);
//   } catch (error) {
//     console.error(error.response);
//   }
//   setLoading(false);
// };
