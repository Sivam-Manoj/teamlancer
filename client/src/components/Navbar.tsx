import { FaWindowClose } from "react-icons/fa";
import { RiMenuFold4Line } from "react-icons/ri";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserProfileApiQuery } from "../store/api/user/userApiSlice";
import logo from "/logo.svg";
import { Modal } from "./Model";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useLogoutApiMutation } from "../store/api/auth/authUserApiSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetUserProfileApiQuery("");

  const [logoutApi] = useLogoutApiMutation();
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const handleLogout = async () => {
    await logoutApi("").unwrap();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="flex items-center justify-between bg-slate-700 p-4 sticky top-0 left-0 z-10 shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-10 sm:w-12 ml-5 " />
          <h4 className="text-white font-bold ml-3 sm:ml-5 text-lg sm:text-xl">
            TeamLancer
          </h4>
        </div>

        {/* Centered Navbar Links */}
        <nav className="hidden md:flex flex-1 justify-center">
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
          </ul>
        </nav>

        <div className="flex items-center relative">
          {user && (
            <button onClick={handleProfileClick} className="flex items-center">
              {user?.imageurl ? (
                <>
                  <div className="md:bg-green-500 flex items-center h-[3rem] md:h-11 rounded-full relative right-2 px-4">
                    <span className="hidden md:inline-block text-white font-bold mr-4">
                      {user.firstname} {user.lastname}
                    </span>
                    <img
                      src={user.imageurl}
                      alt={user.firstname}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                </>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  {user?.firstname?.[0]?.toUpperCase()}
                </div>
              )}
            </button>
          )}
          {toggle ? (
            <FaWindowClose
              className="text-4xl text-white cursor-pointer md:hidden"
              onClick={handleToggle}
            />
          ) : (
            <RiMenuFold4Line
              className="text-4xl text-white cursor-pointer md:hidden"
              onClick={handleToggle}
            />
          )}
          {/* Profile Menu Modal */}
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <div className="p-4 w-[8rem]">
                <Link
                  to="/profile"
                  className="block mb-2 text-blue-500 hover:underline"
                >
                  Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block text-blue-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            </Modal>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden fixed top-0 left-0  w-[300px] h-full  bg-slate-800 p-6 z-10 transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-4 text-white text-center gap-y-[3rem]">
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
              Requests
            </Link>
          </li>
        </ul>
        <div className=" absolute bottom-11  text-white">
          TeamLancer&copy; || All Rights Reserved
        </div>
      </nav>
    </>
  );
};

export default Navbar;
