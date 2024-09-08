import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import CartProduct from "../CartProduct/CartProduct";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { playSound } from "../../CartServices/CartServices";
import dun from "../../assets/sounds/dun.wav";
import EmptyCart from "./EmptyCart";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const { getUserCart, isLoading, cart, setCart, setCartCount, clearCart } =
    useContext(CartContext);

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : cart && cart?.data.products.length !== 0 ? (
        <div>
          <section className="bg-white py-8 antialiased dark:bg-black md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <h2 className="text-xl font-semibold text-green-700 dark:text-white sm:text-2xl">
                Shopping Cart
              </h2>
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 150 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
                >
                  <div className="space-y-6">
                    {cart?.data.products.map((product, index) => {
                      return (
                        <CartProduct
                          key={index}
                          product={product}
                          setCart={setCart}
                          cart={cart}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-8 flex justify-center ">
                    <button
                      onClick={clearCart}
                      type="submit"
                      className="flex  items-center justify-center rounded-lg bg-red-600 px-8  py-2 text-sm font-medium text-white  hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300  "
                    >
                      Clear Cart
                    </button>
                  </div>
                </motion.div>

                {/* Checkout */}
                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
                >
                  <div className="space-y-4 rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-700 dark:bg-gray-800 sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Original price
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {cart?.data.totalCartPrice}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Savings
                          </dt>
                          <dd className="text-base font-medium text-green-600">
                            -0
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Store Pickup
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            0
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            0
                          </dd>
                        </dl>
                      </div>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          {cart?.data.totalCartPrice}
                        </dd>
                      </dl>
                    </div>
                    <Link
                      to={"/shippingaddress/" + cart?.data._id}
                      onClick={() => {
                        playSound(dun);
                      }}
                      className="flex w-full items-center justify-center rounded-lg bg-[#0aad0a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0aad0a] focus:outline-none focus:ring-4 focus:ring-[#0f990a] dark:bg-[#0aad0a] dark:hover:bg-[#0aad0a] dark:focus:ring-[#0f990a]"
                    >
                      Proceed to Checkout
                    </Link>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
                      <Link
                        to={"/"}
                        className="inline-flex items-center gap-2 text-sm font-medium text-black underline hover:no-underline dark:text-[#0aad0a]"
                      >
                        Continue Shopping
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-700 dark:bg-gray-800 sm:p-6">
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="voucher"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Do you have a voucher or gift card?
                        </label>
                        <input
                          type="text"
                          id="voucher"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                          required
                        />
                      </div>
                      <button className="flex w-full items-center justify-center rounded-lg bg-[#0aad0a] px-5 py-2.5 text-sm font-medium text-white  hover:bg-[#0aad0a] focus:outline-none focus:ring-4 focus:ring-[#0f990a] dark:bg-[#0aad0a] dark:hover:bg-[#0aad0a] dark:focus:ring-[#0f990a]">
                        Apply Code
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
