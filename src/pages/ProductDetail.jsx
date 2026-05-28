/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { Box, Container, Grid, Typography, Rating, Button, Divider, Breadcrumbs, Link, CircularProgress, Alert, Paper, IconButton, TextField, Snackbar } from "@mui/material";
import { Home as HomeIcon, ShoppingCartOutlined, FavoriteBorder, Favorite, Remove, Add } from "@mui/icons-material";
import { productService } from "../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError("Failed to load product details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 83);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setSnackbarMessage(`Added ${quantity} item(s) to cart`);
    setShowSnackbar(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 500);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#ff9900" }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error || "Product not found"}
        </Alert>
      </Container>
    );
  }

  const formatCategory = (category) => {
    if (!category) return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Box sx={{ bgcolor: "#f3f3f3", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>
        <Breadcrumbs sx={{ mb: 3, fontSize: "14px" }}>
          <Link
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#0066c0",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline", color: "#c45500" },
            }}
          >
            <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "14px" }}>
            {formatCategory(product.category)}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}>
          <Grid container>
            {/* Product Image */}
            <Grid item xs={12} md={6} sx={{ p: 4, bgcolor: "#fafafa" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 300, md: 400 },
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, color: "#0f1111", fontWeight: 400 }}>
                {product.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Rating value={product.rating || 0} precision={0.5} readOnly sx={{ color: "#ffa41c" }} />
                <Typography variant="body2" sx={{ color: "#007185" }}>
                  {product.rating_count} ratings
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#b12704" }}>
                  {formatPrice(product.price)}
                </Typography>
                <Typography variant="caption" sx={{ color: "#565959" }}>
                  Inclusive of all taxes
                </Typography>
              </Box>

              <Box sx={{ bgcolor: "#f7f7f7", p: 2, borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Free Delivery
                </Typography>
                <Typography variant="body2" sx={{ color: "#565959" }}>
                  Get it by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Quantity:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    sx={{
                      border: "1px solid #d5d9d9",
                      borderRadius: 1,
                      width: 36,
                      height: 36,
                      "&:hover": { bgcolor: "#f7fafa" },
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <TextField
                    value={quantity}
                    size="small"
                    sx={{
                      width: 60,
                      "& input": { textAlign: "center", py: 1 },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange("increase")}
                    disabled={quantity >= 10}
                    sx={{
                      border: "1px solid #d5d9d9",
                      borderRadius: 1,
                      width: 36,
                      height: 36,
                      "&:hover": { bgcolor: "#f7fafa" },
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    bgcolor: "#ffd814",
                    color: "#0f1111",
                    "&:hover": { bgcolor: "#f7ca00" },
                    textTransform: "none",
                    borderRadius: "20px",
                    py: 1.2,
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{
                    flex: 1,
                    bgcolor: "#ffa41c",
                    color: "#0f1111",
                    "&:hover": { bgcolor: "#f08804" },
                    textTransform: "none",
                    borderRadius: "20px",
                    py: 1.2,
                    fontWeight: "bold",
                  }}
                >
                  Buy Now
                </Button>
              </Box>

              <Button
                startIcon={isWishlisted ? <Favorite /> : <FavoriteBorder />}
                onClick={() => setIsWishlisted(!isWishlisted)}
                sx={{
                  textTransform: "none",
                  color: "#0f1111",
                  "&:hover": { color: "#ff9900" },
                }}
              >
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#0f1111" }}>
                Product Description
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: "#0f1111" }}>
                {product.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
};

export default ProductDetail;
