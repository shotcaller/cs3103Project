import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/settings'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router'
import { LoaderContext } from '../utils/LoaderContext';
import { MessageBoxContext } from '../utils/MessageBarContent';

export const CreateBlog = () => {
    const { bid } = useParams()
    const [titleField, setTitleField] = useState('')
    const [contentField, setContentField] = useState('')
    const { setLoader } = useContext(LoaderContext)
    const { setMessageBox } = useContext(MessageBoxContext)

    async function getBlog(blogId) {
        setLoader(true)
        try{
            const res = await axios.get(`${BACKEND_URL}/blogs/${blogId}`)
            setTitleField(res.data.blog[0].title)
            setContentField(res.data.blog[0].content)

        } catch (e) {
            console.log(e)
            let msg = e?.response?.data?.message
            setMessageBox({ open: true, severity: 'error', message: msg?msg:'Error while fetching blog details.' })


        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        if(bid)
            getBlog(bid)
    },[])

    const navigate = useNavigate()

    const onTitleChange = (e) => {
        setTitleField(e.target.value)
    }

    const onContentChange = (e) => {
        setContentField(e.target.value)
    }

    const onSubmit = async () => {
        if(titleField.length==0 && contentField.length==0){
            //error 
            return;
        }
        setLoader(true)
        
        try {
            const res = bid?
            await axios.put(`${BACKEND_URL}/blogs/${bid}`, {title: titleField, content: contentField }, {withCredentials: true})
        :
        await axios.post(`${BACKEND_URL}/blogs`, {title: titleField, content: contentField }, {withCredentials: true})
        //Success MEssage
        setMessageBox({ open: true, severity: 'success', message: `Blog ${bid?'updated':'created'} successfully.` })
        navigate('/')
        } catch (e) {
            console.log(e)
            let msg = e?.response?.data?.message
            setMessageBox({ open: true, severity: 'error', message: msg?msg:'An error occurred while creating/editing the blog.'})

        } finally {
            setLoader(false)
        }
        
    }

  return (
    <>
        <Box sx={{ mt: 2, mb: 2}}>

            <IconButton size='large' onClick={() => navigate('/')} >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant='h4' component='span' >
                {`${bid?'Edit':'Create'}`} a Blog 
            </Typography>
        </Box>

        <TextField variant='outlined' label='Title' fullWidth margin='dense' value={titleField} onChange={e=>onTitleChange(e)} sx={{mb: 3}}/>
        <TextField variant='outlined' label='Content' fullWidth multiline margin='dense' minRows={10} value={contentField} onChange={e=>onContentChange(e)} sx={{ mb: 3}}  />

        <Button variant='contained' onClick={onSubmit}>{`${bid?'Edit':'Create'}`}</Button>
        <Button variant='outlined' onClick={() => navigate('/')} style={{ marginLeft: '5%'}}>Cancel</Button>

    </>
  )
}
