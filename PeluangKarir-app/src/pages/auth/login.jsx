// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "daisyui/dist/full.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Lakukan logika otentikasi di sini
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-4 space-y-4">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span>Email</span>
              </label>
              <input type="email" className="input input-bordered" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Password</span>
              </label>
              <input type="password" className="input input-bordered" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-10">
              Login
            </button>
          </form>
          <div className="text-center">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
