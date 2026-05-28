import { Box } from "@mui/material";
import ProductGridHeader from "./ProductGridHeader";
import ProductGrid from "./ProductGrid";
import EmptyProductState from "./EmptyProductState";

const MobileLayout = ({ filteredProducts, paginatedProducts, totalPages, page, onPageChange, onAddToCart, onFilterClick }) => {
  return (
    <Box>
      <ProductGridHeader totalResults={filteredProducts.length} shownResults={paginatedProducts.length} onFilterClick={onFilterClick} isMobile={true} />

      {filteredProducts.length === 0 ? (
        <EmptyProductState />
      ) : (
        <ProductGrid products={paginatedProducts} onAddToCart={onAddToCart} totalPages={totalPages} page={page} onPageChange={onPageChange} isMobile={true} />
      )}
    </Box>
  );
};

export default MobileLayout;
