import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const AuthFooter = () => {
  return (
    <Box
      sx={{
        mt: 3,
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 1 }}>
        <Link
          to="#"
          style={{
            color: '#0066c0',
            fontSize: '11px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
        >
          Conditions of Use
        </Link>
        <Link
          to="#"
          style={{
            color: '#0066c0',
            fontSize: '11px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
        >
          Privacy Notice
        </Link>
        <Link
          to="#"
          style={{
            color: '#0066c0',
            fontSize: '11px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
        >
          Help
        </Link>
      </Box>
      <Typography sx={{ fontSize: '11px', color: '#555' }}>
        © 1996-2026, ShopSphere.com, Inc. or its affiliates
      </Typography>
    </Box>
  )
}

export default AuthFooter