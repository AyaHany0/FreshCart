import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function ShippingAddress() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const fullUrl = window.location.href;
  const baseUrl = fullUrl.split("/").slice(0, 3).join("/");

  const [isCashPayment, setIsCashPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  let { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        details: "",
        phone: "",
        city: "",
      },
      onSubmit: Shipping,
      validationSchema: Yup.object({
        firstName: Yup.string()
          .required("First Name is required!")
          .min(3, "Name length must be more than 2 letters!")
          .max(20, "Name lenght must be less than 20 letters! "),
        lastName: Yup.string()
          .required("Last Name is required!")
          .min(3, "Name length must be more than 2 letters!")
          .max(20, "Name lenght must be less than 20 letters! "),
        email: Yup.string()
          .required("Email is required!")
          .email("Enter valid email!"),
        phone: Yup.string()
          .required("Phone is required!")
          .matches(/^01[0125][0-9]{8}$/, "The phone number must be egyptian! "),
        city: Yup.string().required("City is required!"),
        details: Yup.string().required("Address details is required!"),
      }),
    });
  async function Shipping() {
    const cash = "https://ecommerce.routemisr.com/api/v1/orders/";
    const online =
      "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/";

    try {
      setIsLoading(true);

      if (isCashPayment) {
        let { data } = await axios.post(
          cash + cartId,
          {
            ShippingAddress: {
              details: values.details,
              phone: values.phone,
              city: values.city,
            },
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        navigate("/allorders");
      } else {
        let { data } = await axios.post(
          online + cartId,
          {
            ShippingAddress: {
              details: values.details,
              phone: values.phone,
              city: values.city,
            },
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
            params: {
              url: baseUrl,
            },
          }
        );

        location.href = data.session.url;
      }

      setIsLoading(false);
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
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);
  async function getUserCart() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCartData(data);
  }
  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <div className="font-[sans-serif] bg-white dark:bg-black p-10 ">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full ">
          <div className="rounded-md bg-gradient-to-r from-[#077d07] via-[#0aad0a] to-[#077d07] sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  <div className="flex flex-col items-start gap-4">
                    {/* product */}
                    {cartData?.data.products.map((product, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-white rounded-md">
                            <img
                              src={product.product.imageCover}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-base text-white dark:text-black font-semibold ">
                              {product.product.title
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </h3>
                            <ul className="text-xs text-white dark:text-black font-semibold space-y-2 mt-2">
                              <li className="flex flex-wrap gap-4">
                                Quantity
                                <span className="ml-auto">{product.count}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price
                                <span className="ml-auto">
                                  {product.count * product.price}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                    {/* end product */}
                  </div>
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-[rgb(10,173,10)] w-full p-4 rounded-md">
                <h4 className="flex flex-wrap gap-4 text-base text-white dark:text-black ">
                  Total
                  <span className="ml-auto">
                    {cartData?.data.totalCartPrice} EGY
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-white dark:text-black">
              Complete your order
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <h3 className="text-base dark:text-white text-black mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-200 text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
                    {touched.firstName && errors.firstName && (
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
                        <p>{errors.firstName}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100  text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
                    {touched.lastName && errors.lastName && (
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
                        <p>{errors.lastName}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100  text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
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
                  <div>
                    <input
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone"
                      type="tel"
                      placeholder="Phone No."
                      className="px-4 py-3 bg-gray-100  text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
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
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-base dark:text-white text-black mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      value={values.details}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="details"
                      type="text"
                      placeholder="Address details"
                      className="px-4 py-3 bg-gray-100  text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
                    {touched.details && errors.details && (
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
                        <p>{errors.details}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="city"
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-gray-100  text-black w-full text-sm rounded-md focus:outline-green-600"
                    />
                    {touched.city && errors.city && (
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
                        <p>{errors.city}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <Link
                    to={"/cart"}
                    className="text-center rounded-md px-6 py-3 w-full text-sm tracking-wide bg-[rgb(10,173,10)] hover:bg-[#077d07] border border-[#077d07] text-white max-md:order-1"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={() => {
                      setIsCashPayment(false);
                    }}
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-[rgb(10,173,10)] hover:bg-[#077d07] text-white flex justify-center items-center"
                  >
                    Complete Purchase Online
                    {isLoading && !isCashPayment && (
                      <ImSpinner9 className="loaderIcon" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsCashPayment(true);
                    }}
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-[rgb(10,173,10)] hover:bg-[#077d07] text-white flex justify-center items-center"
                  >
                    Complete Purchase cash
                    {isLoading && isCashPayment && (
                      <ImSpinner9 className="loaderIcon" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
