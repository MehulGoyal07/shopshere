import { Box, Paper } from "@mui/material";
import FilterSidebar from "../Filter/FilterSidebar";
import ProductGridHeader from "./ProductGridHeader";
import ProductGrid from "./ProductGrid";
import EmptyProductState from "./EmptyProductState";

const DesktopLayout = ({ filters, onFilterChange, categories, filteredProducts, paginatedProducts, totalPages, page, onPageChange, onAddToCart }) => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Sidebar */}
      <Box sx={{ width: "280px", flexShrink: 0 }}>
        <FilterSidebar filters={filters} onFilterChange={onFilterChange} categories={categories} />
      </Box>

      {/* Products Area */}
      <Box sx={{ flex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            bgcolor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ProductGridHeader totalResults={filteredProducts.length} shownResults={paginatedProducts.length} isMobile={false} />
        </Paper>

        {filteredProducts.length === 0 ? (
          <EmptyProductState />
        ) : (
          <ProductGrid products={paginatedProducts} onAddToCart={onAddToCart} totalPages={totalPages} page={page} onPageChange={onPageChange} isMobile={false} />
        )}
      </Box>
    </Box>
  );
};

export default DesktopLayout;
