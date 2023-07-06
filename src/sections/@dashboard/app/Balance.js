import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Container } from '@mui/material';
import TransactionsTable from './TransactionsTable';

const Balance = () => {
  const { service } = useParams();

  return (
    <Container maxWidth="xl">
      <Typography variant="h5">{service.toUpperCase()} TRANSACTIONS</Typography>

      <Card sx={{ padding: '1rem' }}>
        <TransactionsTable />
      </Card>
    </Container>
  );
};

export default Balance;
