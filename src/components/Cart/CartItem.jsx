import { Box, Typography, IconButton, Button, TextField, Paper } from "@mui/material";
import { Add, Remove, DeleteOutlined } from "@mui/icons-material";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const product = item?.products;

  if (!product) {
    return (
      <Paper sx={{ display: "flex", p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ flex: 1, textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">Loading product details...</Typography>
        </Box>
      </Paper>
    );
  }

  const price = product.price * 83;
  const itemTotal = price * item.quantity;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Paper sx={{ display: "flex", p: 2, mb: 2, borderRadius: 2 }}>
      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{
          width: 100,
          height: 100,
          objectFit: "contain",
          bgcolor: "#fafafa",
          borderRadius: 1,
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/100?text=No+Image";
        }}
      />

      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
          {product.title}
        </Typography>

        <Typography variant="caption" sx={{ color: "#007185", display: "block", mb: 1 }}>
          In Stock
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} sx={{ border: "1px solid #d5d9d9", borderRadius: 1 }} disabled={item.quantity <= 1}>
            <Remove fontSize="small" />
          </IconButton>

          <TextField value={item.quantity} size="small" sx={{ width: 50, "& input": { textAlign: "center", py: 0.5 } }} InputProps={{ readOnly: true }} />

          <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} sx={{ border: "1px solid #d5d9d9", borderRadius: 1 }}>
            <Add fontSize="small" />
          </IconButton>

          <Button size="small" startIcon={<DeleteOutlined />} onClick={() => onRemove(item.id)} sx={{ ml: 2, textTransform: "none", color: "#0066c0" }}>
            Delete
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#b12704", minWidth: 100, textAlign: "right" }}>
        {formatPrice(itemTotal)}
      </Typography>
    </Paper>
  );
};

export default CartItem;
