import { FaWindowClose } from "react-icons/fa";
import mainLogo from "../icons/mainLogo.svg";
import { useState } from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useGetUserProfileApiQuery } from "../store/api/user/userApiSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const { data: user } = useGetUserProfileApiQuery("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className="flex items-center justify-between bg-slate-700 p-4 sticky top-0 left-0 z-10 shadow-md">
        <div className="flex items-center">
          <img
            src={mainLogo}
            alt="logo"
            className="w-[40px] sm:w-[60px] ml-3 bg-white rounded-full"
          />
          <h4 className="text-white font-bold ml-3 sm:ml-5 text-lg sm:text-xl">
            TeamLancer
          </h4>
        </div>

        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 py-2 px-4 rounded-lg outline-none text-slate-700"
          />
        </div>

        <nav className="md:flex hidden">
          <ul className="flex gap-8 items-center text-white">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/post"
                className="hover:text-blue-400 transition duration-300"
              >
                Post
              </Link>
            </li>
            <li>
              <Link
                to="/teams"
                className="hover:text-blue-400 transition duration-300"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/inbox"
                className="hover:text-blue-400 transition duration-300"
              >
                Inbox
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <Link to="/profile">
            {user?.imageurl ? (
              <img
                src={user.imageurl}
                alt={user.firstname}
                className="w-10 h-10 mr-3 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white md:ml-4"
              />
            ) : (
              <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-gray-400 ml-4 flex items-center justify-center text-white">
                {user?.firstname?.[0]?.toUpperCase()}
              </div>
            )}
          </Link>
          {toggle ? (
            <FaWindowClose
              className="text-4xl sm:text-5xl text-white cursor-pointer md:hidden"
              onClick={handleToggle}
            />
          ) : (
            <RiMenuFold4Line
              className="text-4xl sm:text-5xl text-white cursor-pointer md:hidden"
              onClick={handleToggle}
            />
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full bg-slate-800 p-6 z-10 transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-4 text-white">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300"
              onClick={handleToggle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/post"
              className="hover:text-blue-400 transition duration-300"
              onClick={handleToggle}
            >
              Post
            </Link>
          </li>
          <li>
            <Link
              to="/teams"
              className="hover:text-blue-400 transition duration-300"
              onClick={handleToggle}
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/inbox"
              className="hover:text-blue-400 transition duration-300"
              onClick={handleToggle}
            >
              Inbox
            </Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-lg outline-none text-slate-700 w-full"
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
