import { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Slider, Rating, Button, Collapse, TextField, InputAdornment, Paper } from "@mui/material";
import { FilterAltOff, ExpandMore, ExpandLess, AttachMoney, Category, Star } from "@mui/icons-material";

const FilterSidebar = ({ filters, onFilterChange, categories }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category) ? filters.categories.filter((c) => c !== category) : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({ ...filters, priceRange: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    onFilterChange({ ...filters, minRating: newValue });
  };

  const clearAllFilters = () => {
    onFilterChange({
      searchTerm: "",
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length) count += filters.categories.length;
    if (filters.minRating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #e5e5e5" }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fafafa" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#0f1111" }}>Filters</Typography>
        <Button
          size="small"
          startIcon={<FilterAltOff sx={{ fontSize: 16 }} />}
          onClick={clearAllFilters}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            color: "#0066c0",
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Clear all {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </Box>

      {/* Category Filter */}
      <Box sx={{ borderBottom: "1px solid #e5e5e5" }}>
        <Box
          onClick={() => toggleSection("category")}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: "#fafafa" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Category sx={{ fontSize: 18, color: "#ff9900" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#0f1111" }}>Category</Typography>
          </Box>
          {expandedSections.category ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
        </Box>
        <Collapse in={expandedSections.category}>
          <Box sx={{ px: 2, pb: 2 }}>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      size="small"
                      sx={{
                        color: "#ff9900",
                        "&.Mui-checked": { color: "#ff9900" },
                      }}
                    />
                  }
                  label={<Typography sx={{ fontSize: "13px", textTransform: "capitalize", color: "#0f1111" }}>{category}</Typography>}
                  sx={{ mb: 0.5, ml: -0.5 }}
                />
              ))}
            </FormGroup>
          </Box>
        </Collapse>
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ borderBottom: "1px solid #e5e5e5" }}>
        <Box
          onClick={() => toggleSection("price")}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: "#fafafa" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachMoney sx={{ fontSize: 18, color: "#ff9900" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#0f1111" }}>Price Range</Typography>
          </Box>
          {expandedSections.price ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
        </Box>
        <Collapse in={expandedSections.price}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              sx={{
                color: "#ff9900",
                "& .MuiSlider-thumb": {
                  bgcolor: "#ff9900",
                  "&:hover": { bgcolor: "#f08804" },
                },
                "& .MuiSlider-track": { bgcolor: "#ff9900" },
              }}
              valueLabelFormat={(value) => `₹${(value * 83).toLocaleString()}`}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TextField
                size="small"
                label="Min"
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => onFilterChange({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                label="Max"
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ borderBottom: "1px solid #e5e5e5" }}>
        <Box
          onClick={() => toggleSection("rating")}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: "#fafafa" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Star sx={{ fontSize: 18, color: "#ff9900" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#0f1111" }}>Customer Rating</Typography>
          </Box>
          {expandedSections.rating ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
        </Box>
        <Collapse in={expandedSections.rating}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Rating value={filters.minRating} onChange={handleRatingChange} precision={0.5} sx={{ color: "#ffa41c" }} />
              <Typography variant="caption" sx={{ color: "#565959" }}>
                & up
              </Typography>
            </Box>
            {filters.minRating > 0 && (
              <Button
                size="small"
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
                sx={{
                  mt: 1.5,
                  textTransform: "none",
                  fontSize: "12px",
                  color: "#0066c0",
                  "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                }}
              >
                Clear rating filter
              </Button>
            )}
          </Box>
        </Collapse>
      </Box>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#0f1111", mb: 1 }}>Active Filters:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {filters.categories.map((cat) => (
              <Button
                key={cat}
                size="small"
                variant="outlined"
                onClick={() => handleCategoryChange(cat)}
                sx={{
                  textTransform: "none",
                  fontSize: "11px",
                  borderColor: "#d5d9d9",
                  color: "#0f1111",
                  "&:hover": { bgcolor: "#f7fafa" },
                }}
              >
                {cat} ✕
              </Button>
            ))}
            {filters.minRating > 0 && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
                sx={{
                  textTransform: "none",
                  fontSize: "11px",
                  borderColor: "#d5d9d9",
                  color: "#0f1111",
                }}
              >
                {filters.minRating}★ & up ✕
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default FilterSidebar;
