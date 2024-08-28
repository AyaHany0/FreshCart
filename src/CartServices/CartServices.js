import axios from "axios";
import { toast } from "react-toastify";
import yay from "../assets/sounds/yay-6120.wav";
import sadSound from "../assets/sounds/remove.wav";

export function playSound(soundName) {
  new Audio(soundName).play();
}

export async function addProductToWishlist(productId) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  toast.success("Added to Wishlist! ");
  playSound(yay);
  console.log(data);
}

export async function removeProductFromWishlist(
  productId,
  productTitle,
  setWishlist,
  getUserWishlist
) {
  let { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  toast.error(
    `${productTitle
      ?.split(" ")
      .slice(0, 5)
      .join(" ")} is removed from wishlist! `
  );
  let { wishdata } = getUserWishlist();
  playSound(sadSound);
  setWishlist(wishdata);
  console.log(data);
}
export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const [datePart, timePart] = formattedDate.split(", ");

  return `${datePart} at ${timePart}`;
}
