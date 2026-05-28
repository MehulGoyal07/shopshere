import { Typography, Button, Paper } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Paper sx={{ textAlign: "center", py: 8, borderRadius: 2 }}>
      <ShoppingCartOutlined sx={{ fontSize: 80, color: "#ddd", mb: 2 }} />
      <Typography variant="h5" gutterBottom sx={{ color: "#0f1111" }}>
        Your cart is empty
      </Typography>
      <Typography variant="body2" sx={{ color: "#565959", mb: 3 }}>
        Add items to your cart to see them here
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          bgcolor: "#ffd814",
          color: "#0f1111",
          "&:hover": { bgcolor: "#f7ca00" },
          textTransform: "none",
          px: 4,
          py: 1,
          borderRadius: "20px",
        }}
      >
        Continue Shopping
      </Button>
    </Paper>
  );
};

export default EmptyCart;
