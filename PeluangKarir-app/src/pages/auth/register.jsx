// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userRegister, registerSchema } from "../../utils/apis/auth/index";
import { Toast } from "../../utils/swalToast";
import { v4 as uuidv4 } from "uuid";

function RegisterPage() {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("UserId") || uuidv4();
  const [formData, setFormData] = useState({
    UserId: storedUserId,
    companyName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const {
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleFormChange = (data) => {
    const { name, value } = data.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    console.log("Form submitted");
    console.log("Data yang dikirim ke server:", formData);

    try {
      const result = await userRegister(formData);
      Toast.fire({ icon: "success", title: result.message });
      localStorage.setItem("UserId", formData.UserId);
      navigate("/login");
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 space-y-4">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <form>
          <div className="form-control">
            <label className="label">
              <span>Nama perusahaan</span>
            </label>
            <input
              type="text"
              id="input-companyName"
              aria-label="input-companyName"
              label="companyName"
              name="companyName"
              className={`input input-bordered ${errors.companyName ? "input-error" : ""}`}
              placeholder="Nama"
              value={formData.companyName}
              onChange={handleFormChange}
            />
            {errors.companyName && <span className="text-error">{errors.companyName.message}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span>Email</span>
            </label>
            <input
              type="email"
              id="input-email"
              aria-label="input-email"
              label="email"
              name="email"
              className={`input input-bordered ${errors.email ? "input-error" : ""}`}
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
            />
            {errors.email && <span className="text-error">{errors.email.message}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span>No Telepon</span>
            </label>
            <input
              type="text"
              id="input-phoneNumber"
              aria-label="input-phoneNumber"
              label="phoneNumber"
              name="phoneNumber"
              className={`input input-bordered ${errors.phoneNumber ? "input-error" : ""}`}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleFormChange}
            />
            {errors.phoneNumber && <span className="text-error">{errors.phoneNumber.message}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span>Password</span>
            </label>
            <input
              type="password"
              id="input-password"
              aria-label="input-password"
              label="Password"
              name="password"
              className={`input input-bordered ${errors.password ? "input-error" : ""}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleFormChange}
            />
            {errors.password && <span className="text-error">{errors.password.message}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span>Konfirmasi Password</span>
            </label>
            <input
              type="password"
              id="input-confirmPassword"
              aria-label="input-confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              className={`input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
              placeholder="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
            />
            {errors.confirmPassword && <span className="text-error">{errors.confirmPassword.message}</span>}
          </div>
          <button type="button" className="btn btn-primary w-full mt-10" onClick={handleRegister} disabled={isSubmitting}>
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
