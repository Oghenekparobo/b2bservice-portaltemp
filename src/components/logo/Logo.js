import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { Box, Link } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, sx }) => {
  const logo = (
    <Box component="img" src="/assets/VAS2Nets-Logo.png" sx={{ width: 70, height: 50, cursor: 'pointer', ...sx }} />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
