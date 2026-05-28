/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { productService } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const productsData = await productService.getAllProducts();
      const categoriesData = await productService.getCategories();

      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, categories, loading, error, refetch: fetchProducts };
};
