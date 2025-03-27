import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export const MessageBox = ({ open, severity, message, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={severity} variant='filled' sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  )
}
