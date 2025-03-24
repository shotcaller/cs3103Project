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

function App() {
  const [auth, setAuth] = useState(false)
  axios.defaults.withCredentials = true
  const setAuthMenu = (authValue) => {
    setAuth(authValue);
  }
  return (
    <>
    <BrowserRouter>
    <Menubar auth={auth} setAuthMenu={setAuthMenu} />
      <Box sx={{ flexGrow: 1}}>
      <Grid2 container spacing={2} >
          <Grid2 size={{ xs: 0, md: 2}}>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8}}>
            <Routes>
              <Route path='/' element={<BlogList/>} />
              <Route path='/create-blog' element={<CreateBlog />} />
              <Route path='/read-blog' element={<BlogDetail />} />
            </Routes>
          </Grid2>

          <Grid2 size={{ xs: 0, md: 2}}>
          </Grid2>
      </Grid2>
      </Box>
      
    </BrowserRouter>
      
    </>
  )
}

export default App
