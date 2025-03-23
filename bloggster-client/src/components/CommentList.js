import React, { useEffect, useState } from 'react';
import axios from 'axios'

const CommentList = ({ blogId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://cs3103.cs.unb.ca:8033/blogs/${blogId}/comment`)
           .then(response => setComments(response.data.comments))
           .catch(error => console.error("Error getting comments:", error));
    }, [blogId]);

    return (
        <ul>
            {comments.map(comment => (
                <li key={comment.id}>
                    <p>{comment.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;