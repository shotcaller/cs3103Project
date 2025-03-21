import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ blogId }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        try {
            await axios.post(`http://cs3103.cs.unb.ca:8033/blogs/${blogId}/like`);
            setLiked(true);
            alert("Blog successfully liked!");
        }
        catch(error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleUnlike = async () => {
        try {
            await axios.post(`http://cs3103.cs.unb.ca:8033/blogs/${blogId}/unlike`);
            setLiked(false);
            alert("Blog successully unliked!");
        }
        catch (error){
            console.error("Error unliking blog:", error);
        }
    };

    return (
        <div>
            {liked ? (
                <button onClick={handleUnlike}>Unlike</button>
            ) : (
                <button onClick={handleLike}>Like</button>
            )}
        </div>
    );
};

export default LikeButton;
