import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function Login(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("🚫 Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier: formData.username || formData.email,
        password: formData.password,
      });

      alert("✅ Login success");
      console.log(res.data);
      console.log("Returned username:", res.data.username);

      // 👇 This triggers switch to JoinForm
      console.log("Passing username to JoinForm:", res.data.user.username);
      props.onLoginSuccess(res.data.user.username, res.data.user.email);
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        <div className="hidden md:flex w-1/3 bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-8 flex-col justify-center">
          <h2 className="text-3xl font-bold mb-1">👋 Hey There!</h2>
          <p className="text-sm text-purple-100">
            {isLogin ? "Welcome back 💜" : "Glad to have you here! 🌈"}
          </p>
        </div>

        <div className="w-full md:w-2/3 p-8 text-white">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {isLogin ? "🔐 Login" : "🎉 Sign Up"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="👤 Full Name"
                  className="auth-input"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="📛 Username"
                  className="auth-input"
                  onChange={handleChange}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              className="auth-input"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="🔑 Password"
              className="auth-input"
              onChange={handleChange}
            />
            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="🔁 Retype Password"
                  className="auth-input"
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="📱 Phone Number"
                  className="auth-input"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dob"
                  className="auth-input"
                  onChange={handleChange}
                />
              </>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-800 transition py-2 rounded-md shadow-lg font-semibold tracking-wide hover:scale-105 duration-300"
            >
              {isLogin ? "✨ Let's Go" : "🚀 Create Account"}
            </button>
          </form>
          <p className="text-sm mt-4 text-purple-100 text-center">
            {isLogin ? "New here?" : "Already with us?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-purple-300 hover:text-white underline cursor-pointer"
            >
              {isLogin ? "Sign Up 💫" : "Login 🔁"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
