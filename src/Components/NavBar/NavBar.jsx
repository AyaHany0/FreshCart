import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/freshcart-logo.svg";
import darkMode from "../../assets/sounds/darkMode.wav";
import brightMode from "../../assets/sounds/brightMode.wav";
import lightlogo from "../../assets/imgs/freshcart-whitelogo.svg";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { MdLogin } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { AuthContext } from "../../Context/AuthContext";
import { playSound } from "../../CartServices/CartServices";
import { CartContext } from "../../Context/CartContext";

export function NavBar() {
  const { CartCount } = useContext(CartContext);
  const navigate = useNavigate();
  let { userToken, setUserToken } = useContext(AuthContext);
  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userEmail");

    navigate("/login");
  }
  const [isDarkMode, setIsDarkMode] = useState(false);

  const ref = useRef(document.querySelector("html"));

  function toggleDarkFn() {
    ref.current.classList.toggle("dark", isDarkMode);
  }
  useEffect(() => {
    toggleDarkFn();
  }, [isDarkMode]);

  return (
    <nav className="bg-white z-[10000] border-gray-200 dark:bg-black">
      <div className="max-w-screen-xl flex gap-5 flex-wrap items-center mx-auto p-4">
        <a className="flex  text-3xl items-center space-x-3 rtl:space-x-reverse ">
          <img src={isDarkMode ? lightlogo : logo} alt="FreshCart" />
        </a>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex ms-auto items-center  p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className="hidden w-full grow  xl:flex justify-between xl:w-auto z-[10000] bg-white dark:bg-black "
          id="navbar-default"
        >
          <ul className="font-medium z-[10000] flex items-center flex-col p-4 xl:p-0 mt-4 border border-gray-100 rounded-xl bg-gray-50 xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-white dark:bg-black xl:dark:bg-black dark:border-gray-700">
            {userToken && (
              <>
                <li>
                  <NavLink
                    to=""
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="wishlist"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <span>Cart</span>

                      <div className="ml-3 relative  ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="h-7 w-7  "
                        >
                          <path
                            fill="#0aad0a"
                            d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                          />
                        </svg>
                        <span className=" text-center font-extrabold text-[10px] absolute -top-2 left-4 px-1 py-0.5 rounded-lg text-black border-green-400 border-[1px] dark:text-white  bg-white dark:bg-black">
                          {CartCount}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="font-medium flex items-center flex-col p-4 xl:p-0 mt-4 border border-gray-100 rounded-xl bg-gray-50 xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-white dark:bg-black xl:dark:bg-black dark:border-gray-700">
            {!userToken && (
              <>
                <li>
                  <Link
                    to="login"
                    className="flex items-center justify-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Log In <MdLogin className="ml-1 mt-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="register"
                    className="flex items-center justify-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Register <RxAvatar className="ml-1 mt-1" />
                  </Link>
                </li>
              </>
            )}

            {userToken && (
              <>
                <li>
                  <Link to={"/profile"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-7 h-7 bg-white p-1 rounded-full dark:text-white dark:bg-white"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={signOut}
                    className="flex items-center justify-center cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Log Out <PiSignOutBold className="ml-1 mt-1" />
                  </button>
                </li>
              </>
            )}
            <li>
              <ToggleMode
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </li>

            <li className="flex gap-4">
              <a
                to="#"
                className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaFacebook />
              </a>
              <a
                to="#"
                className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaTwitter />
              </a>
              <a
                to="#"
                className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaYoutube />
              </a>
              <a
                to="#"
                className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaTiktok />
              </a>
              <a
                to="#"
                className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaInstagram />
              </a>
              <a
                to="#"
                className="block  cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function ToggleMode({ isDarkMode, setIsDarkMode }) {
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      playSound(darkMode);
    } else {
      playSound(brightMode);
    }
  };
  return (
    <>
      <button
        onClick={toggleMode}
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-xl text-sm p-2.5"
      >
        {isDarkMode ? (
          <svg
            id="theme-toggle-light-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            id="theme-toggle-dark-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </>
  );
}
