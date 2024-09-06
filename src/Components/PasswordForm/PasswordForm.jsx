import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet";

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: forgetPassword,
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required!")
          .email("Enter valid email!"),
      }),
    });

  async function forgetPassword() {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords ",
        values
      );
      console.log(data);
      setIsLoading(false);

      toast.success("Password reset link has been sent to your email!");
      setTimeout(() => {
        navigate("/verifycode");
      }, 600);
      localStorage.setItem("userEmail", values.email);
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
  return (
    <div>
      <Helmet>
        <title>Password Form</title>
      </Helmet>
      <div className="relative lightBackground dark:darkBackground ">
        <div className="relative p-4 pt-16 dark:text-white">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-black max-w-xl text-center w-full mx-auto shadow-[0_2px_10px_-3px_rgba(26,83,0.3)] p-8 rounded-2xl mb-10"
          >
            <div>
              <h3 className="text-black-800 text-3xl font-bold text-center mb-6">
                Forget password?
              </h3>
              <hr class="h-px mt-6 mx-8 bg-green-400 border-0 dark:bg-gray-700 "></hr>

              <p className="mt-4 ">
                Please enter your email address to search for your account.
              </p>
            </div>

            <div className="mt-4">
              <label
                className="text-gray-800 text-s block mb-2 font-bold dark:text-white"
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
                  className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-green-900 focus:outline-none focus:ring-0  focus:ring-green-600 px-2 py-3 outline-none"
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

            <div className="mt-8">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center items-center  disabled:bg-green-900 shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all"
              >
                Search {isLoading && <ImSpinner9 className="loaderIcon" />}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
