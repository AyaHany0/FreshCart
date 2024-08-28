import React, { useState } from "react";

export default function ImageSlider({ productdetails }) {
  const [currentImg, setCurrentImg] = useState(productdetails.imageCover);
  const [activeIndex, setActiveIndex] = useState(0);

  function newImg(img, index) {
    setCurrentImg(img);
    setActiveIndex(index);
  }
  const displayedImages = productdetails?.images?.slice(0, 5);
  return (
    <div className="p-5">
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col gap-4">
          {displayedImages.map((img, index) => (
            <img
              key={index}
              src={img || productdetails.imageCover}
              onClick={() => newImg(img, index)}
              alt={productdetails?.title}
              className={`w-[100px] h-[100px] rounded-md object-cover cursor-pointer ${
                activeIndex === index ? "border-2 border-green-500 " : ""
              }`}
            />
          ))}
        </div>
        <div>
          <img
            src={currentImg}
            alt="Selected"
            className="h-[480px] w-[480px] rounded-md object-cover "
          />
        </div>
      </div>
    </div>
  );
}
