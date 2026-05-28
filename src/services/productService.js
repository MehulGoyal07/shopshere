const FAKE_STORE_API = "https://fakestoreapi.com";

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${FAKE_STORE_API}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`${FAKE_STORE_API}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${FAKE_STORE_API}/products/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${FAKE_STORE_API}/products/category/${category}`);
      if (!response.ok) throw new Error("Failed to fetch products by category");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },
};
