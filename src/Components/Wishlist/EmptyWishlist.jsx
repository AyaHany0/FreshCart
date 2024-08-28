import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

export default function EmptyWishlist() {
  return (
    <div className=" pt-8 dark:text-white dark:bg-black text-center  font-semibold flex flex-col gap-3 justify-center items-center ">
      <h1>Wishlist: A collection of dreams waiting to come true.</h1>
      <h3>Wishlist Now!!!</h3>
      <DotLottieReact
        src="https://lottie.host/0c84ebb3-6b05-453c-a694-773d47ad9b8e/ZYaZfQ48l3.json"
        loop
        autoplay
        className="w-[400px] h-[400px]  mb-5"
      />
    </div>
  );
}
