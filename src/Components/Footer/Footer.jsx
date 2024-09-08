import React from "react";
import { FaShareAlt } from "react-icons/fa";

const paymentPartner = Object.values(
  import.meta.glob(
    "../../assets/imgs/paymentPartner/*.{png,jpg,jpeg,PNG,JPEG,svg}",
    {
      eager: true,
      as: "url",
    }
  )
);
const appsOption = Object.values(
  import.meta.glob(
    "../../assets/imgs/appsOption/*.{png,jpg,jpeg,PNG,JPEG,svg}",
    {
      eager: true,
      as: "url",
    }
  )
);

export function Footer() {
  return (
    <footer>
      <div className="bg-[#f0f3f2] py-10 dark:bg-black dark:text-white border-t-[0.5px] dark:border-gray-700 border-gray-200">
        <div className=" container mx-auto px-4 lg:px-8 xl:px-10">
          <h2 className="text-2xl leading-5 mb-4 font-medium ">
            Get the freshCart app
          </h2>
          <p className="text-[#6c757d] mb-3">
            We will send you a link, open it on your phone to download the app
          </p>
          <div className=" w-full">
            <form className="grid grid-cols-1 sm:grid-cols-4 gap-4 ">
              <div className=" sm:col-span-full md:col-span-3  ">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-6 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2 grid self-center  ">
                <button className="inline-flex  col-span-2 items-center flex-nowrap self-center text-center justify-center font-bold leading-6 py-2 px-3 ms-2 text-sm text-white bg-[#0aad0a] rounded-lg border border-green-700 hover:bg-[#2bbf09] focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 whitespace-nowrap">
                  <FaShareAlt className="mr-2" />
                  Share App Link
                </button>
              </div>
              {/* <button
                type="submit"
                className="lg:col-span-1 place-items-center	 inline-flex items-centerwhitespace-nowrap	 text-center justify-center font-bold leading-6 py-2 px-3 ms-2 text-sm  text-white bg-[#0aad0a] rounded-lg border border-green-700 hover:bg-[#2bbf09] focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <FaShareAlt className="mr-2" />
                Share App Link
              </button> */}
            </form>
          </div>
          <div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex flex-col lg:flex-row  justify-between items-center  py-3 ">
              <ul className=" list-none flex text-center sm:justify-start my-2 md:mr-2">
                <li className="mt-1">Payment Partners</li>

                {paymentPartner.map((p, index) => {
                  return (
                    <li key={index}>
                      <img
                        src={p}
                        className=" w-[60px] h-[40px] align-middle  mx-2 object-contain"
                        alt="Payment Method"
                      />
                    </li>
                  );
                })}
              </ul>

              <ul className=" list-unstyled flex items-center sm:justify-end my-2 md:ml-2">
                <li className="">Get deliveries with FreshCart</li>

                {appsOption.map((p, index) => {
                  return (
                    <li key={index}>
                      <img
                        src={p}
                        alt="App option"
                        className="w-[100px] ml-3"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2024 FreshCart eCommerce. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
