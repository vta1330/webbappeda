import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const KontakPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log("Form submitted:", formData);
    alert("Pesan Anda telah terkirim! (Ini adalah simulasi)");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
  };

  return (
    <>
      <Header />
      <PageHeader
        title="HUBUNGI KAMI"
        description="Kami siap melayani pertanyaan, saran, dan masukan Anda terkait perencanaan pembangunan daerah."
      />

      <section className="container contact-area">
        <div className="contact-details">
          <h2>Informasi Kontak Resmi</h2>

          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <p>
                <strong>Alamat Kantor</strong>
              </p>
              <p>
                Komplek Kantor Bupati Kutai Kartanegara Jl. Wolter Monginsidi
                No.1 Kelurahan Timbau
              </p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <div>
              <p>
                <strong>Telepon Utama</strong>
              </p>
              <p>
                <a href="tel:(0541) 664784">(0541) 664784</a>
              </p>
              <p>Jam Layanan: 08:00 - 16:00 WITA</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <p>
                <strong>Email Resmi</strong>
              </p>
              <p>
                <a href="mailto:bappeda@kukarkab.go.id">
                  bappeda@kukarkab.go.id
                </a>
              </p>
              <p>
                Untuk pertanyaan terkait PPM:{" "}
                <a href="mailto:ppm@bappeda.go.id">ppm@bappeda.go.id</a>
              </p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fab fa-instagram"></i>
            <div>
              <p>
                <strong>Media Sosial</strong>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/bappeda.kutaikartanegara?igsh=MXVtdjM5eW4zNGxuZw=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bappeda.kutaikartanegara
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Kirim Pesan Cepat</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subjek</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Pesan Anda</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              KIRIM PESAN
            </button>
          </form>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.568471465942!2d117.026118!3d-0.457816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67e9b3d1b6e49%3A0x868b8e8b0b92f70b!2sKantor%20Bappeda%20Kaltim!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default KontakPage;
