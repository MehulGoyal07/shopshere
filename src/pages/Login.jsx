import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, TextField, Button, Typography, Alert, Divider } from "@mui/material";
import AuthFooter from "../components/Common/AuthFooter";
import { validateLogin } from "../utils/validations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBlur = (field, value) => {
    const validation = validateLogin(field === "email" ? value : email, field === "password" ? value : password);
    setErrors((prev) => ({ ...prev, [field]: validation[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateLogin(email, password);

    if (!validation.isValid) {
      setErrors({ email: validation.email, password: validation.password });
      return;
    }

    setServerError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Login failed");
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
        maxWidth: "350px",
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
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "400",
            mb: 3,
            color: "#0f1111",
          }}
        >
          Sign in
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: "13px" }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "700",
              mb: 0.5,
              color: "#0f1111",
            }}
          >
            Email
          </Typography>
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
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#888c8c",
                },
                "&:hover fieldset": {
                  borderColor: "#007185",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007185",
                  borderWidth: "2px",
                },
              },
            }}
          />

          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "700",
              mb: 0.5,
              color: "#0f1111",
            }}
          >
            Password
          </Typography>
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
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#888c8c",
                },
                "&:hover fieldset": {
                  borderColor: "#007185",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007185",
                  borderWidth: "2px",
                },
              },
            }}
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
              "&:hover": {
                backgroundColor: "#f7ca00",
              },
              "&:disabled": {
                backgroundColor: "#ffd814",
                opacity: 0.5,
              },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#0f1111",
            mb: 2,
            lineHeight: 1.5,
          }}
        >
          By continuing, you agree to ShopSphere's{" "}
          <Link
            to="#"
            style={{
              color: "#0066c0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link
            to="#"
            style={{
              color: "#0066c0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Privacy Notice
          </Link>
          .
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Link
            to="#"
            style={{
              color: "#0066c0",
              fontSize: "12px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Need help?
          </Link>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#767676",
              mb: 1,
            }}
          >
            New to ShopSphere?
          </Typography>
          <Button
            fullWidth
            component={Link}
            to="/signup"
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "13px",
              fontWeight: "500",
              padding: "8px",
              borderRadius: "20px",
              borderColor: "#d5d9d9",
              color: "#0f1111",
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#f7fafa",
                borderColor: "#d5d9d9",
              },
            }}
          >
            Create your ShopSphere account
          </Button>
        </Box>
      </Box>

      <AuthFooter />
    </Box>
  );
};

export default Login;
