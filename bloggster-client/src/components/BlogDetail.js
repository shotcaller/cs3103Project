import React, { useEffect, useCase } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import CommentForm from '.CommentForm';
import LikeButton from '.LikeButton';

const BlogDetail = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect (() => {
        axios.get(`http://cs3103.cs.unb.ca:8033/blogs/${blogId}`)
           .then(response => setBlog(response.data.blog))
           .catch(error => console.error("Error getting blog:", error));
    }, [blogId]);

    if(!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <LikeButton blogId={blogId} />
            <h2>Comments</h2>
            <CommentList blogId={blogId} />
            <CommentForm blogId={blogId} />
        </div>
    );
};

export default BlogDetail;