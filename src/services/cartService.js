import { supabase } from "../lib/supabase";
import { productService } from "./productService";

export const cartService = {
  getCartItems: async (userId) => {
    try {
      const { data: cartData, error: cartError } = await supabase.from("cart_items").select("*").eq("user_id", userId);

      if (cartError) throw cartError;
      if (!cartData || cartData.length === 0) return [];

      const itemsWithProducts = await Promise.all(
        cartData.map(async (cartItem) => {
          try {
            const product = await productService.getProductById(cartItem.product_id);
            return {
              ...cartItem,
              products: product,
            };
          } catch (err) {
            console.error(`Failed to fetch product ${cartItem.product_id}:`, err);
            return {
              ...cartItem,
              products: null,
            };
          }
        }),
      );

      return itemsWithProducts;
    } catch (error) {
      console.error("getCartItems error:", error);
      return [];
    }
  },

  addToCart: async (userId, productId, quantity = 1) => {
    try {
      const { data: existing } = await supabase.from("cart_items").select("id, quantity").eq("user_id", userId).eq("product_id", productId).maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            user_id: userId,
            product_id: productId,
            quantity: quantity,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error("addToCart error:", error);
      throw error;
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    const { data, error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId).select().single();

    if (error) throw error;
    return data;
  },

  removeFromCart: async (cartItemId) => {
    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);

    if (error) throw error;
    return true;
  },

  clearCart: async (userId) => {
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);

    if (error) throw error;
    return true;
  },
};
