import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout, loginSuccess, allBlog } from "../redux/UserSlice";
import USER_API_END_POINT from './Constant';
import toast from "react-hot-toast";

function Header() {
  const [isToggled, setToggled] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setToggled(!isToggled);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${USER_API_END_POINT}/logout`, {
        method: "POST",
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Logout failed");
        return;
      }
      dispatch(logout());
      toast.success(data.message);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <header className="w-full h-16 bg-black text-white sticky top-0 z-[1000] flex justify-center">
      <nav className="w-[80%] flex mx-auto items-center justify-between">
        <div className="font-bold text-2xl">Vikas Patel</div>
        <ul className="md:flex gap-10 text-xl hidden">
          <li className="cursor-pointer">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink
              to="/post"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-200"
              }
            >
              Post
            </NavLink>
          </li>
        </ul>

        <Link to="/login">
          <button
            className="hidden bg-red-600 p-2 rounded-sm text-sm md:block"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>

        <div className="md:hidden text-4xl" onClick={handleClick}>
          <button><IoMenu /></button>
        </div>
      </nav>
      <ul
        className={`md:hidden gap-4 text-xl bg-black w-full p-4 absolute z-20 ${
          isToggled ? "flex flex-col items-center" : "hidden"
        }`}
      >
       <div className=" flex w-full justify-end cursor-pointer text-4xl" onClick={handleClick} > 
       <RxCross2 />
       </div>
        <li className="cursor-pointer" onClick={handleClick}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-white"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="cursor-pointer" onClick={handleClick}>
          <NavLink
            to="/post"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-white"
            }
          >
            Post
          </NavLink>
        </li>
        <li className="cursor-pointer" onClick={handleClick}>
        <Link to="/login">
          <button
            className=" bg-red-600 p-2 rounded-sm text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
