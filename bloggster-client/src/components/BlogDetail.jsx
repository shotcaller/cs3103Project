import { Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from 'react-router'
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';
import { AuthContext } from '../utils/AuthContext';
import { LikeButton } from './LikeButton';

export const BlogDetail = () => {
    const state = useLocation()
    const { setUserId, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(state.state)
    if(!state.state){
        navigate('/')
    }
    const blogData = state.state || {}
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    async function fetchComments() {
        const res = await axios.get(`${BACKEND_URL}/blogs/${blogData.blogId}/comment`)
        if(res.statusText=='OK'){
            setComments(res.data.comments)
        }
    }
    useEffect(() => {
       fetchComments()
    },[])

    const postComment = async () => {
        if(newComment.length!=0){
            const res = await axios.post(`${BACKEND_URL}/blogs/${blogData.blogId}/comment`, {content: newComment})
            if(res.status==200 || res.status==201){
                //Success comment msg
                fetchComments()
                setComments('')
            } else {
                //Error for not able to add comment
            }
        } else {
            //Error for empty comment
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
            <LikeButton blogId={blogData.blogId} userLiked={blogData.userLiked} likeCount={blogData.likeCount} />
                
                <IconButton>
                    <CommentIcon />
                </IconButton>
                <Typography variant='caption'>
                    {blogData.commentCount}
                </Typography>
                <TextField value={newComment} onChange={(e) => setNewComment(e.target.value)} label="Add a commnent" fullWidth />
                <IconButton onClick={postComment}>
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
