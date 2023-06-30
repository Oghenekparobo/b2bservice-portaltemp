import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import { Grid, Container, Typography, Card, Button } from '@mui/material';
import { useEffect } from 'react';
import { useBalances } from '../hooks/useBalances';
import { AppWidgetSummary, MerchantTable, TransactionsTable } from '../sections/@dashboard/app';
import Iconify from '../components/iconify';
import customFetch from '../utils/http';
import { CheckAuthorization } from '../utils/checkAuth';

export default function DashboardAppPage() {
  const { user, username, token } = CheckAuthorization();
  const navigate = useNavigate();
  customFetch.setNavigation(navigate);
  const { airtimeBalance, airtimeLoading, b2bBalance, b2bLoading, dataBalance, dataLoading } = useBalances(username);

  useEffect(() => {
    if (!token && user === 'super-admin') {
      navigate('/super-admin/login');
    } else if (!token && user === 'merchant') {
      navigate('/login');
    }

    if (!token) {
      navigate('/login');
    }
  }, [navigate, user, token]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        {user === 'merchant' && (
          <Typography variant="h4" sx={{ mb: 1 }}>
            {username}
          </Typography>
        )}

        <Grid container spacing={1} justifyContent="space-between">
          {user === 'merchant' ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Airtime"
                  total={airtimeLoading ? 'loading...' : airtimeBalance?.balance ? airtimeBalance.balance : 0}
                  color="info"
                  icon={'ant-design:apple-filled'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Data"
                  total={dataLoading ? 'loading...' : dataBalance?.balance ? dataBalance.balance : 0}
                  color="warning"
                  icon={'ant-design:windows-filled'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="B2B"
                  total={b2bLoading ? 'loading...' : b2bBalance?.balance ? b2bBalance.balance : 0}
                  color="error"
                  icon={'ant-design:bug-filled'}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <span style={{ fontWeight: 'bold' }}>{username}</span>
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

        <Card sx={{ padding: '1rem' }}>{user === 'merchant' ? <TransactionsTable /> : <MerchantTable />}</Card>
      </Container>
    </>
  );
}
