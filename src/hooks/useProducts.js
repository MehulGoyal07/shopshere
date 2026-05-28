/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { productService } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([productService.getAllProducts(), productService.getCategories()]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, categories, loading, error, refetch: fetchProductsAndCategories };
};
