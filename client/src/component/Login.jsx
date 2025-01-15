import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("User login successfully.");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("Login failed");
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-6 md:mx-8 lg:mx-0">
        <h5 className="text-xl font-bold mb-6 text-center text-gray-800">Login</h5>
        <form onSubmit={handleSubmit}>
          <Toaster position="top-right" />
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold text-sm text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-semibold text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordchange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
          <Link to="/register">
            <button
              className="mt-4 text-sm w-full text-blue-600 hover:text-blue-700 underline transition-colors"
            >
              Don't have an account? Register
            </button>
          </Link>
        </form>
        {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
};
