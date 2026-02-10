import { useState } from "react";
import { userUserStore } from "../Store/userStore";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const login = userUserStore((state) => state.login);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    //fetch all users
    const response = await fetch(
      "https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking"
    );
    const users = await response.json();
    //check for match
    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (user) {
      login(user); //login via zustand
    } else {
      setError("Username or password is incorrect");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formData.username}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
