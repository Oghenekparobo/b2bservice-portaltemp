import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';
import { getCredentials } from '../../../utils/checkAuth';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';

const NAV_WIDTH = 280;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { user } = getCredentials();
  const { pathname } = useLocation();
  const remValue = 2; // Equivalent of 2rem
  const fontSize = 16; // Default font size in pixels
  const padding = `${remValue * fontSize}px`;

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 13, display: 'inline-flex' }}>
        <img
          src="/assets/VAS2Nets-Logo.png"
          alt="login"
          style={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            width: '230px', // Adjust the width as per your requirement
            height: 'auto', // Adjust the height proportionally based on the width
            padding, // Set the calculated padding-top value
          }}
        />
      </Box>

      <NavSection data={navConfig} />

      {/* <Box sx={{ flexGrow: 1 }} /> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        variant={isDesktop ? 'permanent' : 'temporary'}
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: user === 'merchant' ? '#cc0033' : 'Crimson',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            borderRightStyle: isDesktop ? 'dashed' : 'none',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
