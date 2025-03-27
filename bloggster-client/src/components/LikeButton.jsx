import { IconButton, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { BACKEND_URL } from '../utils/settings'
import { MessageBoxContext } from '../utils/MessageBarContent'

export const LikeButton = ({ blogId, userLiked, likeCount }) => {
    const [liked, setLiked] = useState(Boolean(userLiked))
    const [count, setCount] = useState(likeCount)
    const { setMessageBox } = useContext(MessageBoxContext)
    //let liked = userLiked || false

    const likeCliked = async () => {
            let originalLikeValue = liked;
            let originalLikeCount = count;
            setLiked(originalLikeValue?false:true);
            try{
                const res = await axios.post(`${BACKEND_URL}/blogs/${blogId}/${originalLikeValue?'unlike':'like'}`)
                setCount(liked?(originalLikeCount-1):(originalLikeCount+1))


            } catch (e) {
                setLiked(originalLikeValue)
                let msg = e?.response?.data?.message
                setMessageBox({ open: true, severity: 'error', message: msg?msg:'Sorry! An error occured.'})

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
