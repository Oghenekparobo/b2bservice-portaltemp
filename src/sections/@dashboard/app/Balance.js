import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Balance = () => {
  const { service } = useParams();

  // Replace this with the actual balance data
  const balance = 1000;

  let cardBackgroundColor = '';
  let serviceBackgroundColor = '';
  let serviceColor = '';

  if (service === 'airtime') {
    cardBackgroundColor = 'lightgreen';
    serviceBackgroundColor = 'blue';
    serviceColor = 'white';
  } else if (service === 'data') {
    cardBackgroundColor = 'lightgreen';
    serviceBackgroundColor = 'green';
    serviceColor = 'white';
  } else if (service === 'b2b') {
    cardBackgroundColor = 'darkcyan';
    serviceBackgroundColor = 'blue';
    serviceColor = 'white';
  }

  return (
    <Box height="50vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontStyle: 'italic',
          backgroundColor: serviceBackgroundColor,
          color: serviceColor,
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        {service.toUpperCase()}
      </Typography>

      <Card
        sx={{
          width: '80%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid blue',
          backgroundColor: cardBackgroundColor,
        }}
      >
        <CardContent>
          <Typography variant="h1" align="center" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
            {balance.toLocaleString()} &#8358;
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Balance;
