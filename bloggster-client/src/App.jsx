import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menubar from './components/Menubar'
import { Box, Grid2 } from '@mui/material'
import BlogList from './components/BlogList'
import  { BrowserRouter, Route, Routes } from 'react-router'
import { CreateBlog } from './components/CreateBlog'
import { BlogDetail } from './components/BlogDetail'
import axios from 'axios'
import { AuthContext } from './utils/AuthContext'
import { Profile } from './components/Profile'
import { LoginRegister } from './components/LoginRegister'
import { LoaderContext } from './utils/LoaderContext'
import { Loader } from './components/Loader'
import { MessageBoxContext } from './utils/MessageBarContent'
import { MessageBox } from './components/MessageBox'

function App() {
  const [auth, setAuth] = useState(false)
  const [userId, setUserId] = useState(0)
  const [loader, setLoader] = useState(false)
  const [messageBox, setMessageBox] = useState({ open: false, severity: '', message: ''})
  axios.defaults.withCredentials = true
  const setAuthMenu = (authValue) => {
    setAuth(authValue);
  }
  return (
    <>
    <AuthContext.Provider value={{ auth, setAuth, userId, setUserId}}>
      <LoaderContext.Provider value={{ loader, setLoader}}>
        <MessageBoxContext.Provider value={{ setMessageBox }}>
    <BrowserRouter>
    <Menubar />
      <Box sx={{ flexGrow: 1}}>
      <Grid2 container spacing={2} >
          <Grid2 size={{ xs: 0, md: 2}}>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8}}>
            <Routes>
              <Route path='/' element={<BlogList/>} />
              <Route path='/create-blog' element={<CreateBlog />} />
              <Route path='/read-blog' element={<BlogDetail />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/edit-blog/:bid' element={<CreateBlog />} />
              <Route path='signin' element={<LoginRegister />} />
            </Routes>
          </Grid2>

          <Grid2 size={{ xs: 0, md: 2}}>
          </Grid2>
      </Grid2>
      </Box>
      
    </BrowserRouter>
    <Loader toggleLoader={loader}  />
    <MessageBox open={messageBox.open} severity={messageBox.severity} message={messageBox.message} 
    handleClose={()=>setMessageBox({open: false, severity: '', message: ''})} />
    </MessageBoxContext.Provider>
    </LoaderContext.Provider>
    </AuthContext.Provider>
      
    </>
  )
}

export default App
