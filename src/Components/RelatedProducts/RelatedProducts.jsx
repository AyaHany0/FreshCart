import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../CartServices/CartServices";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import { CartContext } from "../../Context/CartContext";

export default function RelatedProducts({ relatedProducts = [] }) {
  const { addProductToCart } = useContext(CartContext);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    draggable: true,
    swipeToSlide: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (relatedProducts.length === 0) {
    return <p>No related products available.</p>;
  }

  return (
    <div>
      <ToastContainer />
      <Slider {...settings}>
        {relatedProducts.map((product, index) => (
          <div key={index}>
            <div className="group flex pb-8 w-full max-w-xs flex-col overflow-hidden container mx-auto text-center">
              <div className="relative flex h-80 w-72 overflow-hidden shadow-md rounded-md">
                <img
                  className="absolute top-0 right-0 h-full w-full object-cover rounded-md"
                  src={product?.imageCover}
                  alt="product image"
                />
                <div className="absolute -right-16 top-5 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                  <button className="flex h-10 w-10 items-center justify-center rounded-md text-white transition">
                    <AddToWishlistButton
                      addProductToWishlist={addProductToWishlist}
                      productId={product?._id}
                      removeProductFromWishlist={removeProductFromWishlist}
                      productTitle={product?.title}
                    />
                  </button>
                  <button
                    onClick={() => addProductToCart(product._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="#0aad0a"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
                <div className="z-[1] rounded-md bg-[#0aad0a64] container mx-auto absolute -bottom-28 transition-all duration-300 group-hover:bottom-0">
                  <Link to={"/productdetails/" + product._id}>
                    <h5 className="mt-3 text-center tracking-tight text-white line-clamp-1">
                      {product?.title}
                    </h5>
                  </Link>
                  <div className="mb-2 flex justify-center">
                    <p>
                      <span className="text-sm font-bold text-black">
                        {product?.price} EGY
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
