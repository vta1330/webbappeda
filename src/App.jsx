import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import ProgramKerjaPage from "./pages/ProgramKerjaPage";
import BeritaPage from "./pages/BeritaPage";
import ProfilPage from "./pages/ProfilPage";
import PublikasiPage from "./pages/PublikasiPage";
import KontakPage from "./pages/KontakPage";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminJenisDokumenPage from "./pages/AdminJenisDokumenPage";
import AdminKegiatanPage from "./pages/AdminKegiatanPage";
import AdminPublikasiPage from "./pages/AdminPublikasiPage";
import AdminProgramKerjaPage from "./pages/AdminProgramKerjaPage";

import Header from "./components/Header";

/* Layout supaya bisa pakai useLocation */
const AppLayout = () => {
  const location = useLocation();

  // 👉 INI INTINYA
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Header isAdmin={isAdmin} />
      
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<BeritaPage />} />
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/program-kerja" element={<ProgramKerjaPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/publikasi" element={<PublikasiPage />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin-jenisdokumen" element={<AdminJenisDokumenPage />} />
        <Route path="/admin-kegiatan" element={<AdminKegiatanPage />} />
        <Route path="/admin-publikasi" element={<AdminPublikasiPage />} />
        <Route path="/admin-programkerja" element={<AdminProgramKerjaPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
