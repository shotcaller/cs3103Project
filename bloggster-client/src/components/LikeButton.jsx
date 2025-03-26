import { IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { BACKEND_URL } from '../utils/settings'

export const LikeButton = ({ blogId, userLiked, likeCount }) => {
    const [liked, setLiked] = useState(Boolean(userLiked))
    const [count, setCount] = useState(likeCount)
    //let liked = userLiked || false

    const likeCliked = async () => {
            let originalLikeValue = liked;
            let originalLikeCount = count;
            setLiked(originalLikeValue?false:true);
            const res = await axios.post(`${BACKEND_URL}/blogs/${blogId}/${originalLikeValue?'unlike':'like'}`)
            if(res.status!=201){
                //Error while liking, revert to original value
                setLiked(originalLikeValue)
            }
            else{ 
                console.log(originalLikeValue,liked)
                setCount(liked?(originalLikeCount-1):(originalLikeCount+1))
            }
}
  return (
   <>
    <IconButton onClick={likeCliked} >
        <FavoriteIcon sx={{ color: `${liked?'red':'inherit'}` }}/>
    </IconButton>
    <Typography variant='caption'>
                    {count}
    </Typography>
   </>
  )
}
