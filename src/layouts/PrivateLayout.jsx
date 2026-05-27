import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

import Navbar from "../components/Layout/Navbar";

const PrivateLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f3f3f3",
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: "#232F3E",
          color: "white",
          textAlign: "center",
          py: 2,
          mt: "auto",
        }}
      >
        <Typography variant="body2">© 2026 ShopSphere - All Rights Reserved</Typography>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
