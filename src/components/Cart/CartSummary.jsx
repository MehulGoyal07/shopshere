import { Box, Typography, Divider, Button, Paper } from "@mui/material";

const CartSummary = ({ subtotal, shipping, tax, total, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, position: "sticky", top: 100 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Order Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Subtotal
        </Typography>
        <Typography variant="body2">{formatPrice(subtotal)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Shipping
        </Typography>
        <Typography variant="body2">{shipping === 0 ? "FREE" : formatPrice(shipping)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Estimated Tax
        </Typography>
        <Typography variant="body2">{formatPrice(tax)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#b12704" }}>
          {formatPrice(total)}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={onCheckout}
        sx={{
          bgcolor: "#ffd814",
          color: "#0f1111",
          "&:hover": { bgcolor: "#f7ca00" },
          textTransform: "none",
          py: 1.5,
          borderRadius: "20px",
          fontWeight: "bold",
        }}
      >
        Proceed to Checkout
      </Button>

      <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 2, color: "#565959" }}>
        Free shipping on orders over ₹500
      </Typography>
    </Paper>
  );
};

export default CartSummary;
