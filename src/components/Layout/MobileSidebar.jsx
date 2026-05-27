import { Drawer, Box, Typography, List, ListItem, ListItemText, Divider, Avatar } from "@mui/material";
import { Home, ShoppingBag, Favorite, History, Person, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MobileSidebar = ({ open, onClose, cartCount = 0 }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getUserDisplayName = () => {
    if (!user) return "Guest";
    return user.full_name || user.username || user.email?.split("@")[0] || "User";
  };

  const getUserAvatar = () => {
    if (!user) return "G";
    return (user.full_name?.[0] || user.username?.[0] || user.email?.[0] || "U").toUpperCase();
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Your Orders", icon: <History />, path: "/orders" },
    { text: "Your Wishlist", icon: <Favorite />, path: "/wishlist" },
    { text: "Your Cart", icon: <ShoppingBag />, path: "/cart", badge: cartCount },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, height: "100%", bgcolor: "#ffffff" }}>
        {/* Header with user info */}
        <Box
          sx={{
            bgcolor: "#131921",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar sx={{ bgcolor: "#ff9900", width: 40, height: 40 }}>{getUserAvatar()}</Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              Hello,
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {getUserDisplayName()}
            </Typography>
          </Box>
        </Box>

        {/* Menu Items */}
        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={onClose}
              sx={{
                py: 1.5,
                "&:hover": { bgcolor: "#f3f3f3" },
              }}
            >
              <Box sx={{ mr: 2, color: "#ff9900", display: "flex", alignItems: "center" }}>{item.icon}</Box>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1">{item.text}</Typography>
                    {item.badge > 0 && <Typography sx={{ color: "#ff9900", fontWeight: "bold", fontSize: "14px" }}>{item.badge}</Typography>}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Account Section */}
        <List>
          <ListItem
            button
            component={Link}
            to="/account"
            onClick={onClose}
            sx={{
              py: 1.5,
              "&:hover": { bgcolor: "#f3f3f3" },
            }}
          >
            <Box sx={{ mr: 2, color: "#ff9900" }}>
              <Person />
            </Box>
            <ListItemText primary="Your Account" />
          </ListItem>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              py: 1.5,
              "&:hover": { bgcolor: "#f3f3f3" },
            }}
          >
            <Box sx={{ mr: 2, color: "#ff9900" }}>
              <Logout />
            </Box>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>

        {/* Footer */}
        <Box sx={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#999" }}>
            © 2026 ShopSphere
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileSidebar;
