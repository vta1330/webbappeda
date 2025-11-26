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
        setIsMenuOpen(false); // Close menu on desktop size
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="container navbar">
        <div>
          <img src="/assets/logo 1.png" alt="Logo Bappeda" />
          {isAdmin && <span>ADMIN PANEL</span>}
        </div>
        <nav className={`main-nav ${isMenuOpen ? "main-nav-mobile-open" : ""}`}>
          <Link to="/">BERANDA</Link>
          <Link to="/profil">PROFIL</Link>
          <Link to="/program-kerja" className="active">
            PROGRAM KERJA
          </Link>
          <Link to="/publikasi">PUBLIKASI</Link>
          <Link to="/kontak">KONTAK</Link>
        </nav>
        <div className="nav-extra">
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
          <button className="menu-toggle" onClick={handleMenuToggle}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
