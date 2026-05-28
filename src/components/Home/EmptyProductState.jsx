import { Paper, Typography } from "@mui/material";

const EmptyProductState = () => {
  return (
    <Paper sx={{ textAlign: "center", py: 8, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#0f1111" }}>
        No products found
      </Typography>
      <Typography variant="body2" sx={{ color: "#565959" }}>
        Try adjusting your filters or search term
      </Typography>
    </Paper>
  );
};

export default EmptyProductState;
