import { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import AuthFooter from "../components/Common/AuthFooter";
import { validateSignup } from "../utils/validations";
import { formReducer, createInitialState } from "../utils/formReducer";

const initialValues = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [state, dispatch] = useReducer(formReducer, createInitialState(initialValues));
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    // Auto-convert username to lowercase
    const finalValue = field === "username" ? value.toLowerCase() : value;
    dispatch({ type: "SET_FIELD", field, value: finalValue });
    // Clear field error when user starts typing
    if (state.errors[field]) {
      dispatch({ type: "SET_FIELD_ERROR", field, error: "" });
    }
  };

  const handleBlur = (field, value) => {
    const validation = validateSignup(
      field === "fullName" ? value : state.values.fullName,
      field === "username" ? value : state.values.username,
      field === "email" ? value : state.values.email,
      field === "password" ? value : state.values.password,
      field === "confirmPassword" ? value : state.values.confirmPassword,
    );
    dispatch({ type: "SET_FIELD_ERROR", field, error: validation[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, username, email, password, confirmPassword } = state.values;
    const validation = validateSignup(fullName, username, email, password, confirmPassword);

    if (!validation.isValid) {
      dispatch({
        type: "SET_ERRORS",
        errors: {
          fullName: validation.fullName,
          username: validation.username,
          email: validation.email,
          password: validation.password,
          confirmPassword: validation.confirmPassword,
        },
      });
      return;
    }

    dispatch({ type: "SET_SERVER_ERROR", error: "" });
    dispatch({ type: "SET_LOADING", isLoading: true });

    try {
      await signup(fullName, username, email, password);
      navigate("/");
    } catch (err) {
      dispatch({ type: "SET_SERVER_ERROR", error: err.message || "Signup failed" });
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px", mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "bold", color: "#131921", letterSpacing: "-0.5px", display: "inline-block" }}>ShopSphere</Typography>
        <Typography component="span" sx={{ fontSize: "12px", color: "#ff9900", fontWeight: "bold", letterSpacing: "0.5px", ml: 0.2 }}>
          .in
        </Typography>
      </Box>

      <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px 26px", backgroundColor: "white", width: "100%" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "400", mb: 3, color: "#0f1111" }}>Create account</Typography>

        {state.serverError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: "13px" }}>
            {state.serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Your name</Typography>
          <TextField
            fullWidth
            placeholder="First and last name"
            value={state.values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName", state.values.fullName)}
            error={!!state.errors.fullName}
            helperText={state.errors.fullName}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Username (unique)</Typography>
          <TextField
            fullWidth
            placeholder="e.g., john_doe123"
            value={state.values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => handleBlur("username", state.values.username)}
            error={!!state.errors.username}
            helperText={state.errors.username || "This will be your unique identifier"}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Email</Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="you@example.com"
            value={state.values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email", state.values.email)}
            error={!!state.errors.email}
            helperText={state.errors.email}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "13px", fontWeight: "700", mb: 0.5, color: "#0f1111" }}>Password</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="At least 6 characters"
            value={state.values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password", state.values.password)}
            error={!!state.errors.password}
            helperText={state.errors.password}
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
            value={state.values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword", state.values.confirmPassword)}
            error={!!state.errors.confirmPassword}
            helperText={state.errors.confirmPassword}
            variant="outlined"
            size="small"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            disabled={state.isLoading}
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
            {state.isLoading ? "Creating account..." : "Create your ShopSphere account"}
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
