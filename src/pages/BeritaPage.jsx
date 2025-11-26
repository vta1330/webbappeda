import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const BeritaPage = () => {
  // Mock data berita
  const news = [
    {
      id: 1,
      type: "berita",
      title: "Rapat Koordinasi Penyusunan RPJMD",
      content:
        "BAPPEDA mengadakan rapat koordinasi dengan stakeholder terkait penyusunan Rencana Pembangunan Jangka Menengah Daerah (RPJMD) tahun 2025-2029.",
      date: "2025-09-12",
      category: "berita",
      image: "/assets/1.jpg",
      year: 2025,
    },
    {
      id: 2,
      type: "kegiatan",
      title: "Sosialisasi Perda Tata Ruang Terbaru",
      content:
        "Sosialisasi Peraturan Daerah tentang Tata Ruang Wilayah Kabupaten Kutai Kartanegara kepada masyarakat dan stakeholder.",
      date: "2025-07-31",
      category: "kegiatan",
      image: "/assets/2.jpg",
      year: 2025,
    },
    {
      id: 3,
      type: "berita",
      title: "Pelatihan Kapasitas SDM Perencanaan",
      content:
        "Program pelatihan untuk meningkatkan kapasitas Sumber Daya Manusia di bidang perencanaan pembangunan daerah.",
      date: "2025-09-29",
      category: "berita",
      image: "/assets/3.jpg",
      year: 2025,
    },
    {
      id: 4,
      type: "pengumuman",
      title: "Pengumuman Pembukaan Lelang Proyek Infrastruktur",
      content:
        "BAPPEDA mengumumkan pembukaan lelang untuk proyek-proyek infrastruktur strategis di wilayah kabupaten.",
      date: "2025-08-15",
      category: "pengumuman",
      image: "/assets/placeholder.jpg",
      year: 2025,
    },
    {
      id: 5,
      type: "kegiatan",
      title: "Workshop Evaluasi Pembangunan Daerah",
      content:
        "Workshop evaluasi capaian pembangunan daerah tahunan melibatkan berbagai OPD dan akademisi.",
      date: "2024-11-20",
      category: "kegiatan",
      image: "/assets/placeholder.jpg",
      year: 2024,
    },
    {
      id: 6,
      type: "berita",
      title: "Kunjungan Kerja DPR RI ke BAPPEDA",
      content:
        "Delegasi DPR RI melakukan kunjungan kerja untuk meninjau progres pembangunan di Kutai Kartanegara.",
      date: "2024-10-01",
      category: "berita",
      image: "/assets/placeholder.jpg",
      year: 2024,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeYear, setActiveYear] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 3;

  // Filtered news dihitung langsung
  const filteredNews = news
    .filter((item) =>
      activeCategory === "all" ? true : item.category === activeCategory,
    )
    .filter((item) =>
      activeYear === "all" ? true : item.year.toString() === activeYear,
    )
    .filter((item) =>
      searchTerm === ""
        ? true
        : item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Utility
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  return (
    <>
      <Header />
      <PageHeader
        title="BERITA & KEGIATAN"
        description="Informasi terkini tentang kegiatan dan program BAPPEDA Bidang PPM"
      />

      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="category-filter">Kategori</label>
              <select
                id="category-filter"
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">Semua Kategori</option>
                <option value="berita">Berita</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pengumuman">Pengumuman</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="year-filter">Tahun</label>
              <select
                id="year-filter"
                value={activeYear}
                onChange={(e) => {
                  setActiveYear(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">Semua Tahun</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="search-input">Cari Berita</label>
              <input
                type="text"
                id="search-input"
                placeholder="Kata kunci..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container news-content">
        <div className="news-full-grid" id="news-container">
          {currentNews.length > 0 ? (
            currentNews.map((item) => (
              <div className="news-full-card" key={item.id}>
                <div className="news-image">
                  <img
                    src={item.image || "/assets/placeholder.jpg"}
                    alt={item.title}
                  />
                </div>
                <div className="news-content-card">
                  <div className="news-meta">
                    <span className="news-category">{item.category}</span>
                    <span className="news-date">{formatDate(item.date)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="news-excerpt">
                    {truncateText(item.content, 150)}
                  </p>
                  <a href={`/news/${item.id}`} className="read-more">
                    Baca Selengkapnya <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-news">Tidak ada berita yang ditemukan.</div>
          )}
        </div>

        <div className="pagination" id="pagination">
          {totalPages > 1 && (
            <>
              {currentPage > 1 && (
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo; Sebelumnya
                </button>
              )}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Selanjutnya &raquo;
                </button>
              )}
            </>
          )}
        </div>
      </section>

      <Footer variant="full" />
    </>
  );
};

export default BeritaPage;
