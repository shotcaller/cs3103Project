import { Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from 'react-router'
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';

export const BlogDetail = () => {
    const state = useLocation()
    const navigate = useNavigate()
    console.log(state.state)
    if(!state.state){
        navigate('/')
    }
    const blogData = state.state || {}
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function fetchComments() {
            const res = await axios.get(`${BACKEND_URL}/blogs/${blogData.blogId}/comment`)
            if(res.statusText=='OK'){
                setComments(res.data.comments)
            }
        }
       fetchComments()
    },[])
  return (
    <>
        <Box sx={{ mt: 2, mb: 2}}>
        <Link to='/' color='inherit'>
            <IconButton size='large' >
                <ArrowBackIcon />
            </IconButton>
            </Link>
            <Typography variant='h4' component='span' >
                Blog  #{blogData.blogId} 
            </Typography>
        </Box>
        <Card variant='outlined'>
            <CardHeader title={blogData.title} subheader={`~ by ${blogData.authorUsername}`}/>
            <Divider />
            <CardContent>
                <Typography>
                    {blogData.content}
                </Typography>
            </CardContent>
            <CardActions>
            <IconButton>
                    <FavoriteIcon sx={{ color: `${blogData.userLiked?'red':'inherit'}` }} /> 
                </IconButton>
                <Typography variant='caption'>
                    {blogData.likeCount}
                </Typography>
                <IconButton>
                    <CommentIcon />
                </IconButton>
                <Typography variant='caption'>
                    {blogData.commentCount}
                </Typography>
                <TextField label="Add a commnent" fullWidth />
                <IconButton>
                    <SendIcon color='primary' />
                </IconButton>
            </CardActions>
        </Card>

        <Card sx={{ mt: 3}}>
            <CardHeader title='Comments' />
            <Divider />
            <CardContent>
                <List>
                    {comments.length>0 ? comments.map((comment) => (
                        <ListItem  alignItems='flex-start' key={comment.commentId}>
                            <ListItemText
                                primary={comment.userName}
                                secondary={comment.content} />
                        </ListItem>
                    )): 
                    <Typography variant='subtitle2'>No comments for this blog! </Typography>}
                </List>
            </CardContent>
        </Card>
    </>
  )
}
