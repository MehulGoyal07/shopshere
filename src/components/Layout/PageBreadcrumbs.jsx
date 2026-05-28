import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const PageBreadcrumbs = ({ items = [] }) => {
  return (
    <Breadcrumbs sx={{ mb: 2, fontSize: "12px" }}>
      <Link
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#0066c0",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", color: "#c45500" },
        }}
      >
        <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} />
        Home
      </Link>
      {items.map((item, index) => (
        <Typography key={index} color="text.primary" sx={{ fontSize: "12px" }}>
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default PageBreadcrumbs;
