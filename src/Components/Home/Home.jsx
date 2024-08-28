import { motion } from "framer-motion";
import Products from "../Products/Products";
import slider1 from "../../assets/imgs/slider-image-1.jpeg";
import slider2 from "../../assets/imgs/slider-image-3.jpeg";
import mainslider from "../../assets/imgs/slider-2.jpeg";
import mainslider1 from "../../assets/imgs/grocery-banner-2.jpeg";
import mainslider2 from "../../assets/imgs/blog-img-1.jpeg";
import mainslider3 from "../../assets/imgs/slider-image-2.jpeg";

import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setCategories(data?.data);
    setIsLoading(false);
  }

  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let catesettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="dark:bg-dark ">
      <ToastContainer />
      <div className="px-4 md:px-24 h-[700px] md:h-[400px] py-3   dark:bg-black   text-[#0aad0a]">
        <div className="grid grid-cols-12 gap-2">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 col-span-full h-[300px] md:h-[400px]"
          >
            <Slider {...settings}>
              <img
                className="h-[300px] md:h-[400px]  w-full object-cover rounded-md "
                src={mainslider}
                alt="mainslider"
              />
              <img
                className="h-[300px] md:h-[400px]  w-full object-cover rounded-md "
                src={mainslider1}
                alt="mainslider"
              />
              <img
                className="h-[300px] md:h-[400px] w-full object-cover rounded-md "
                src={mainslider2}
                alt="mainslider"
              />
              <img
                className="h-[300px] md:h-[400px] w-full object-cover rounded-md "
                src={mainslider3}
                alt="mainslider"
              />
            </Slider>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 col-span-full h-[300px] md:h-[400px]  "
          >
            <img
              className="h-[200px] w-full object-cover rounded-md pb-2 "
              src={slider1}
              alt="slider1"
            />
            <img
              className="h-[200px] w-full object-cover rounded-md"
              src={slider2}
              alt="slider1"
            />
          </motion.div>
        </div>
      </div>

      <div>
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.5 }}
          className="px-4 md:px-24 py-8 dark:bg-black text-center font-semibold  text-[#0aad0a] "
        >
          <Slider
            {...catesettings}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
          >
            {categories?.map((cate) => {
              return (
                <motion.div
                  whileHover={{ scale: 0.9 }}
                  key={cate._id}
                  className="p-2"
                >
                  <Link to={"/categories"}>
                    <img
                      src={cate.image}
                      alt={cate.name}
                      className="h-[150px] md:h-[200px] w-full object-cover rounded-md"
                    />
                    <h3 className="text-base pt-2">{cate.name}</h3>
                  </Link>
                </motion.div>
              );
            })}
          </Slider>
        </motion.div>
      </div>

      <div className="z-10">
        <Products />
      </div>
    </div>
  );
}
