import React from 'react';
import { Grid } from '@mui/material';
import Form from './Form';

export default function ProductList() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={12}>
        <Form />
      </Grid>
    </Grid>
  );
}
