import React, { useContext } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";

import AddToCartButton from "../AddToCartButton/AddToCartButton";

import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../CartServices/CartServices";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import { CartContext } from "../../Context/CartContext";

export default function Product({ product }) {
  const { addProductToCart } = useContext(CartContext);
  return (
    <div>
      <div className="relative mx-auto container flex w-full max-w-xs flex-col overflow-hidden rounded-lg transition-all ease-in-out duration-200 hover:border hover:border-gray-100 dark:border-green-900 bg-white dark:bg-black hover:shadow-[0_2px_10px_-3px_rgba(26,50,0.3)]">
        <div className=" absolute top-8 right-5 z-10 ">
          <AddToWishlistButton
            addProductToWishlist={addProductToWishlist}
            productId={product._id}
            removeProductFromWishlist={removeProductFromWishlist}
            productTitle={product.title}
          />
        </div>
        <Link
          className="relative   mx-3 mt-3 flex justify-center  h-60 overflow-hidden rounded-xl"
          to={"/productdetails/" + product._id}
        >
          <img
            className="object-fit rounded-md"
            src={product.imageCover}
            alt="product image"
          />
        </Link>

        <div className="mt-4 px-5 pb-5">
          <Link to={"/productdetails/" + product._id}>
            <h5 className="text-xl tracking-tight text-[#0aad0a]  line-clamp-1">
              {product.title}
            </h5>
          </Link>
          <p>
            <span className="text-3xl font-bold text-slate-900 dark:text-white my-2">
              {product.price}
              <span className=" text-sm text-yellow-400 ml-2">EGY</span>
            </span>
          </p>
          <div className="mt-2 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((rate) => {
                return (
                  <RatingStars
                    key={rate}
                    rate={rate}
                    ratingsAverage={product.ratingsAverage}
                  />
                );
              })}

              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold ">
                {product.ratingsAverage}
              </span>
            </div>
          </div>

          <AddToCartButton
            addProductToCart={addProductToCart}
            productId={product._id}
          />
        </div>
      </div>
    </div>
  );
}
