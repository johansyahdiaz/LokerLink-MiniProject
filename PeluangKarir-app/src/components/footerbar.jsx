import React from "react";

function Footer() {
  return (
    <div className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <img src="./logo.svg" width={"100"} height={"100"} alt="gambar logo" />
        <p>
          Pluang-Karir
          <br />
          Your Trusted Job Portal
        </p>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <a className="link link-hover">Job Listings</a>
        <a className="link link-hover">Career Advice</a>
        <a className="link link-hover">Employer Services</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Partnerships</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of Use</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </nav>
    </div>
  );
}

export default Footer;
