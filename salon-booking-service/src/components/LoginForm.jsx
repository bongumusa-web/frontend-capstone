import { useState } from "react";
import { userUserStore } from "../Store/userStore";
import { Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const login = userUserStore((state) => state.login);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking"
      );

      const users = await response.json();

      const user = users.find(
        (u) =>
          u.username === formData.username &&
          u.password === formData.password
      );

      if (user) {
        login(user);
      } else {
        setError("Username or password is incorrect");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-lg shadow-2xl border border-gray-200
                   w-full sm:w-[450px] md:w-[550px]
                   p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-lg font-medium text-gray-700"
          >
            Username
          </label>

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-lg font-medium text-gray-700"
          >
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md
                     hover:bg-blue-600 transition text-lg"
        >
          Login
        </button>

        <Link
          to="/register"
          className="block text-center text-sm text-gray-600 hover:text-gray-800"
        >
          Don't have an account? Register here
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
