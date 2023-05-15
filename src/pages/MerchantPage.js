import React from 'react';
import { Typography, Card } from '@mui/material';
import { MerchantTable } from '../sections/@dashboard/app';

const MerchantPage = () => (
  <>
    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', padding: '16px' }}>
      Merchants
    </Typography>
    <Card sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '500px', padding: '4rem' }}>
      <MerchantTable />
    </Card>
  </>
);

export default MerchantPage;
