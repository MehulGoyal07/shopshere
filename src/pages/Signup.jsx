import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import AuthFooter from "../components/Common/AuthFooter";
import { validateSignup } from "../utils/validations";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleBlur = (field, value) => {
    const validation = validateSignup(
      field === "fullName" ? value : fullName,
      field === "username" ? value : username,
      field === "email" ? value : email,
      field === "password" ? value : password,
      field === "confirmPassword" ? value : confirmPassword,
    );
    setErrors((prev) => ({ ...prev, [field]: validation[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateSignup(fullName, username, email, password, confirmPassword);

    if (!validation.isValid) {
      setErrors({
        fullName: validation.fullName,
        username: validation.username,
        email: validation.email,
        password: validation.password,
        confirmPassword: validation.confirmPassword,
      });
      return;
    }

    setServerError("");
    setLoading(true);

    try {
      await signup(fullName, username, email, password);
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        mx: "auto",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#131921",
            letterSpacing: "-0.5px",
            display: "inline-block",
          }}
        >
          ShopSphere
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: "12px",
            color: "#ff9900",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            ml: 0.2,
          }}
        >
          .in
        </Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px 26px",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "28px", fontWeight: "400", mb: 3, color: "#0f1111" }}>Create account</Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: "13px" }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Your name</Typography>
          <TextField
            fullWidth
            placeholder="First and last name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleBlur("fullName", fullName)}
            error={!!errors.fullName}
            helperText={errors.fullName}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Username (unique)</Typography>
          <TextField
            fullWidth
            placeholder="e.g., john_doe123"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            onBlur={() => handleBlur("username", username)}
            error={!!errors.username}
            helperText={errors.username || "This will be your unique identifier"}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Email</Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email", email)}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Password</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password", password)}
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />
          <Typography sx={{ fontSize: "12px", color: "#555", mb: 2, display: "flex", alignItems: "center", gap: 0.5 }}>
            <LockOutlined sx={{ fontSize: "12px" }} />
            Password must contain uppercase, lowercase, and number
          </Typography>

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Re-enter password</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur("confirmPassword", confirmPassword)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            variant="outlined"
            size="small"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#ffd814",
              color: "#0f1111",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: "500",
              padding: "8px",
              borderRadius: "20px",
              mb: 2,
              "&:hover": { backgroundColor: "#f7ca00" },
              "&:disabled": { backgroundColor: "#ffd814", opacity: 0.5 },
            }}
          >
            {loading ? "Creating account..." : "Create your ShopSphere account"}
          </Button>
        </form>

        <Typography sx={{ fontSize: "12px", color: "#0f1111", mb: 2, lineHeight: 1.5 }}>
          By creating an account, you agree to ShopSphere's{" "}
          <Link to="#" style={{ color: "#0066c0", textDecoration: "none" }}>
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link to="#" style={{ color: "#0066c0", textDecoration: "none" }}>
            Privacy Notice
          </Link>
          .
        </Typography>

        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "13px", color: "#0f1111" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#0066c0", textDecoration: "none", fontWeight: "500" }}>
              Sign in &gt;
            </Link>
          </Typography>
        </Box>
      </Box>

      <AuthFooter />
    </Box>
  );
};

export default Signup;
