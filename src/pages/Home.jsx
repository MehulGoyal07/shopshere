/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Container, CircularProgress, Alert, useMediaQuery, useTheme } from "@mui/material";
import PageBreadcrumbs from "../components/Layout/PageBreadcrumbs";
import DesktopLayout from "../components/Home/DesktopLayout";
import MobileLayout from "../components/Home/MobileLayout";
import MobileFilterDrawer from "../components/Home/MobileFilterDrawer";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, loading, error } = useProducts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchInput, 300);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const itemsPerPage = isMobile ? 6 : isTablet ? 8 : 12;

  const [filters, setFilters] = useState({
    searchTerm: debouncedSearch,
    categories: [],
    priceRange: [0, 1000],
    minRating: 0,
  });

  // Update search from URL
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchInput) setSearchInput(urlSearch);
  }, [searchParams]);

  // Update filters when search changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchTerm: debouncedSearch }));
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch });
    } else {
      setSearchParams({});
    }
    setPage(1);
  }, [debouncedSearch]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.searchTerm) {
      result = result.filter((p) => p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    }

    if (filters.categories.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    const minPrice = filters.priceRange[0] * 83;
    const maxPrice = filters.priceRange[1] * 83;
    result = result.filter((p) => {
      const price = p.price * 83;
      return price >= minPrice && price <= maxPrice;
    });

    if (filters.minRating) {
      result = result.filter((p) => (p.rating?.rate || 0) >= filters.minRating);
    }

    return result;
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`Added "${product.title}" to cart`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#ff9900" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Failed to load products. Please refresh the page.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f3f3f3", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 2, sm: 3 } }}>
        <PageBreadcrumbs items={["All Products"]} />

        {!isMobile ? (
          <DesktopLayout
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
            filteredProducts={filteredProducts}
            paginatedProducts={paginatedProducts}
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <MobileLayout
            filteredProducts={filteredProducts}
            paginatedProducts={paginatedProducts}
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
            onAddToCart={handleAddToCart}
            onFilterClick={() => setMobileFiltersOpen(true)}
          />
        )}

        <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} filters={filters} onFilterChange={setFilters} categories={categories} />
      </Container>
    </Box>
  );
};

export default Home;
