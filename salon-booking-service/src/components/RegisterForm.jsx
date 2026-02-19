import { useState } from "react";
import { userUserStore } from "../Store/userStore";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const login = userUserStore((state) => state.login);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            bookings: [],
          }),
        }
      );

      const newUser = await response.json();
      login(newUser);
    } catch (error) {
      console.log("Error creating user:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white rounded-lg shadow-2xl border border-gray-200
                   w-full sm:w-[450px] md:w-[550px]
                   p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Surname */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Surname
          </label>
          <input
            name="surname"
            placeholder="Surname"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Username
          </label>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email@gmail.com"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md
                     hover:bg-pink-600 transition text-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
