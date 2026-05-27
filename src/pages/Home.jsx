import { Typography, Box } from '@mui/material'

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: '#ffffff',
          borderRadius: 2,
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #232f3e 0%, #37475a 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to ShopSphere
        </Typography>
        <Typography variant="body1">
          Your one-stop destination for everything
        </Typography>
      </Box>
      
    </Box>
  )
}

export default Home