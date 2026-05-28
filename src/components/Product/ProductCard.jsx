/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Button, Skeleton, IconButton } from "@mui/material";
import { ShoppingCartOutlined, FavoriteBorder, Favorite } from "@mui/icons-material";

const ProductCard = ({ product, onAddToCart, loading = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 83);
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
        }}
      >
        <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "#f0f0f0" }} />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="60%" height={16} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
          <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: 2 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease",
        borderRadius: "8px",
        overflow: "hidden",
        bgcolor: "white",
        border: "1px solid #e5e5e5",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
          border: "1px solid transparent",
        },
      }}
    >
      {/* Wishlist Button */}
      <IconButton
        onClick={handleWishlist}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          bgcolor: "white",
          "&:hover": { bgcolor: "#f0f0f0" },
          width: 32,
          height: 32,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
        size="small"
      >
        {isWishlisted ? <Favorite sx={{ color: "#ff9900", fontSize: 18 }} /> : <FavoriteBorder sx={{ fontSize: 18 }} />}
      </IconButton>

      {/* Product Image - Fixed height */}
      <Box
        sx={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
          p: 2,
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200?text=No+Image";
          }}
        />
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          pt: 1.5,
        }}
      >
        {/* Product Title - Exactly 2 lines */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
            mb: 1,
            color: "#0f1111",
            lineHeight: 1.4,
          }}
        >
          {product.title}
        </Typography>

        {/* Rating */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1,
          }}
        >
          <Rating value={product.rating?.rate || 0} precision={0.5} size="small" readOnly sx={{ color: "#ffa41c" }} />
          <Typography variant="caption" sx={{ color: "#007185" }}>
            {product.rating?.count || 0}
          </Typography>
        </Box>

        {/* Price */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#0f1111",
            mb: 1,
          }}
        >
          {formatPrice(product.price)}
        </Typography>

        {/* Delivery Info */}
        <Typography
          variant="caption"
          sx={{
            color: "#565959",
            display: "block",
            mb: 1.5,
          }}
        >
          FREE delivery
        </Typography>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          size="small"
          fullWidth
          startIcon={<ShoppingCartOutlined sx={{ fontSize: 16 }} />}
          onClick={handleAddToCart}
          sx={{
            mt: "auto",
            bgcolor: "#ffd814",
            color: "#0f1111",
            "&:hover": { bgcolor: "#f7ca00" },
            py: 1,
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "20px",
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
