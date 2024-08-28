import React from "react";

export default function Profile() {
  const userData = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <div className="dark:bg-black py-10">
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full pb-6 shadow-lg rounded-xl pt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-28 h-28 rounded-full"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center pt-5">
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              {userData.role}
            </div>
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {userData.name}
            </h3>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center flex justify-center items-center">
            <p className="font-semibold ">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
