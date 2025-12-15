import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api";

const typeMap = {
  ipm: { icon: "fa-chart-line", text: "Laporan IPM" },
  kesehatan: { icon: "fa-notes-medical", text: "Profil Kesehatan" },
  pendidikan: { icon: "fa-user-graduate", text: "Data Pendidikan" },
  rkpd: { icon: "fa-book-open", text: "Dokumen RKPD" },
  "lain-lain": { icon: "fa-file", text: "Lain-lain" },
};

const usePublikasi = () => {
  const [publikasi, setPublikasi] = useState([]);
  const [jenisDokumen, setJenisDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublikasiData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [jenisDocResponse, publikasiResponse] = await Promise.allSettled([
        fetch(`${API_BASE}/jenis-dokumen`),
        fetch(`${API_BASE}/publikasi`),
      ]);

      let fetchedJenisDokumen = [];
      if (jenisDocResponse.status === "fulfilled" && jenisDocResponse.value.ok) {
        const data = await jenisDocResponse.value.json();
        if (data.status === "success" && data.data) {
          fetchedJenisDokumen = data.data;
        }
      } else if (jenisDocResponse.status === "rejected") {
        console.error("Error fetching jenis dokumen:", jenisDocResponse.reason);
      } else {
        console.warn("Jenis dokumen response not OK:", jenisDocResponse.value?.status);
      }
      setJenisDokumen(fetchedJenisDokumen);

      let fetchedPublikasi = [];
      if (publikasiResponse.status === "fulfilled" && publikasiResponse.value.ok) {
        const data = await publikasiResponse.value.json();
        if (data.status === "success" && data.data) {
          fetchedPublikasi = data.data;
        }
      } else if (publikasiResponse.status === "rejected") {
        console.error("Error fetching publikasi:", publikasiResponse.reason);
      } else {
        console.warn("Publikasi response not OK:", publikasiResponse.value?.status);
      }
      setPublikasi(fetchedPublikasi);

      if (fetchedJenisDokumen.length === 0 || fetchedPublikasi.length === 0) {
        console.warn("No data from API, loading static fallback for publikasi.");
        loadStaticPublikasi();
      }

    } catch (err) {
      console.error("Unexpected error during publikasi fetch:", err);
      setError("Gagal memuat data publikasi dari server.");
      loadStaticPublikasi(); // Fallback on general error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fallback static data
  const loadStaticPublikasi = () => {
    const staticJenisDokumen = [
      { id: 1, nama: "Laporan IPM" },
      { id: 2, nama: "Profil Kesehatan" },
      { id: 3, nama: "Data Pendidikan" },
      { id: 4, nama: "Dokumen RKPD" },
      { id: 5, nama: "Lain-lain" },
    ];

    const staticPublikasiData = [
      {
        id: 1,
        judul: "Laporan Indeks Pembangunan Manusia 2024",
        deskripsi:
          "Analisis komprehensif tentang capaian IPM Kabupaten Kutai Kartanegara tahun 2024.",
        tanggal: "2024-12-15",
        dokumenUrl: "/assets/sample-ipm-2024.pdf",
        jenisDokumen: { id: 1, nama: "Laporan IPM" },
      },
      {
        id: 2,
        judul: "Profil Kesehatan Masyarakat Kutai Kartanegara 2023",
        deskripsi:
          "Data dan indikator kesehatan utama di wilayah Kutai Kartanegara.",
        tanggal: "2023-10-20",
        dokumenUrl: "/assets/sample-kesehatan-2023.pdf",
        jenisDokumen: { id: 2, nama: "Profil Kesehatan" },
      },
      {
        id: 3,
        judul: "Statistik Pendidikan Dasar 2024",
        deskripsi:
          "Angka partisipasi sekolah, rata-rata lama sekolah, dan data relevan lainnya.",
        tanggal: "2024-08-01",
        dokumenUrl: "/assets/sample-pendidikan-2024.pdf",
        jenisDokumen: { id: 3, nama: "Data Pendidikan" },
      },
      {
        id: 4,
        judul: "Rencana Kerja Pemerintah Daerah (RKPD) 2025",
        deskripsi:
          "Dokumen perencanaan tahunan yang memuat prioritas pembangunan daerah.",
        tanggal: "2024-03-10",
        dokumenUrl: "/assets/sample-rkpd-2025.pdf",
        jenisDokumen: { id: 4, nama: "Dokumen RKPD" },
      },
      {
        id: 5,
        judul: "Kajian Dampak Sosial Ekonomi Pembangunan IKN",
        deskripsi:
          "Penelitian tentang potensi dampak IKN terhadap sosial ekonomi lokal.",
        tanggal: "2025-01-20",
        dokumenUrl: "/assets/sample-ikn-kajian.pdf",
        jenisDokumen: { id: 5, nama: "Lain-lain" },
      },
      {
        id: 6,
        judul: "Laporan Hasil Musrenbang Tingkat Kabupaten 2024",
        deskripsi:
          "Ringkasan dan hasil kesepakatan Musrenbang Kabupaten tahun 2024.",
        tanggal: "2024-04-05",
        dokumenUrl: "/assets/sample-musrenbang-2024.pdf",
        jenisDokumen: { id: 5, nama: "Lain-lain" },
      },
    ];
    setJenisDokumen(staticJenisDokumen);
    setPublikasi(staticPublikasiData);
  };


  useEffect(() => {
    fetchPublikasiData();
  }, [fetchPublikasiData]);

  return { publikasi, jenisDokumen, loading, error, typeMap };
};

export default usePublikasi;
