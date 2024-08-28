import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ImSpinner9 } from "react-icons/im";

export default function AddToWishlistButton({
  addProductToWishlist,
  productId,
  removeProductFromWishlist,
  productTitle,
}) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    async function getUserWishlist() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setWishlist(data);
        const wishlistIds = data.data.map((item) => item._id);
        setIsInWishlist(wishlistIds.includes(productId));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUserWishlist();
  }, [productId]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!isInWishlist) {
      setIsInWishlist(true);
      addProductToWishlist(productId);
    } else {
      setIsInWishlist(false);
      removeProductFromWishlist(productId, productTitle, wishlist);
    }
  };

  if (isLoading) {
    return <FaRegHeart className="text-xl text-[#0aad0a]" />;
  }

  return (
    <div>
      <button onClick={handleClick}>
        {isInWishlist ? (
          <FaHeart className="text-xl text-red-600" />
        ) : (
          <FaRegHeart className="text-xl text-[#0aad0a]" />
        )}
      </button>
    </div>
  );
}
