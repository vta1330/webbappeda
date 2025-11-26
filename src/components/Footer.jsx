import React from "react";

const Footer = ({ variant }) => {
  if (variant === "full") {
    return (
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-widget">
            <h3>HUBUNGI KAMI</h3>
            <p>
              Komplek Kantor Bupati Kutai Kartanegara Jl. Wolter Monginsidi No.1
              Kelurahan Timbau
            </p>
            <p>(0541) 664784</p>
            <p>Email:bappeda@kukarkab.go.id</p>
          </div>
          <div className="footer-widget">
            <h3>LINK TERKAIT</h3>
            <ul>
              <li>
                <a href="#">e-Musrenbang</a>
              </li>
              <li>
                <a href="#">Pemerintah Daerah</a>
              </li>
              <li>
                <a href="#">Sistem Informasi</a>
              </li>
            </ul>
          </div>
          <div className="footer-widget">
            <h3>PETA LOKASI</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.568471465942!2d117.026118!3d-0.457816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67e9b3d1b6e49%3A0x868b8e8b0b92f70b!2sKantor%20Bappeda%20Kaltim!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            &copy; 2025 BAPPEDA. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container copyright">
        &copy; 2025 BAPPEDA. Hak Cipta Dilindungi Undang-Undang.
      </div>
    </footer>
  );
};

export default Footer;
