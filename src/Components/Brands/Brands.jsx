import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { motion } from "framer-motion";
export default function Brands() {
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);
  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    setBrands(data);
  }
  const [subBrands, setsubBrands] = useState(null);

  async function getSubBrands(brandId) {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands/" + brandId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    setsubBrands(data);
  }

  const handleOpenModal = (brandId) => {
    getSubBrands(brandId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center dark:bg-black">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
              <div className="flex flex-col jusitfy-center items-center space-y-10">
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-green-600 dark:text-white">
                    Shop By Brand
                  </h1>
                </div>
                <div className="max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-x-8 w-full gap-5 ">
                  {brands?.data.map((brand) => {
                    return (
                      <div key={brand._id}>
                        <div className="relative group flex justify-center items-center h-full w-full rounded-lg transition-all ease-in-out duration-200 hover:border hover:border-gray-100 dark:border-green-900 hover:shadow-[0_2px_10px_-3px_rgba(26,50,0.3)]">
                          <img
                            className="object-fit object-cover h-full w-full rounded-lg"
                            src={brand.image}
                            alt={brand.name}
                          />
                          <button
                            onClick={() => {
                              handleOpenModal(brand._id);
                            }}
                            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 rounded-full bottom-4 z-10 absolute text-base font-medium leading-none  py-3 w-36 bg-[#0aad0a]"
                          >
                            {brand.name}
                          </button>
                          <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 rounded-full bg-[#0aad0a] bg-opacity-50" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Modalllll */}
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isModalOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-55 fixed top-0 right-0 left-0  z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileInView={{ scale: 0.9 }}>
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sub Brands
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4 ">
                <div className="text-center dark:text-white">
                  {
                    <div className="flex justify-evenly items-center">
                      <span className="p-5 border-2 border-green-600 rounded-lg text-black ">
                        {subBrands?.data.name}
                      </span>
                      <img
                        className=" rounded-lg object-cover "
                        src={subBrands?.data.image}
                        alt={subBrands?.data.name}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
