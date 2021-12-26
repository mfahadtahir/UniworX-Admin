import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const RoleBasedPostion = {
  0: 'Unauth',
  5: 'Member',
  10: 'Coordinator',
  20: 'Deputies',
  25: 'Co Head',
  30: 'Head of House',
  35: 'Co Director',
  40: 'President',
  50: 'Faculty Co head',
  60: 'Faculty Head',
  70: 'Admin',
  90: 'Director'
};

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(80);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const getNavSection = () => {
    let config;
    if (user) {
      if (user.roles >= 70) {
        config = sidebarConfig.admin;
      } else if (user.roles >= 50) {
        config = sidebarConfig.teacher;
      } else if (user.roles >= 35) {
        config = sidebarConfig.president;
      } else if (user.roles >= 25) {
        config = sidebarConfig.head;
      } else {
        config = sidebarConfig.unauthorized;
      }
    } else {
      config = sidebarConfig.unauthorized;
    }
    return <NavSection navConfig={config} />;
  };
  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          {/* <Logo /> */}
          <img src="http://nu.edu.pk/Content/images/NU-logo.jpg" alt="" />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user ? user.name : null}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user ? RoleBasedPostion[user.roles] : null} ~ {user ? user.society_name : null}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      {getNavSection()}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
