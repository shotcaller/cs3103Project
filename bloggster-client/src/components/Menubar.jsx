import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';
import { AuthContext } from '../utils/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { MessageBoxContext } from '../utils/MessageBarContent';


const Menubar = (props) => {

  const { auth, userId, setAuth, setUserId } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { setMessageBox } = useContext(MessageBoxContext)


  useEffect(() => {
    async function getLoggedInUser() {
      const res = await axios.get(`${BACKEND_URL}/getUserId`)
      if(res.data.userId){
        setUserId(res.data.userId)
        setAuth(true)
      }
      else {
        setUserId(0)
        setAuth(false)
      }
    }
    getLoggedInUser()
  },[])

  const dummyLogin = async () => {
    let username = 'samething'
    let password = 'newpassword'

    const res = await axios.post(`${BACKEND_URL}/login`, { username, password})
    if(res.statusText!='OK'){
      console.log(res.data.message);
    }
    else {
      //LoggedIn 
      setAuth(true)
      setUserId(res.data.userId)
    
    }
  }
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileNavigate = () => {
    navigate(`/profile/${userId}`)
    handleClose()
  }

  const handleLogout = async () => {
    handleClose()
    try{
    const res = await axios.post(`${BACKEND_URL}/logout`)
    setMessageBox({ open: true, severity: 'success', message: 'Logged out successfully.'})
    setAuth(false)
    setUserId(0)
    navigate('/signin')
       
    } catch (e) {
      let msg = e?.response?.data?.message
      setMessageBox({ open:  true, severity: 'error', message: msg?msg:'An error occured while logging out.'})
    }
    
  }

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
                <MenuItem onClick={profileNavigate}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>

                  ) : <Button variant='outlined' onClick={() => navigate(`${location.pathname=='/signin'?'/':'/signin'}`)} color='inherit'>{location.pathname=='/signin'?'Blogs':'Login / Register'}</Button>
                }
            </Toolbar>
        </AppBar>
        <Toolbar></Toolbar>
    </Box>
    
  )
}

export default Menubar