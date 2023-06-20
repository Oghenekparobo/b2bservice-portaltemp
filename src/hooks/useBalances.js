import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const balanceFetch = axios.create({
  baseURL: 'http://141.144.237.21:3000',
});

export const useBalances = (username) => {
  const fetchAirtime = async () => {
    const { data } = await balanceFetch.post('/fetch-airtimeBalance', { username });
    return data;
  };
  const fetchData = async () => {
    const { data } = await balanceFetch.post('/fetch-dataBalance', { username });
    return data;
  };

  const fetchB2b = async () => {
    const { data } = await balanceFetch.post('/fetch-b2bBalance', { username });
    return data;
  };

  const airtimeQuery = useQuery({
    queryKey: ['airtime-balance'],
    queryFn: fetchAirtime,
  });

  const b2bQuery = useQuery({
    queryKey: ['b2b-balance'],
    queryFn: fetchB2b,
  });

  const dataQuery = useQuery({
    queryKey: ['data-balance'],
    queryFn: fetchData,
  });

  const { data: airtimeBalance, isLoading: airtimeLoading } = airtimeQuery;

  const { data: b2bBalance, isLoading: b2bLoading } = b2bQuery;

  const { data: dataBalance, isLoading: dataLoading } = dataQuery;

  return { airtimeBalance, airtimeLoading, b2bBalance, b2bLoading, dataBalance, dataLoading };
};
