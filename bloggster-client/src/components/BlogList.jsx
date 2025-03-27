import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';
import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router';
import { AuthContext } from '../utils/AuthContext';
import { LikeButton } from './LikeButton';
import { LoaderContext } from '../utils/LoaderContext';
import { MessageBoxContext } from '../utils/MessageBarContent';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const { auth } = useContext(AuthContext)
    const { setLoader } = useContext(LoaderContext)
    const { setMessageBox } = useContext(MessageBoxContext)
    useEffect (() => {
        setLoader(true)
        axios.get(`${BACKEND_URL}/blogs`)
           .then(response => {
            setBlogs(response.data.blogs)
           })
           .catch(error => {
            console.error("Error getting blogs:", error)
            let msg = error?.response?.data?.message
            setMessageBox({ open: true, severity: 'error', message: msg?msg:'Error while fetching blogs.'})
        }).finally(() => setLoader(false));
    }, [auth]);

    return (
        <div>
            <Box sx={{ mt: 2, mb: 2, display: 'flex'}}>
            <Typography variant='h4'component='span' sx={{ mb: 2, mt: 2}}>
                Blogs    
            </Typography>
            <Button variant='contained' startIcon={<CreateIcon />} disabled={!auth} 
            style={{ marginLeft: 'auto',  height: 'min-content', justifyItems: 'center'}}>
                <Link to="/create-blog" style={{ textDecoration: 'none', color: 'inherit'}}>
                    Create
                </Link>
            </Button>
            </Box>
            
            {blogs.map((blog) => (
                <Blog blogData={blog} />
            ))}
        </div>
    );
};

export const Blog = ({ blogData, editFlag }) => {
    return (
        <Box sx={{ flexGrow: 1, mb: 2}}>
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='h5' component='div'>
                   #{blogData.blogId} {blogData.title}
                </Typography>
                
                <Typography gutterBottom variant='body2' color='text.secondary'>
                    ~ by <Link to={`/profile/${blogData.authorId}`} style={{ color: 'inherit'}}>
                    {blogData.authorUsername}</Link>
                </Typography>
                
                <Typography variant='body2' >
                    {blogData?.content}
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
                <Link to="/read-blog" style={{ color: 'inherit', textDecoration: 'none' }} state={blogData}>
                <Button size='small'>
                    
                    Read More </Button></Link>
                <Button size='small'>
                    {
                        editFlag && <Link to={`/edit-blog/${blogData.blogId}`}>
                            <Button variant='contained' size='small' >
                                Edit
                            </Button>
                        </Link>
                    }

                </Button>
                <Typography style={{marginLeft: 'auto'}} variant='subtitle' color='text.secondary'>
                    {blogData.createdAt}
                </Typography>
            </CardActions>
        </Card>
    </Box>

    )
}

export default BlogList;