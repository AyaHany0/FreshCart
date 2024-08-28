import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";

import {
  addProductToWishlist,
  playSound,
} from "../../CartServices/CartServices";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
export default function CartProduct({ product, setCart, cart }) {
  const [productCount, setProductCount] = useState(product.count);
  const [isIncreaseLoading, setisIncreaseLoading] = useState(false);
  const [isDecreaseLoading, setisDecreaseLoading] = useState(false);
  const [wished, setWished] = useState(false);
  const { removeProductFromCart } = useContext(CartContext);

  async function updateProductCount(productId, count) {
    if (count > product.count) {
      setisIncreaseLoading(true);
    } else {
      setisDecreaseLoading(true);
    }

    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);
    setisIncreaseLoading(false);
    setisDecreaseLoading(false);
  }

  useEffect(() => {
    setProductCount(product.count);
  }, [cart]);
  return (
    <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-700 dark:bg-gray-900 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 "
            src={product.product.imageCover}
            alt="imac image"
          />
        </a>
        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          {/* Counter */}
          <div className="flex items-center">
            <button
              disabled={product.count == 1 || isDecreaseLoading}
              onClick={() => {
                updateProductCount(product.product._id, product.count - 1);
              }}
              type="button"
              className="inline-flex h-8 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-100 hover:bg-[#0aad0a] focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-[#0aad0a] dark:focus:ring-[#0aad0a]"
            >
              {isDecreaseLoading ? (
                <ImSpinner9 className="loaderIcon mr-1 dark:text-white text-gray-900 " />
              ) : (
                <svg
                  className="h-3 w-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              )}
            </button>

            <input
              onBlur={() => {
                product.count !== productCount &&
                  updateProductCount(product.product._id, productCount);
              }}
              onChange={(e) => {
                setProductCount(e.target.value);
              }}
              value={productCount}
              min={1}
              className="w-12 shrink-0 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
            />

            <button
              disabled={isIncreaseLoading}
              onClick={() => {
                updateProductCount(product.product._id, product.count + 1);
              }}
              className="inline-flex h-8 w-7 shrink-0 items-center justify-center rounded-md border disabled:cursor-not-allowed border-gray-300 bg-gray-100 hover:bg-[#0aad0a] focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-[#0aad0a] dark:focus:ring-[#0aad0a]"
            >
              {isIncreaseLoading ? (
                <ImSpinner9 className="loaderIcon mr-1 dark:text-white text-gray-900 " />
              ) : (
                <svg
                  className="h-3 w-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              )}
            </button>
          </div>
          {/*  */}
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {product.price * product.count}
              <span className="mr-2 "> EGY </span>
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {product.product.title}
          </a>
          <div className="text-start md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {product.price}
              <span className="mr-2 "> EGY </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                addProductToWishlist(product.product._id);
                setWished(true);
              }}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill={wished ? "green" : "none"}
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>
            <button
              type="button"
              onClick={() => {
                removeProductFromCart(
                  product.product._id,
                  product.product.title
                );
              }}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
