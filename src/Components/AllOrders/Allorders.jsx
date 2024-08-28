import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDateTime, playSound } from "../../CartServices/CartServices";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { motion } from "framer-motion";
import success from "../../assets/sounds/success.wav";
import { jwtDecode } from "jwt-decode";
export default function Allorders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  useEffect(() => {
    getUserOrder();
    playSound(success);
  }, []);

  async function getUserOrder() {
    setIsLoading(true);
    let { data } = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + userId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    setOrders(data);
  }
  const lastOrder = orders?.[orders.length - 1];
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 150 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start item-start space-y-2 flex-col "
        >
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
            Order #{lastOrder?.id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {formatDateTime(lastOrder?.createdAt)}
          </p>
        </motion.div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
          >
            {/* ************* */}

            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 mb-8 mt-4">
                {lastOrder?.user.name}’s Cart
              </p>
              {lastOrder?.cartItems.map((cartItem, index) => {
                return (
                  <div
                    key={index}
                    className="mt-6 mb-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full "
                  >
                    <div className="w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={cartItem.product.imageCover}
                        alt={cartItem.product.title}
                      />
                      <img
                        className="w-full md:hidden"
                        src={cartItem.product.imageCover}
                        alt={cartItem.product.title}
                      />
                    </div>
                    <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800 line-clamp-1">
                          {cartItem.product.title}
                        </h3>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          {cartItem.product.category.name}
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">
                          {cartItem.count}
                        </p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                          {cartItem.price} EGY
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* *********************** */}
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {lastOrder?.totalOrderPrice}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount
                    </p>
                    <p className="text-base leading-4 text-gray-600">0</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">0</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    {lastOrder?.totalOrderPrice}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col "
          >
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-10 h-10"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {lastOrder?.user.name}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      {orders?.length} Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                    {lastOrder?.user.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {
                        orders?.[orders.length - orders.length]?.shippingAddress
                          .details
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
