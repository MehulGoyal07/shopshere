import { Box, Typography, Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";

const ProductGridHeader = ({ totalResults, shownResults, onFilterClick, isMobile }) => {
  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{ fontSize: "14px", color: "#565959" }}>
        Showing <strong>{shownResults}</strong> of <strong>{totalResults}</strong> results
      </Typography>

      {isMobile && (
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={onFilterClick}
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "12px",
            borderColor: "#d5d9d9",
            color: "#0f1111",
            "&:hover": { borderColor: "#d5d9d9", bgcolor: "#f7fafa" },
          }}
        >
          Filter
        </Button>
      )}
    </Box>
  );
};

export default ProductGridHeader;
