import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import SearchIcon from "../SearchIcon/SearchIcon";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data.data.data,
    staleTime: 5000,
    refetchInterval: 8000,
    cacheTime: 500000,
  });

  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     setProducts(data.data);
  //   } catch (error) {
  //     setError("Failed to load products. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  function search(e) {
    setSearchTerm(e.target.value);
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.5 }}
            className="fixed left-5 top-20 dark:bg-black z-50"
          >
            <SearchIcon search={search} searchTerm={searchTerm} />
          </motion.div>
          <div className="pt-10 pb-8  dark:bg-black">
            {filteredProducts.length === 0 ? (
              <div className="text-center">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 px-8">
                {filteredProducts.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
