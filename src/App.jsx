import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme/ThemeProvider";

import ProtectedRoute from "./components/Layout/ProtectedRoute";
import PublicRoute from "./components/Layout/PublicRoute";

import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
