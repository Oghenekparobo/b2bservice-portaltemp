import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Card, Container, Typography, Box } from '@mui/material';
import { UpdateForm } from '../sections/@dashboard/form';
import { CheckAuthorization } from '../utils/checkAuth';

export default function Update() {
  const { user, token } = CheckAuthorization();
  const navigate = useNavigate();
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    if (isRedirect) {
      navigate('/super-admin/login');
    }
    if (!token && user === 'super-admin') {
      navigate('/super-admin/login');
    } else if (!token && user === 'merchant') {
      navigate('/login');
    }

    if (!token) {
      navigate('/login');
    }
  }, [navigate, token, user, isRedirect]);
  return (
    <>
      <Helmet>
        <title> Update bMerchants </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {user === 'super-admin' ? 'Update Merchant ' : setIsRedirect(true)}
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
