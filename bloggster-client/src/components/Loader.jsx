import { Backdrop, CircularProgress } from '@mui/material'
import React, { useState } from 'react'

export const Loader = ({toggleLoader}) => {

  return (
    <>
        <Backdrop
            sx={(theme) =>({color: '#fff', zIndex: theme.zIndex.drawer + 1})} open={toggleLoader}>
            <CircularProgress color='inherit' />
        </Backdrop>
    </>
  )
}
