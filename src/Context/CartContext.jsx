import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { playSound } from "../CartServices/CartServices";
import sadSound from "../assets/sounds/remove.wav";
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [CartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserCart();
  }, []);
  useEffect(() => {
    if (cart) {
      setUserId(cart?.data.cartOwner);
      localStorage.setItem("userId", cart?.data.cartOwner);
    }
  }, [cart]);
  async function getUserCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);

      setCartCount(data.numOfCartItems);
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      setCartCount(data.numOfCartItems);
      toast.success("Added to Cart! Happy Shopping");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }
  async function removeProductFromCart(productId, productTitle) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      setCartCount(data.numOfCartItems);
      toast.error(
        `${productTitle.split(" ").slice(0, 8).join(" ")} is removed! `
      );
      playSound(sadSound);
    } catch (error) {
      toast.error("Failed to remove product from cart");
    }
  }
  async function clearCart() {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(null);
    setCartCount(0);
  }
  return (
    <CartContext.Provider
      value={{
        CartCount,
        getUserCart,
        setCartCount,
        addProductToCart,
        removeProductFromCart,
        setCart,
        cart,
        isLoading,
        setIsLoading,
        userId,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
