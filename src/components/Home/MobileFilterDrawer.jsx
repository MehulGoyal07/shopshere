import { Drawer, Box, Button } from "@mui/material";
import FilterSidebar from "../Filter/FilterSidebar";

const MobileFilterDrawer = ({ open, onClose, filters, onFilterChange, categories }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px 16px 0 0",
          maxHeight: "85vh",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <FilterSidebar filters={filters} onFilterChange={onFilterChange} categories={categories} />
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            bgcolor: "#ffd814",
            color: "#0f1111",
            "&:hover": { bgcolor: "#f7ca00" },
            textTransform: "none",
            py: 1.2,
            borderRadius: "20px",
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileFilterDrawer;
