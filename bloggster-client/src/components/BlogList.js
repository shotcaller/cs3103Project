import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect (() => {
        axios.get('http://cs3103.cs.unb.ca:8033/blogs')
           .then(response => setBlogs(response.data.blogs))
           .catch(error => console.error("Error getting blogs:", error));
    }, []);

    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;