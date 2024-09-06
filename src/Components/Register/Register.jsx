import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  let { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: register,
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required!")
          .min(3, "Name length must be more than 2 letters!")
          .max(20, "Name lenght must be less than 20 letters! "),

        email: Yup.string()
          .required("Email is required!")
          .email("Enter valid email!"),

        password: Yup.string()
          .required("Password is required!")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Minimum eight charaters, at least one letter, one number and one special character"
          ),
        rePassword: Yup.string()
          .required("Repassord is required!")
          .oneOf(
            [Yup.ref("password")],
            " Password and repassword must be matched!"
          ),

        phone: Yup.string()
          .required("Phone is required!")
          .matches(/^01[0125][0-9]{8}$/, "The phone number must be egyptian! "),
      }),
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepasswordVisibility = () => {
    setShowRepassword(!showRepassword);
  };
  const [isLoading, setIsLoading] = useState(false);

  async function register() {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setIsLoading(false);
      navigate("/login");

      console.log(data);

      toast.success("Account created successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
        console.log("hii");
        setIsLoading(false);
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="lightBackground dark:darkcustomBackground bg-white ">
        <div className="relative  ">
          <div className="relative p-4 pt-16 ">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-black dark:text-white max-w-xl w-full mb-10 mx-auto shadow-[0_2px_10px_-3px_rgba(26,83,0.3)] p-8 rounded-2xl"
            >
              <div className="pb-12">
                <h3 className="text-black-800 text-3xl font-bold text-center ">
                  Register
                </h3>
              </div>
              <div>
                <label
                  className="text-black-800 text-xs block mb-2 font-semibold dark:text-white"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    type="text"
                    className="w-full bg-transparent text-sm text-gray-800 dark:text-white border-b border-gray-300 focus:border-green-500 px-2 py-3 outline-none focus:outline-none focus:ring-0  focus:ring-green-600"
                    placeholder="Enter name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                {/*! --------------------------Alert--------------------- */}
                {touched.name && errors.name && (
                  <div
                    className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-md mt-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>{errors.name}</p>
                  </div>
                )}
              </div>
              <div className="mt-8 ">
                <label
                  className="text-gray-800 dark:text-white text-xs block mb-2 font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0  focus:ring-green-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit={10}
                        strokeWidth={40}
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      />
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                </div>
                {touched.email && errors.email && (
                  <div
                    className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-md mt-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>{errors.email}</p>
                  </div>
                )}
              </div>
              <div className="mt-8 ">
                <label
                  className="text-gray-800 dark:text-white text-xs block mb-2 font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0  focus:ring-green-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 24 24"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <path d="M12 5c-7.633 0-11.051 6.419-11.498 7.354-.182.374-.182.818 0 1.192.447.935 3.865 7.354 11.498 7.354 7.633 0 11.051-6.419 11.498-7.354.182-.374.182-.818 0-1.192-.447-.935-3.865-7.354-11.498-7.354zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
                    ) : (
                      <path d="M12 19c-7.633 0-11.051-6.419-11.498-7.354-.182-.374-.182-.818 0-1.192.447-.935 3.865-7.354 11.498-7.354 1.876 0 3.605.346 5.148.982l1.612-1.612c.49-.49 1.281-.49 1.771 0 .49.49.49 1.281 0 1.771l-1.573 1.573c1.227 1.081 2.214 2.44 2.94 3.789.182.374.182.818 0 1.192-.447.935-3.865 7.354-11.498 7.354-1.876 0-3.605-.346-5.148-.982l-1.612 1.612c-.49.49-1.281.49-1.771 0-.49-.49-.49-1.281 0-1.771l1.573-1.573c-1.227-1.081-2.214-2.44-2.94-3.789zm7.39-3.179c.348.348.348.916 0 1.264-.348.348-.916.348-1.264 0l-1.774-1.774c-.348-.348-.348-.916 0-1.264s.916-.348 1.264 0l1.774 1.774z" />
                    )}
                  </svg>
                </div>
                {touched.password && errors.password && (
                  <div
                    className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-md mt-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>{errors.password}</p>
                  </div>
                )}
              </div>
              <div className="mt-8 ">
                <label
                  className="text-gray-800 dark:text-white text-xs block mb-2 font-semibold"
                  htmlFor="rePassword"
                >
                  Re-password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="rePassword"
                    type={showRepassword ? "text" : "password"}
                    value={values.rePassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0  focus:ring-green-600 px-2 py-3 outline-none"
                    placeholder="Enter re-password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 24 24"
                    onClick={toggleRepasswordVisibility}
                  >
                    {showRepassword ? (
                      <path d="M12 5c-7.633 0-11.051 6.419-11.498 7.354-.182.374-.182.818 0 1.192.447.935 3.865 7.354 11.498 7.354 7.633 0 11.051-6.419 11.498-7.354.182-.374.182-.818 0-1.192-.447-.935-3.865-7.354-11.498-7.354zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
                    ) : (
                      <path d="M12 19c-7.633 0-11.051-6.419-11.498-7.354-.182-.374-.182-.818 0-1.192.447-.935 3.865-7.354 11.498-7.354 1.876 0 3.605.346 5.148.982l1.612-1.612c.49-.49 1.281-.49 1.771 0 .49.49.49 1.281 0 1.771l-1.573 1.573c1.227 1.081 2.214 2.44 2.94 3.789.182.374.182.818 0 1.192-.447.935-3.865 7.354-11.498 7.354-1.876 0-3.605-.346-5.148-.982l-1.612 1.612c-.49.49-1.281.49-1.771 0-.49-.49-.49-1.281 0-1.771l1.573-1.573c-1.227-1.081-2.214-2.44-2.94-3.789zm7.39-3.179c.348.348.348.916 0 1.264-.348.348-.916.348-1.264 0l-1.774-1.774c-.348-.348-.348-.916 0-1.264s.916-.348 1.264 0l1.774 1.774z" />
                    )}
                  </svg>
                </div>
                {touched.rePassword && errors.rePassword && (
                  <div
                    className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-md mt-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>{errors.rePassword}</p>
                  </div>
                )}
              </div>
              <div className="mt-8 ">
                <label
                  className="text-gray-800 dark:text-white text-xs block mb-2 font-semibold"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="relative flex items-center">
                  <input
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0  focus:ring-green-600 px-2 py-3 outline-none"
                    placeholder="Enter phone"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 512 512"
                  >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </div>
                {touched.phone && errors.phone && (
                  <div
                    className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-md mt-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>{errors.phone}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col justify-center items-center">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all disabled:bg-green-900"
                  disabled={isLoading}
                >
                  Register {isLoading && <ImSpinner9 className="loaderIcon" />}
                </button>
                <p className="text-black text-sm mt-8 text-center">
                  Already have an account?
                  <Link
                    to={"/login"}
                    className="text-green-500 font-semibold hover:underline ml-1"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
