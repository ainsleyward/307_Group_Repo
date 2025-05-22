//Login.jsx
import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="bg-[#DED3F1] min-h-screen flex flex-col" style={{ fontFamily: "'Fredoka One', cursive" }}>
      {/* Top label */}
      <div className="text-gray-400 text-sm px-4 pt-2">
        Log in
      </div>

      {/* Header */}
      <header className="flex justify-between items-center bg-[#7B6990] border border-[#3B82F6] px-6 py-3">
        <div className="flex items-center space-x-2">
          <img
            alt="White paw print icon on purple background"
            className="w-8 h-8"
            src="https://storage.googleapis.com/a1aa/image/16088418-9aa2-4dba-6f55-a9bf1669471e.jpg"
            width="32"
            height="32"
          />
          <span className="text-white text-xl">Woofer</span>
        </div>
        <nav className="flex space-x-8 text-white text-base">
          <a className="hover:underline" href="#">Home</a>
          <a className="hover:underline" href="#">About us</a>
          <a className="hover:underline" href="#">Blog</a>
          <a className="hover:underline" href="#">Log in</a>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-black">
        <h1 className="text-4xl mb-10">Let’s Get Woofing</h1>

        <div className="container bg-[#7B6990] rounded-xl p-8 w-full max-w-sm">
          <h2 className="header text-white text-2xl font-bold mb-6">Log in</h2>
          <form className="login-form space-y-5">
            <div>
              <label htmlFor="email" className="block text-white text-xs mb-1 font-normal">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-md px-3 py-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white text-xs mb-1 font-normal">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-md px-3 py-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4B3B66] text-white rounded-md py-2 mt-2"
            >
              Woof Woof!
            </button>
          </form>

          <div className="flex justify-between text-white text-xs mt-6 font-normal">
            <span>Forgot password?</span>
            <a className="underline" href="#">Reset password</a>
          </div>
        </div>

        {/* Sign-up section */}
        <div className="mt-10 w-full max-w-sm flex justify-end text-xs font-bold text-black">
          <div className="text-center">
            <div className="mb-2">Don't have an account?</div>
            <button className="bg-[#7B6990] text-white rounded-full px-4 py-1">
              Sign up!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
