import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- HARDCODED LOGIN CREDENTIALS (from original HTML) ---
    const validUsername = "adminppm";
    const validPassword = "supersecret";
    const adminDashboardPage = "/admin"; // Placeholder for admin dashboard route

    if (username === validUsername && password === validPassword) {
      // Successful Login
      setErrorMessage("");

      // In a real React app, you'd use context/redux for auth state
      // and React Router for navigation.
      alert("Login Berhasil! Mengarahkan ke Dashboard Admin.");
      // window.location.href = adminDashboardPage; // For direct navigation, typically use React Router useNavigate hook

      console.log("Login successful, redirecting to:", adminDashboardPage);
    } else {
      // Failed Login
      setErrorMessage("Nama pengguna atau kata sandi salah. Silakan coba lagi.");
      setPassword(""); // Clear password field on failure
    }
  };

  return (
    <div className="login-page-wrapper"> {/* A wrapper for body styling */}
      <div className="login-container">
        <img src="/assets/logo biru.png" alt="Logo Bappeda" className="logo-login" />
        <h2>Administrator PPM</h2>

        {errorMessage && (
          <div className="alert-message" style={{ display: "block" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            <i className="fas fa-sign-in-alt"></i> MASUK KE DASHBOARD
          </button>
        </form>

        <a href="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Kembali ke Halaman Utama
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
