import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Grid, Container, Typography, Card, Button } from '@mui/material';
import { useEffect } from 'react';
import { AppWidgetSummary, MerchantTable, TransactionsTable } from '../sections/@dashboard/app';
import Iconify from '../components/iconify';

import { CheckAuthorization, getCredentials } from '../utils/checkAuth';

export default function DashboardAppPage() {
  const { user, username } = getCredentials();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['airtime-balance'],
    queryFn: async () => {
      const response = await fetch('http://141.144.237.21:3000/fetch-dataBalance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'parallex' }),
      });
      const data = await response.json();
      return data;
    },
  });

  console.log('Airtime balance data:', data, typeof username, username);

  useEffect(() => {
    if (!user) {
      navigate('/super-admin/login', { replace: true });
    }
    if (!CheckAuthorization() && user === 'super-admin') {
      navigate('/super-admin/login', { replace: true });
    } else if (!CheckAuthorization() && user === 'merchant') {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          {username}
        </Typography>

        <Grid container spacing={1} justifyContent="space-between">
          {user === 'merchant' ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Airtime" total={1000000} color="info" icon={'ant-design:apple-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Data" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="B2B" total={23400000} color="error" icon={'ant-design:bug-filled'} />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <Link to="/dashboard/merchants">
                <AppWidgetSummary title="Merchants" total={24} icon={'ant-design:android-filled'} />
              </Link>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'right', marginTop: '2rem', marginBottom: '2rem' }}>
          {user === 'merchant' ? (
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', padding: '16px' }}>
              Transactions
            </Typography>
          ) : (
            <Link to="/dashboard/onboard">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Merchant
              </Button>
            </Link>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'left', marginTop: '2rem', marginBottom: '2rem' }}>
          {user === 'merchant' && (
            <Link to="/dashboard/onboard">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Sub-Merchant
              </Button>
            </Link>
          )}
        </Grid>

        <Card sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '500px', padding: '4rem' }}>
          {user === 'merchant' ? <TransactionsTable /> : <MerchantTable />}
        </Card>
      </Container>
    </>
  );
}
