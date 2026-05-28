import { useState } from "react";
import { Box, Container, Typography, Breadcrumbs, Link, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import EmptyCart from "../components/Cart/EmptyCart";

const Cart = () => {
  const { cartItems, loading, subtotal, shipping, tax, total, updateQuantity, removeItem } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    await updateQuantity(cartItemId, quantity);
  };

  const handleRemoveItem = async (cartItemId) => {
    await removeItem(cartItemId);
    setSnackbar({ open: true, message: "Item removed from cart" });
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#ff9900" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f3f3f3", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" sx={{ display: "flex", alignItems: "center", color: "#0066c0", textDecoration: "none" }}>
            <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Home
          </Link>
          <Typography color="text.primary">Shopping Cart</Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 400, color: "#0f1111" }}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} onCheckout={handleCheckout} />
            </Grid>
          </Grid>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
};

export default Cart;
