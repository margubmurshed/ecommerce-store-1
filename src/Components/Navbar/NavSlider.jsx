import { memo } from "react";
import { Menu } from "@material-ui/icons";
const NavSlider = ({ toggleState, Toggle }) => {
  console.log("Nav Slider Render");
  return (
    <>
      <div
        className="top-0 h-full w-62 bg-white flex flex-col px-5 py-3 fixed gap-y-4 z-50 shadow-xl"
        style={
          toggleState
            ? {
                left: "-100%",
                transition: "left 1s ease-in-out",
              }
            : {
                left: "0",
                transition: "left 0.5s ease",
              }
        }
      >
        <div className="flex items-center gap-x-2">
          <Menu
            className="cursor-pointer text-3xl important"
            onClick={Toggle}
          />
          <a
            href="/"
            className="font-bold text-xl px-5 py-3 rounded-xl transition-all"
          >
            E-
            <span className="text-blue-600 font-semibold lowercase">
              Commerce
            </span>
          </a>
        </div>
        <ul className="flex flex-col gap-y-3">
          <li className="bg-gray-100 p-3 rounded-xl cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <a href="/">Home</a>
          </li>
          <li className="bg-gray-100 p-3 rounded-xl cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <a href="/contact">Contact</a>
          </li>
          <li className="bg-gray-100 p-3 rounded-xl cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <a href="/about">About</a>
          </li>
          <li className="bg-gray-100 p-3 rounded-xl cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <a href="/blog">Blog</a>
          </li>
          <li className="bg-gray-100 p-3 rounded-xl cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <a href="/shop">Shop</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default memo(NavSlider);
