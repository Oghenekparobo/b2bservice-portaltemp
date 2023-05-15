import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Card, Container, Typography, Box } from '@mui/material';
import { UpdateForm } from '../sections/@dashboard/form';
import { CheckAuthorization, getCredentials } from '../utils/checkAuth';

// components

// --------------------------------------------------------------------

export default function Update() {
  const { user } = getCredentials();
  const navigate = useNavigate();

  useEffect(() => {
    if (!CheckAuthorization() && user === 'super-admin') {
      navigate('/super-admin/login', { replace: true });
    } else if (!CheckAuthorization() && user === 'merchant') {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);
  return (
    <>
      <Helmet>
        <title> Update bMerchants </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {user === 'merchant' ? 'Update Sub Merchant ' : ' Create New Merchants'}
        </Typography>

        <Card>
          <Box p={6}>
            <UpdateForm />
          </Box>
        </Card>
      </Container>
    </>
  );
}
