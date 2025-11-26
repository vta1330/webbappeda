import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProgramKerjapages from "./pages/ProgramKerjaPage";
import Beritapages from "./pages/BeritaPage";
import Profilpages from "./pages/ProfilPage";
import Publikasipages from "./pages/PublikasiPage";
import AdminDashboardpages from "./pages/AdminDashboardPage";
// import Loginpages from "./pages/LoginPage";
import AdminJenisDokumenpages from "./pages/AdminJenisDokumenPage";
import AdminKegiatanpages from "./pages/AdminKegiatanPage";
import AdminPublikasipages from "./pages/AdminPublikasiPage";
import AdminProgramKerjapages from "./pages/AdminPublikasiPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Changed to Loginpages */}
        <Route path="/" element={<Beritapages />} />
        <Route path="/program-kerja" element={<ProgramKerjapages />} />
        <Route path="/profil" element={<Profilpages />} />
        <Route path="/publikasi" element={<Publikasipages />} />
        <Route path="/admin" element={<AdminDashboardpages />} />
        <Route
          path="/admin-jenisdokumen"
          element={<AdminJenisDokumenpages />}
        />
        <Route path="/admin-kegiatan" element={<AdminKegiatanpages />} />
        <Route path="/admin-publikasi" element={<AdminPublikasipages />} />
        <Route
          path="/admin-programkerja"
          element={<AdminProgramKerjapages />}
        />
        {/* Add more routes for other pagess */}
        <Route path="/news/:id" element={<p>News Detail</p>} />{" "}
        {/* Example detail pages */}
        {/*  Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
