import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ blogId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://cs3103.cs.unb.ca/blogs/${blogId}/comment`, { content });
            alert ("Comment successfully added!");
            setContent('');
            window.location.reload();
        }
        catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    
    return (
       <form onSubmit={handleSubmit}>
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add comment"
        required
        />
        <button type="submit">Submit</button>
       </form>
    );
};

export default CommentForm;
