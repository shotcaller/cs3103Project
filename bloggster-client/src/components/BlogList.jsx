import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/settings';
import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect (() => {
        axios.get(`${BACKEND_URL}/blogs`,{headers: {'Access-Control-Allow-Origin': '*'}})
           .then(response => setBlogs(response.data.blogs))
           .catch(error => console.error("Error getting blogs:", error));
    }, []);

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

const Blog = ({ blogData }) => {
    console.log(blogData)
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
                <Button size='small'>
                    <Link to="/read-blog" style={{ color: 'inherit', textDecoration: 'none' }} state={blogData}>
                    Read More </Link></Button>
                <Typography style={{marginLeft: 'auto'}} variant='subtitle' color='text.secondary'>
                    {blogData.createdAt}
                </Typography>
            </CardActions>
        </Card>
    </Box>

    )
}

export default BlogList;