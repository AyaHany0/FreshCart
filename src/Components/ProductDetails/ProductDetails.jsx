import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ImageSlider from "./ImageSlider";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../CartServices/CartServices";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  let { id } = useParams();
  const [productdetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    console.log(data.data);
    setProductDetails(data.data);
    getRelatedProducts(data.data?.category._id);
    setIsLoading(false);
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);
  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/",
      {
        params: {
          category: categoryId,
        },
      }
    );
    console.log(data.data);
    setRelatedProducts(data.data);
  }
  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <ToastContainer />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="bg-white dark:bg-black dark:text-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li>
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="mr-2 text-sm font-medium text-green-700 dark:text-white"
                      >
                        {productdetails?.category.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-green-700 dark:text-white"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="mr-2 text-sm font-medium text-green-700 dark:text-white"
                      >
                        {productdetails?.subcategory[0].name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-green-700 dark:text-white"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                  <li className="text-sm">
                    <a
                      href="#"
                      aria-current="page"
                      className="font-medium text-green-700 dark:text-white hover:text-green-500"
                    >
                      {productdetails?.title}
                    </a>
                  </li>
                </ol>
              </nav>
              {/* Image gallery */}
              <ImageSlider productdetails={productdetails} />

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-green-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-green-700 dark:text-white sm:text-3xl">
                    {productdetails?.title}
                  </h1>
                </div>
                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0 text-center">
                  <div className="flex justify-between items-center">
                    <h2 className="sr-only text-black">Product information</h2>
                    <p className="text-3xl tracking-tight text-green-700 dark:text-white text-left">
                      {productdetails?.price} EGP
                    </p>
                    <div className="text-right">
                      <AddToWishlistButton
                        addProductToWishlist={addProductToWishlist}
                        productId={productdetails?._id}
                        removeProductFromWishlist={removeProductFromWishlist}
                        productTitle={productdetails?.title}
                      />
                    </div>
                  </div>
                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mb-4 justify-center">
                        {/* Active: "text-gray-900", Default: "text-gray-200" */}
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="ml-2 ">
                          {productdetails?.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <AddToCartButton
                    addProductToCart={addProductToCart}
                    productId={productdetails?._id}
                  />
                </div>
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <p className="text-base text-green-700 dark:text-white">
                        {productdetails?.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-md font-semibold text-green-700 dark:text-white">
                      Brand
                    </h3>
                    <div className="mt-4">
                      <div className="text-green-800 dark:text-white flex justify-start items-center ">
                        <h5>{productdetails?.brand.name}</h5>
                        <div className="w-20 h-14 ml-10 border-[1px] rounded-2xl p-2  border-green-500 ">
                          <img
                            src={productdetails?.brand.image}
                            alt={productdetails?.brand.name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto  max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="font-bold text-2xl text-green-700 dark:text-white mb-8">
                More Products
              </h1>
              <RelatedProducts relatedProducts={relatedProducts} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
