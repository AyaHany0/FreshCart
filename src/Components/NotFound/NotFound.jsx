import React from "react";
import notfound from "../../assets/imgs/notfound.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="bg-gray-900 flex items-center justify-items-start h-screen notfound ">
        <div>
          <h1 className="text-white text-5xl font-bold ml-8 dark:text-green-400">
            Go Home, You're Drunk!
          </h1>

          <a
            href="/"
            className="inline-block mt-8 ml-8 px-8 py-3 bg-green-400  dark:text-green-950 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
