import { useState } from "react";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../store/slices/authSlice";
import { useResgisterUserApiMutation } from "../../store/api/auth/authUserApiSlice";

const Register = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUserApi, { isError, isLoading }] =
    useResgisterUserApiMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerUserApi({
        name,
        email,
        mobile,
        password,
      }).unwrap();
      dispatch(login(response));
      toast.success("Registration successful");
      navigate("/configure");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {isError && (
          <p className="text-red-600 text-center">Error while registering</p>
        )}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="relative">
            <label
              htmlFor="name"
              className={`absolute left-3 top-2 text-gray-500 text-sm transition-transform transform ${
                nameFocused || name ? "-translate-y-6 text-xs" : "translate-y-0"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={(e) => setNameFocused(e.target.value !== "")}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 top-2 text-gray-500 text-sm transition-transform transform ${
                emailFocused || email
                  ? "-translate-y-6 text-xs"
                  : "translate-y-0"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={(e) => setEmailFocused(e.target.value !== "")}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="mobile"
              className={`absolute left-3 top-2 text-gray-500 text-sm transition-transform transform ${
                mobileFocused || mobile
                  ? "-translate-y-6 text-xs"
                  : "translate-y-0"
              }`}
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              onFocus={() => setMobileFocused(true)}
              onBlur={(e) => setMobileFocused(e.target.value !== "")}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-3 top-2 text-gray-500 text-sm transition-transform transform ${
                passwordFocused || password
                  ? "-translate-y-6 text-xs"
                  : "translate-y-0"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={(e) => setPasswordFocused(e.target.value !== "")}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already a user?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
