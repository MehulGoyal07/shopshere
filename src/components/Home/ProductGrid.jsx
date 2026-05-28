import { Box, Pagination } from "@mui/material";
import ProductCard from "../Product/ProductCard";

const ProductGrid = ({ products, onAddToCart, totalPages, page, onPageChange, isMobile }) => {
  if (products.length === 0) return null;

  return (
    <>
      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: isMobile ? 1.5 : 2,
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ height: "100%" }}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
            sx={{
              "& .MuiPaginationItem-root": { color: "#0f1111" },
              "& .Mui-selected": {
                bgcolor: "#ff9900 !important",
                color: "white",
                "&:hover": { bgcolor: "#f08804 !important" },
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ProductGrid;
