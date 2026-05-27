import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PublicLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f3f3",
        px: 2,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
