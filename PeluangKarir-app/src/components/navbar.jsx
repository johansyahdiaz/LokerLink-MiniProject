// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // Import Link dari React Router

export default function Navbar() {
  return (
    <header className="w-full sticky top-0">
      <nav className="navbar bg-base-100 bg-opacity-100 backdrop-blur-xl">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Peluang Karir
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/jobs">Job</Link>
            </li>
            <li>
              <Link to="/post-job">Post a Job</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
