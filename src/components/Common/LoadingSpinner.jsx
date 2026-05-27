import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress sx={{ color: '#ff9900' }} />
    </Box>
  )
}

export default LoadingSpinner