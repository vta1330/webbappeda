import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ isAdmin = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container navbar">
        
        {/* LOGO */}
        <div className="logo-wrapper">
          <img
            src="/assets/logo 1.png"
            alt="Logo Bappeda"
            className="logo-img"
          />
          {isAdmin && <span className="admin-badge">ADMIN PANEL</span>}
        </div>

        {/* NAV */}
        <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/">BERANDA</Link>
          <Link to="/profil">PROFIL</Link>
          <Link to="/program-kerja">PROGRAM KERJA</Link>
          <Link to="/publikasi">PUBLIKASI</Link>
          <Link to="/kontak">KONTAK</Link>
        </nav>

        {/* BUTTON */}
        <div className="nav-extra">
          <button className="menu-toggle" onClick={handleMenuToggle}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
