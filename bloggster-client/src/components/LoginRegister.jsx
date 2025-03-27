import { Box, Button, Paper, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TabContext, TabPanel } from '@mui/lab'
import axios from 'axios'
import { BACKEND_URL } from '../utils/settings'
import { AuthContext } from '../utils/AuthContext'
import { useNavigate } from 'react-router'
import { LoaderContext } from '../utils/LoaderContext'
import { MessageBoxContext } from '../utils/MessageBarContent'
export const LoginRegister = () => {
    const [loginTab, setLoginTab] = useState(1)

    const handleTabChange = (e, newValue) => {
        setLoginTab(newValue)
    }
  return (
    <>
    <TabContext value={loginTab}>
      <Box>
        <Paper elevation={2}>
            <Tabs centered value={loginTab} onChange={handleTabChange} variant='fullWidth'>
                <Tab label='Login' value={1} />
                <Tab label='Register' value={2} />
            </Tabs>
            <TabPanel value={1}>
                <Login />
            </TabPanel>
            <TabPanel value={2}>
                <Register />
            </TabPanel>
        </Paper>
    </Box>  
    </TabContext>
    </>
  )
}

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('') 
    const { setAuth, setUserId } = useContext(AuthContext)
    const navigate = useNavigate()
    const { setLoader } = useContext(LoaderContext)
    const { setMessageBox } = useContext(MessageBoxContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        try{
            const res = await axios.post(`${BACKEND_URL}/login`, {username: userName, password })
            setMessageBox({ open: true, severity: 'success', message: 'Logged in successfully!' })
            setAuth(true)
            setUserId(res.data.userId)
            navigate('/')
        } catch (e) {
            console.log(e)
            let msg = e?.response?.data?.message
            setMessageBox({ open: true, severity: 'error', message: msg?msg:'An error occured while logging in.' })
        } finally {
            setLoader(false)
        }
    }

    return (
        <Box sx={{ mt: 2, mb: 2}} onSubmit={handleSubmit} component='form'>
            <TextField label='Username' required fullWidth onChange={(e) => setUserName(e.target.value)} value={userName} sx={{ mb:2}} />
            <TextField label='Password' required fullWidth onChange={(e) => setPassword(e.target.value)} type='password' value={password} sx={{ mb: 2}}/>
            <Button variant='contained' type='submit'>Login</Button>
        </Box>
    )
}

const Register = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('') 
    const [email, setEmail] = useState('')
    const { setLoader } = useContext(LoaderContext)
    const { setMessageBox } = useContext(MessageBoxContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        try{
            const res = await axios.post(`${BACKEND_URL}/register`, {username: userName, password, email})
            setMessageBox({ open: true, severity: 'success', message: res.data.message })
            setUserName('')
            setPassword('')
            setEmail('')

        } catch (e) {
            let msg = e?.response?.data?.message
            setMessageBox({ open: true, severity: 'error', message: msg?msg:'An error occured while registering new user.' })

        } finally {
            setLoader(false)
        }

    }

    return (
        <Box sx={{ mt: 2, mb: 2}} onSubmit={handleSubmit} component='form'>
            <TextField label='Username' required fullWidth onChange={(e) => setUserName(e.target.value)} value={userName} sx={{ mb:2}} />
            <TextField label='Email' required fullWidth onChange={(e) => setEmail(e.target.value)} value={email} type='email' sx={{ mb:2}} />
            <TextField label='Password' required fullWidth onChange={(e) => setPassword(e.target.value)} type='password' value={password} sx={{ mb: 2}}/>
            <Button variant='contained' type='submit'>Register</Button>
        </Box>
    )

}
