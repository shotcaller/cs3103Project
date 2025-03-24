import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';


const Menubar = (props) => {

  let auth = props.auth;

  const dummyLogin = async () => {
    let username = 'newtest6'
    let password = 'password'

    const res = await axios.post(`${BACKEND_URL}/login`, { username, password})
    if(res.statusText!='OK'){
      console.log(res.data.message);
    }
    else {
      //LoggedIn 
      props.setAuthMenu(true)
    }
  }
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    Bloggster
                </Typography>
                {
                  auth ? (
                    <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>

                  ) : <Button variant='outlined' onClick={dummyLogin} color='inherit'>Login / Register</Button>
                }
            </Toolbar>
        </AppBar>
        <Toolbar></Toolbar>
    </Box>
    
  )
}

export default Menubar