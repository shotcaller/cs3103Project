import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, IconButton, Switch, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import { BACKEND_URL } from '../utils/settings'
import { Blog } from './BlogList'
import { AuthContext } from '../utils/AuthContext'

export const Profile = () => {
    const params = useParams()

    const { userId } = useContext(AuthContext)

    const [userData, setUserData] = useState({})
    const [updateSwitch, setUpdateSwitch] = useState(false)
    const [newUsername, setNewUserName] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [userBlogs, setUserBlogs] = useState([])


    async function getUserDetails(userId) {
        const res = await axios.get(`${BACKEND_URL}/users/${userId}`)
        if(res.status!=200){
            //Error 
        }
        else {
            setUserData(res.data.users[0])
        }
    }

    async function getUserBlogs(userId) {
        const res = await axios.get(`${BACKEND_URL}/users/${userId}/blogs`)
        if(res.status!=200){
            //Error
        }
        else {
            setUserBlogs(res.data.blogs)
        }

    }
    useEffect(() => {
        getUserDetails(params.id)
        getUserBlogs(params.id)
    },[])

    const updateProfile = async () => {
        if(newUsername.length==0 && currentPassword.length==0 && newPassword.length==0){
            //Empty fields
            return;
        }
        let updateRequest = {
            "username": newUsername.length>0?newUsername:null,
            "currentPassword": (currentPassword.length>0 && newPassword.length>0)?currentPassword:null,
            "newPassword": (currentPassword.length>0 && newPassword.length>0)?newPassword:null
        }
        
        Object.keys(updateRequest).forEach(key => {
            if(updateRequest[key] == null)
                delete updateRequest[key]
        }) 

        const res = await axios.put(`${BACKEND_URL}/users`, updateRequest)
        if(res.status!=201){
            //error
        } else {
            //Profile successful updated
            setNewUserName('')
            setCurrentPassword('')
            setNewPassword('')
            getUserDetails(params.id)
            getUserBlogs(params.id)

        }

    }
  return (
    <>
        <Box sx={{ mt: 2, mb: 2}}>
            <Link to='/' color='inherit'>
            <IconButton size='large' >
                <ArrowBackIcon />
            </IconButton>
            </Link>
            <Typography variant='h4' component='span' >
             Profile 
            </Typography> 
        </Box>
        <Box>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h5'>User ID: {userData.userId?userData.userId:''}</Typography>
                    <Typography variant='h5'>User Name: {userData.userName?userData.userName:''}</Typography>
                    <Typography variant='h5'>User Email: {userData.email?userData.email:''}</Typography>
                </CardContent>
                <CardActions>
                    {(userId == params.id) && <FormControlLabel control={<Switch checked={updateSwitch} onChange={(e)=> setUpdateSwitch(e.target.checked)} />} label="Update Profile"/>}
                </CardActions>
            </Card>
        </Box>

        {updateSwitch && <Box sx={{ mt: 2, mb: 2}}>
            <Card variant='outlined'>
                <CardHeader title='Update Profile Details' />
                <CardContent>
                    <TextField fullWidth value={newUsername} label='New Username' onChange={(e) => setNewUserName(e.target.value)} sx={{ mb: 2}} />
                    <TextField fullWidth type='password' value={currentPassword} label='Current Password' onChange={(e) => setCurrentPassword(e.target.value)} sx={{ mb: 2}} />
                    <TextField fullWidth type='password' value={newPassword} label='New Password' onChange={(e) => setNewPassword(e.target.value)} sx={{ mb: 2}} />
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={updateProfile}>Update</Button>
                </CardActions>
            </Card>
        </Box>}
        <Divider />
        <Typography sx={{ mb: 2, mt: 2}} variant='h5'>Blogs: </Typography>

        {userBlogs.length>0 ? userBlogs.map((blog) => (
            <Blog blogData={blog} editFlag={true} />
        ))
        : 
        <Typography variant='caption'>No blogs by this user!</Typography>}


    </>
  )
}
