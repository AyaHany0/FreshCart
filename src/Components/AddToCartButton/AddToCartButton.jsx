import React, { useState } from "react";
import style from "./AddToCartButton.module.css";
import yay from "../../assets/sounds/yay-6120.wav";
import { playSound } from "../../CartServices/CartServices";
export default function AddToCartButton({ addProductToCart, productId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);

      addProductToCart(productId);

      playSound(yay);
      setTimeout(() => {
        setIsLoading(false);
      }, 3700);
    }
  };

  return (
    <>
      <button
        className={`${style.button} ${isLoading ? style.loading : ""} `}
        onClick={handleClick}
      >
        <span>Add to cart</span>
        <div className={style.cart}>
          <svg viewBox="0 0 36 26">
            <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
            <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
          </svg>
        </div>
      </button>
    </>
  );
}
