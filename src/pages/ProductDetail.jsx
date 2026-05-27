import { Typography, Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Showing details for product ID: {id}
        </Typography>
      </Paper>
    </Box>
  )
}

export default ProductDetail