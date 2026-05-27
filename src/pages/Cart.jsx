import { Typography, Box, Paper } from '@mui/material'

const Cart = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Cart