import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Slide } from '@mui/material';
import { reset } from '../utils/checkAuth';
// hooks
import useResponsive from '../hooks/useResponsive';

// sections
import { LoginForm } from '../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  // extracting url to determine admin type
  const { pathname } = useLocation();

  // log "user-type"
  const adminType = pathname.split('/')[1];

  console.log(adminType);

  const mdUp = useResponsive('up', 'md');
  const remValue = 2;
  const fontSize = 16;
  const padding = `${remValue * fontSize}px`;

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <StyledRoot>
        <img
          src="/assets/VAS2Nets-Logo.png"
          alt="login"
          style={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            width: '200px', // Adjust the width as per your requirement
            height: 'auto', // Adjust the height proportionally based on the width
            padding, // Set the calculated padding-top value
          }}
        />
        {mdUp && adminType !== 'super-admin' && (
          <Slide direction="left" in timeout={500}>
            <StyledSection>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Merchants
              </Typography>
              <img src="/assets/illustrations/illustration_login.png" alt="login" />
            </StyledSection>
          </Slide>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {adminType === 'super-admin' ? '' : ''}
              {!mdUp && 'Welcome!'}
            </Typography>
            <LoginForm adminType={adminType} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
