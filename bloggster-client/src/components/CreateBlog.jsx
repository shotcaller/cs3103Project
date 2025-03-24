import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { BACKEND_URL } from '../utils/settings'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router'

export const CreateBlog = () => {
    const [titleField, setTitleField] = useState('')
    const [contentField, setContentField] = useState('')

    const onTitleChange = (e) => {
        setTitleField(e.target.value)
    }

    const onContentChange = (e) => {
        setContentField(e.target.value)
    }

    const onSubmit = async () => {

        const res = await axios.post(`${BACKEND_URL}/blogs`, {title: titleField, content: contentField }, {withCredentials: true})
        if(res.statusText!='OK'){

        }
        console.log(res, titleField, contentField)
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
                Create a Blog 
            </Typography>
        </Box>

        <TextField variant='outlined' label='Title' fullWidth margin='dense' value={titleField} onChange={e=>onTitleChange(e)} sx={{mb: 3}}/>
        <TextField variant='outlined' label='Content' fullWidth multiline margin='dense' minRows={10} value={contentField} onChange={e=>onContentChange(e)} sx={{ mb: 3}}  />

        <Button variant='contained' onClick={onSubmit}>Create</Button>
        <Button variant='outlined' style={{ marginLeft: '5%'}}><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>Cancel</Link></Button>

    </>
  )
}
