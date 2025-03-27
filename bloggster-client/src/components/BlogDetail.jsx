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
import { MessageBoxContext } from '../utils/MessageBarContent';

export const BlogDetail = () => {
    const state = useLocation()
    const { setUserId, setAuth } = useContext(AuthContext)
    const { setMessageBox } = useContext(MessageBoxContext)
    const navigate = useNavigate()
    console.log(state.state)
    if(!state.state){
        navigate('/')
    }
    const blogData = state.state || {}
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    async function fetchComments() {
        try{
            const res = await axios.get(`${BACKEND_URL}/blogs/${blogData.blogId}/comment`)
            setComments(res.data.comments)

        } catch(e){
            console.log(e)
            setMessageBox({open: true, severity: 'error', message: 'Error while fetching comments.'})

        }
    }
    useEffect(() => {
       fetchComments()
    },[])

    const postComment = async () => {
        if(newComment.length!=0){
            try{
                const res = await axios.post(`${BACKEND_URL}/blogs/${blogData.blogId}/comment`, {content: newComment})
                setMessageBox({ open: true, severity: 'success', message: 'Comment added successfully.'})
                fetchComments()
                setComments('')
            } catch(e) {
                console.log(e)
                let message = e?.response?.data?.message
                setMessageBox({ open: true, severity: 'error', message: `${message? message:'Error while posting comment'}`})
            }
        } else {
            //Error for empty comment
            setMessageBox({ open: true, severity: 'warning', message: 'Comment cannot be empty.'})
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
