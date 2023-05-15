import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';

// @mui
import { Box, List, ListItemText } from '@mui/material';
import { getCredentials } from '../../utils/checkAuth';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ ...other }) {
  const { user } = getCredentials();
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        <NavItem title={'dashboard'} path={'/dashboard/app'} icon={'ic_analytics.svg'} info={'dashboard'} />
        <NavItem
          title={user === 'merchant' ? 'sub-merchant' : user === 'super-admin' ? 'merchants' : 'default-merchant'}
          path={
            user === 'merchant'
              ? '/dashboard/sub-merchants'
              : user === 'super-admin'
              ? '/dashboard/merchants'
              : '/dashboard/default-merchant'
          }
          icon={'ic_user.svg'}
        />
        {user === 'super-admin' && (
          <NavItem title={'Create Merchant'} path={'/dashboard/onboard'} icon={'ic_user.svg'} />
        )}
        <NavItem
          title={user && 'logout'}
          path={user === 'merchant' ? '/logout' : '/super-admin/login'}
          icon={'ic_lock.svg'}
        />
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.string,
};

function NavItem({ title, path, icon }) {
  const iconPath = `/assets/icons/navbar/${icon}`;
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        color: 'white',
        '&.active': {
          color: 'white',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {icon && <StyledNavItemIcon src={iconPath} alt={title} />}

      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  );
}
