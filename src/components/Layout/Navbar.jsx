import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import MobileSidebar from "./MobileSidebar";
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Container, Menu, MenuItem, InputBase, Button, useMediaQuery, useTheme, Avatar, Skeleton } from "@mui/material";
import { ShoppingCartOutlined, Search as SearchIcon, Menu as MenuIcon, LocationOn, ExpandMore, Person2Outlined } from "@mui/icons-material";
import { productService } from "../../services/productService";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartCount } = useCart();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        // Format category names for display
        const formattedCategories = data.map((cat) =>
          cat
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        );
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback categories
        setCategories(["Electronics", "Men's Clothing", "Women's Clothing", "Jewelery"]);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category.toLowerCase()}`);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getUserDisplayName = () => {
    if (!user) return "Sign in";
    return user.full_name?.split(" ")[0] || user.username || user.email?.split("@")[0] || "User";
  };

  const getUserAvatar = () => {
    if (!user) return "G";
    return (user.full_name?.[0] || user.username?.[0] || user.email?.[0] || "U").toUpperCase();
  };

  const hoverStyles = {
    "&:hover": {
      border: "1px solid white",
      borderRadius: "2px",
      padding: { xs: "4px 6px", sm: "6px 8px" },
    },
    px: { xs: 0.5, sm: 1 },
    py: { xs: 0.5, sm: 0.5 },
    transition: "all 0.2s ease",
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#131921", boxShadow: "none" }}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            sx={{
              px: { xs: 1, sm: 2, md: 3 },
              py: { xs: 0.5, sm: 0 },
              minHeight: { xs: "auto", sm: "60px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1, sm: 1.5 },
            }}
          >
            {isMobile && (
              <IconButton onClick={handleSidebarToggle} sx={{ color: "white", p: 0.5, flexShrink: 0 }}>
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "baseline",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { color: "#ff9900" },
                }}
              >
                ShopSphere
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: "10px", sm: "12px" },
                  color: "#ff9900",
                  fontWeight: "bold",
                  ml: 0.3,
                }}
              >
                .in
              </Typography>
            </Box>

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  cursor: "pointer",
                  ...hoverStyles,
                }}
              >
                <LocationOn sx={{ color: "#ff9900", fontSize: 18 }} />
                <Box>
                  <Typography sx={{ fontSize: "10px", color: "#ccc", lineHeight: 1 }}>Deliver to</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "white", lineHeight: 1.2 }}>India</Typography>
                </Box>
              </Box>
            )}

            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", sm: "400px", md: "600px", lg: "800px", xl: "900px" },
                display: "flex",
                mx: { xs: 0, sm: 2 },
              }}
            >
              {!isMobile && (
                <Button
                  sx={{
                    bgcolor: "#f3f3f3",
                    borderRadius: "4px 0 0 4px",
                    px: 2,
                    py: 0.8,
                    color: "#0f1111",
                    textTransform: "none",
                    fontSize: "12px",
                    minWidth: "auto",
                    "&:hover": { bgcolor: "#e3e3e3" },
                  }}
                >
                  All <ExpandMore sx={{ fontSize: 16, ml: 0.5 }} />
                </Button>
              )}

              <InputBase
                placeholder="Search ShopSphere.in"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: isMobile ? "4px 0 0 4px" : "0",
                  "& input": {
                    py: { xs: 0.8, sm: 1 },
                    fontSize: { xs: "13px", sm: "14px" },
                  },
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  bgcolor: "#febd69",
                  borderRadius: "0 4px 4px 0",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.8, sm: 1 },
                  "&:hover": { bgcolor: "#f3a847" },
                }}
              >
                <SearchIcon sx={{ color: "#0f1111", fontSize: { xs: 18, sm: 20 } }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2, md: 2.5 },
                flexShrink: 0,
              }}
            >
              {!isMobile && (
                <Button
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "13px",
                    minWidth: "auto",
                    ...hoverStyles,
                  }}
                >
                  EN <ExpandMore sx={{ fontSize: 16 }} />
                </Button>
              )}

              {!isMobile && (
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ...hoverStyles,
                  }}
                  onClick={handleMenuOpen}
                >
                  {loading ? (
                    <>
                      <Skeleton variant="text" width={40} height={10} sx={{ bgcolor: "#ccc" }} />
                      <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: "#ccc" }} />
                    </>
                  ) : (
                    <>
                      <Typography sx={{ fontSize: "10px", color: "#ccc", lineHeight: 1 }}>Hello, {getUserDisplayName()}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "bold", color: "white" }}>Account & Lists</Typography>
                        <ExpandMore sx={{ fontSize: 16, color: "white" }} />
                      </Box>
                    </>
                  )}
                </Box>
              )}

              {!isTablet && !isMobile && (
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ...hoverStyles,
                  }}
                >
                  <Typography sx={{ fontSize: "10px", color: "#ccc", lineHeight: 1 }}>Returns</Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: "bold", color: "white" }}>& Orders</Typography>
                </Box>
              )}

              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  p: { xs: 0.5, sm: 0.8 },
                  borderRadius: "2px",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    border: "1px solid white",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Badge
                  badgeContent={cartCount}
                  color="error"
                  max={99}
                  showZero
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "10px",
                      height: "18px",
                      minWidth: "18px",
                      right: -5,
                      top: 0,
                    },
                  }}
                >
                  <ShoppingCartOutlined sx={{ fontSize: { xs: 22, sm: 24 } }} />
                </Badge>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: "bold",
                    display: { xs: "none", sm: "block" },
                    ml: 0.5,
                  }}
                >
                  Cart
                </Typography>
              </IconButton>

              {isMobile && (
                <Avatar
                  sx={{
                    bgcolor: "#ff9900",
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  onClick={handleMenuOpen}
                >
                  {getUserAvatar()}
                </Avatar>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Secondary Navbar - Dynamic Categories */}
        {!isMobile && (
          <Box sx={{ bgcolor: "#232f3e", borderTop: "1px solid #37475a" }}>
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  py: 0.8,
                  px: { md: 2, lg: 3 },
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  "&::-webkit-scrollbar": {
                    height: "4px",
                  },
                }}
              >
                <Typography
                  onClick={() => handleCategoryClick("all")}
                  sx={{
                    fontSize: "13px",
                    color: "white",
                    cursor: "pointer",
                    "&:hover": { color: "#ff9900" },
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <MenuIcon sx={{ fontSize: 18 }} /> All
                </Typography>
                {categories.map((category) => (
                  <Typography
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      fontSize: "13px",
                      color: "white",
                      cursor: "pointer",
                      "&:hover": { color: "#ff9900" },
                    }}
                  >
                    {category}
                  </Typography>
                ))}
              </Box>
            </Container>
          </Box>
        )}

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/account");
            }}
          >
            <Person2Outlined sx={{ mr: 1, fontSize: 18 }} /> Your Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/orders");
            }}
          >
            Your Orders
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/wishlist");
            }}
          >
            Your Wishlist
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "#ff9900" }}>
            Sign Out
          </MenuItem>
        </Menu>
      </AppBar>

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} cartCount={cartCount} />
    </>
  );
};

export default Navbar;
