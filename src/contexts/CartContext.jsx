/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { cartService } from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await cartService.getCartItems(user.id);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return false;
    }

    try {
      await cartService.addToCart(user.id, product.id, quantity);
      await loadCart();
      return true;
    } catch (error) {
      console.error("Failed to add to cart:", error);
      return false;
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;

    try {
      await cartService.updateQuantity(cartItemId, quantity);
      await loadCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await cartService.removeFromCart(cartItemId);
      await loadCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      await cartService.clearCart(user.id);
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.products?.price || 0;
    return sum + price * 83 * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const value = {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    tax,
    total,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
