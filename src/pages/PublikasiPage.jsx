import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import usePublikasi from "../hooks/usePublikasi";
import PublicationCard from "../components/PublicationCard";

const PublikasiPage = () => {
  const { publikasi, jenisDokumen, loading, error, typeMap } = usePublikasi();

  const [filteredPublikasi, setFilteredPublikasi] = useState([]);
  const [activeTypeFilter, setActiveTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const applyFilters = () => {
      let currentFiltered = publikasi || []; // Ensure publikasi is not null/undefined

      // Filter by type
      if (activeTypeFilter !== "all") {
        currentFiltered = currentFiltered.filter((pub) => {
          const typeKey = pub.jenisDokumen.nama
            .toLowerCase()
            .replace(/\s+/g, "");
          return typeKey === activeTypeFilter;
        });
      }

      // Filter by search term (title only for now)
      if (searchTerm) {
        currentFiltered = currentFiltered.filter((pub) =>
          pub.judul.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }
      setFilteredPublikasi(currentFiltered);
    };

    applyFilters();
  }, [publikasi, activeTypeFilter, searchTerm]);

  // Utility function for date formatting (moved from old JS to be passed as prop)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Header />
      <PageHeader
        title="DOKUMEN & PUBLIKASI BIDANG PEMBANGUNAN MANUSIA"
        description="Akses dan unduh laporan, data, dan hasil kajian terkini terkait IPM, pendidikan, dan kesehatan."
      />

      {loading && (
        <div
          className="container"
          style={{ textAlign: "center", padding: "20px" }}
        >
          Memuat publikasi...
        </div>
      )}
      {error && (
        <div
          className="container"
          style={{ textAlign: "center", padding: "20px", color: "red" }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="container">
            <div className="filter-area">
              <div className="filter-select">
                <label htmlFor="type-filter" className="sr-only">
                  Filter Berdasarkan Jenis Dokumen
                </label>
                <select
                  id="type-filter"
                  value={activeTypeFilter}
                  onChange={(e) => setActiveTypeFilter(e.target.value)}
                >
                  <option value="all">Filter Berdasarkan Jenis Dokumen</option>
                  {jenisDokumen.map((jd) => (
                    <option
                      key={jd.id}
                      value={jd.nama.toLowerCase().replace(/\s+/g, "")}
                    >
                      {jd.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-box">
                <label htmlFor="search-input" className="sr-only">
                  Cari Judul Publikasi
                </label>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Cari Judul Publikasi (mis: Stunting 2024)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </section>

          <section className="container publication-grid" id="publication-list">
            {filteredPublikasi.length > 0 ? (
              filteredPublikasi.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  pub={pub}
                  formatDate={formatDate}
                  typeMap={typeMap}
                />
              ))
            ) : (
              <div className="no-publications">
                Tidak ada publikasi yang ditemukan.
              </div>
            )}
          </section>
        </>
      )}

      <Footer />
    </>
  );
};

export default PublikasiPage;
