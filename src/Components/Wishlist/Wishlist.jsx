import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { removeProductFromWishlist } from "../../CartServices/CartServices";
import EmptyWishlist from "./EmptyWishlist";
import { motion, motionValue } from "framer-motion";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { addProductToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState(null);
  useEffect(() => {
    getUserWishlist();
  }, []);
  async function getUserWishlist() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    setWishlist(data);
  }

  return (
    <div>
      <Helmet>
        <title>wishlist</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : wishlist?.data.length ? (
        <div className="pt-10 pb-8  mx-auto dark:bg-black max-w-screen-2xl px-4 2xl:px-14">
          <div className="flex justify-start items-center pl-7 pb-8">
            <FaHeart className="  text-xl text-red-600 mr-3 " />
            <h2 className="text-xl  font-semibold text-green-700 dark:text-white sm:text-2xl">
              Wishlist
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -150 }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 mx-8">
              {wishlist.data?.map((product) => {
                return (
                  <div key={product._id}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <div className="flex flex-col lg:flex-row">
                        <div className="bg-white dark:bg-gray-700  shadow-md rounded-3xl p-4 flex flex-col lg:flex-row">
                          <div className="w-full lg:w-1/3 h-full lg:mb-0 mb-3">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="w-full h-full object-scale-down lg:object-cover lg:h-48 rounded-2xl"
                            />
                          </div>
                          <div className="flex flex-col justify-between ml-3 py-2 w-full lg:w-2/3">
                            <div className="flex flex-wrap">
                              <div className="w-full flex-none text-xs text-green-700 font-bold">
                                Shop
                              </div>
                              <h2 className="flex-auto text-lg font-medium line-clamp-1 dark:text-white">
                                {product.title}
                              </h2>
                              <h2 className="w-full mt-2 text-lg font-medium dark:text-white">
                                {product.price} EGY
                              </h2>
                            </div>

                            <div className="flex flex-col space-y-3 text-sm font-medium mt-4 justify-center items-center pr-4 ">
                              <div className="md:w-1/2">
                                <button
                                  onClick={() => {
                                    removeProductFromWishlist(
                                      product.id,
                                      product.title,
                                      setWishlist,
                                      getUserWishlist
                                    );
                                  }}
                                  className="w-full  mb-2 md:mb-0 bg-white  px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-md hover:bg-gray-100 inline-flex items-center justify-center"
                                >
                                  <span className="text-green-400 hover:text-green-500 rounded-lg">
                                    <FaRegHeart className="text-xl mr-4 text-[#0aad0a]" />
                                  </span>
                                  <span>Remove from Wishlist</span>
                                </button>
                              </div>
                              <div className="md:w-1/2">
                                <AddToCartButton
                                  addProductToCart={addProductToCart}
                                  productId={product._id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
}
