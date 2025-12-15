import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api";

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [kegiatanResponse, publikasiResponse] = await Promise.allSettled([
        fetch(`${API_BASE}/kegiatan`),
        fetch(`${API_BASE}/publikasi`),
      ]);

      let kegiatanData = { data: [] };
      if (kegiatanResponse.status === "fulfilled" && kegiatanResponse.value.ok) {
        kegiatanData = await kegiatanResponse.value.json();
      } else if (kegiatanResponse.status === "rejected") {
        console.error("Error fetching kegiatan:", kegiatanResponse.reason);
      } else {
        console.warn("Kegiatan response not OK:", kegiatanResponse.value?.status);
      }

      let publikasiData = { data: [] };
      if (publikasiResponse.status === "fulfilled" && publikasiResponse.value.ok) {
        publikasiData = await publikasiResponse.value.json();
      } else if (publikasiResponse.status === "rejected") {
        console.error("Error fetching publikasi:", publikasiResponse.reason);
      } else {
        console.warn("Publikasi response not OK:", publikasiResponse.value?.status);
      }

      const kegiatanNews = kegiatanData.data.map((item) => ({
        id: `keg-${item.id}`, // Prefix ID to avoid conflicts
        type: "kegiatan",
        title: item.judul,
        content: item.description,
        date: item.tanggal,
        category: item.kategori || "kegiatan", // Ensure category exists
        image: item.image,
        year: new Date(item.tanggal).getFullYear(),
      }));

      const publikasiNews = publikasiData.data.map((item) => ({
        id: `pub-${item.id}`, // Prefix ID to avoid conflicts
        type: "publikasi",
        title: item.judul,
        content: item.description,
        date: item.tanggal,
        category: "publikasi", // Always 'publikasi' for this type
        image: null, // publikasi might not have images
        year: new Date(item.tanggal).getFullYear(),
      }));

      const combinedNews = [...kegiatanNews, ...publikasiNews].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      if (combinedNews.length === 0) {
        // Fallback to static data if no data from API
        console.warn("No data from API, loading static fallback news.");
        loadStaticNews();
      } else {
        setNews(combinedNews);
      }
    } catch (err) {
      console.error("Unexpected error during news fetch:", err);
      setError("Gagal memuat berita dari server.");
      loadStaticNews(); // Fallback on general error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fallback static news data (moved from old JS)
  const loadStaticNews = () => {
    const staticData = [
      {
        id: "static-1",
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
        id: "static-2",
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
        id: "static-3",
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
        id: "static-4",
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
        id: "static-5",
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
        id: "static-6",
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
    setNews(staticData);
  };

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, loading, error };
};

export default useNews;
