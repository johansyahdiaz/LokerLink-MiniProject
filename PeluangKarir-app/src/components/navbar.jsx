import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToken } from "../utils/context/token";
import { Toast } from "../utils/swalToast";
import Swal from "sweetalert2";

export default function Navbar() {
  const { token, changeToken } = useToken();
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const storedCompanyName = localStorage.getItem("companyName");
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, []);

  function handleLogout() {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        changeToken();
        Toast.fire("Logout", "Anda berhasil logout", "success");
      }
    });
  }

  return (
    <header className="w-full sticky top-0">
      <nav className="navbar bg-base-100 bg-opacity-100 backdrop-blur-xl shadow-xl z-30">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Peluang Karir
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1 items-center">
            <li>
              <Link to="/job-catalog">Lowongan Pekerjaan</Link>
            </li>
            <li>
              <Link to="/ChatAI">AI Chat</Link>
            </li>
            <li>
              {token === "" ? (
                <>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <div className="dropdown dropdown-end m-0 p-0">
                    <label tabIndex={0} className="btn btn-ghost">
                      <p>{companyName}</p>
                    </label>
                    <ul tabIndex={0} className="p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52" style={{ marginTop: "130px" }}>
                      <li>
                        <Link to="/profile-dashboard" className="justify-between">
                          Profil Dashboard
                        </Link>
                      </li>
                      <li>
                        <a className="cursor-pointer" onClick={() => handleLogout()}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
