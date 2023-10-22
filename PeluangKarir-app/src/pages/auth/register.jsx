// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "daisyui/dist/full.css";
import { Link } from "react-router-dom"; // Pastikan Anda mengganti ini sesuai dengan routing di aplikasi Anda

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Lakukan logika pendaftaran di sini
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 space-y-4">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span>Nama</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span>Konfirmasi Password</span>
            </label>
            <input type="password" className="input input-bordered" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-10">
            Daftar
          </button>
        </form>
        <div className="text-center">
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="text-primary">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
