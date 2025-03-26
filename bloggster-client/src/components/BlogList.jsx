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

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const { auth } = useContext(AuthContext)
    useEffect (() => {
        axios.get(`${BACKEND_URL}/blogs`)
           .then(response => {
            setBlogs(response.data.blogs)
           })
           .catch(error => console.error("Error getting blogs:", error));
    }, [auth]);

    return (
        <div>
            <Box sx={{ mt: 2, mb: 2, display: 'flex'}}>
            <Typography variant='h4'component='span' sx={{ mb: 2, mt: 2}}>
                Blogs    
            </Typography>
            <Button variant='contained' startIcon={<CreateIcon />} 
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
                    ~ by {blogData.authorUsername}
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