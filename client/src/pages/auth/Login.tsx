import { useState } from "react";
import { motion } from "framer-motion";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "../../icons/SvgIcons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginApiMutation } from "../../store/api/auth/authUserApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { RootState } from "../../store/store";

const LoginPage = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [loginApi, { isError, isLoading }] = useLoginApiMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await loginApi({ email, password }).unwrap();
      dispatch(login(response));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const isFormValid = email !== "" && password !== "";

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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {isError && (
          <p className="text-red-600 text-center">Error while logging in</p>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
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
              onBlur={() => setEmailFocused(email !== "")}
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
              onBlur={() => setPasswordFocused(password !== "")}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 ${
              isFormValid && !isLoading ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="my-6 text-center text-gray-500">or login with</div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
            onClick={() => console.log("Login with Google")}
          >
            <GoogleIcon />
            Login with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            onClick={() => console.log("Login with Facebook")}
          >
            <FacebookIcon />
            Login with Facebook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-200"
            onClick={() => console.log("Login with GitHub")}
          >
            <GitHubIcon />
            Login with GitHub
          </motion.button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Not a user?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
