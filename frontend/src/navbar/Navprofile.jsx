import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {  MenuItem } from "@mui/material";


const drawerWidth = 240;

const navItems = [
  { title: 'Service', path: '/' },
  { title: 'Find Doctor', path: '/doctor' },
  { title: 'Pharmacy', path: '/pharmacy' },
  { title: 'Blog', path: '/blog' },
];

function NavProfile(props) {
  const { window, email } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    axios.post('http://localhost:3001/userDetailsbyEmail', { email: email })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleProfileMenuClose = (menuItem) => {
    setAnchorEl(null);
    if (menuItem === 'Profile') {
      navigate(`/profile/${email}`);
    } else if (menuItem === 'Logout') {
      axios.get('http://localhost:3001/logout') 
      .then(response => {
        alert("User logged out")
        console.log(response.data)
        navigate("/")
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        HINVENTORY
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={RouterLink} to={item.path}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav"
        sx={{
          backgroundColor: 'green',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            HINVENTORY
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.title} sx={{ color: '#fff' }} component={RouterLink} to={item.path}>
                {item.title}
              </Button>
            ))}
            <Button
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: '#fff' }}
            >
              {userData.name}
              {/* {userData.name.split(' ')[0]} */}
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleProfileMenuClose('')}
            >
              <MenuItem onClick={() => handleProfileMenuClose('Profile')}>Profile</MenuItem>
              <MenuItem onClick={() => handleProfileMenuClose('Logout')}>Logout</MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

NavProfile.propTypes = {
  window: PropTypes.func,
  email: PropTypes.string 
};

export default NavProfile;