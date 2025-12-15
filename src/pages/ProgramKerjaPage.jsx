import React, { useState } from "react";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProgramFilter from "../components/ProgramFilter";
import ProgramCard from "../components/ProgramCard";

const ProgramKerjaPage = () => {
  const allPrograms = [
    {
      id: 1,
      category: "pendidikan",
      icon: "book-reader",
      title: "Program Perencanaan Mutu Pendidikan Dasar",
      description:
        "Perencanaan alokasi anggaran dan kegiatan untuk peningkatan Rata-rata Lama Sekolah (RLS) serta pemerataan sarana pendidikan.",
      indicators: [
        "IKU 1: Peningkatan Rata-rata Lama Sekolah (RLS) menjadi X tahun.",
        "IKU 2: Persentase Angka Partisipasi Sekolah (APS) usia 7-12 tahun mencapai X%.",
      ],
    },
    {
      id: 2,
      category: "kesehatan",
      icon: "stethoscope",
      title: "Program Perencanaan Kesehatan Masyarakat",
      description:
        "Fokus pada upaya penurunan Angka Kematian Ibu (AKI) dan prevalensi stunting melalui intervensi gizi terpadu.",
      indicators: [
        "IKU 1: Penurunan Prevalensi Stunting mencapai X%.",
        "IKU 2: Peningkatan Angka Harapan Hidup (AHH) menjadi X tahun.",
      ],
    },
    {
      id: 3,
      category: "sosial",
      icon: "users-line",
      title: "Program Koordinasi Penanggulangan Kemiskinan",
      description:
        "Koordinasi data Pensasaran Percepatan Penghapusan Kemiskinan Ekstrem (P3KE) dan sinkronisasi program bantuan sosial antar dinas terkait.",
      indicators: [
        "IKU 1: Penurunan Tingkat Kemiskinan menjadi X%.",
        "IKU 2: Persentase keluarga miskin yang terlayani program terpadu mencapai X%.",
      ],
    },
    {
      id: 4,
      category: "tenaga",
      icon: "hard-hat",
      title: "Program Perencanaan Ketenagakerjaan dan Kewirausahaan",
      description:
        "Perencanaan peningkatan pelatihan vokasi, sertifikasi kompetensi tenaga kerja, dan kemudahan akses modal usaha mikro.",
      indicators: [
        "IKU 1: Penurunan Tingkat Pengangguran Terbuka (TPT) menjadi X%.",
        "IKU 2: Peningkatan jumlah wirausaha baru hasil program pemerintah daerah.",
      ],
    },
  ];

  const [filteredPrograms, setFilteredPrograms] = useState(allPrograms);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredPrograms(allPrograms);
    } else {
      const filtered = allPrograms.filter(
        (program) => program.category === filter,
      );
      setFilteredPrograms(filtered);
    }
  };

  return (
    <>
      <PageHeader
        title="PROGRAM PRIORITAS BIDANG PEMBANGUNAN MANUSIA (PPM)"
        description="Daftar Program, Kegiatan, dan Indikator Kinerja Utama (IKU) untuk tahun perencanaan berjalan."
      />
      <ProgramFilter
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      <section className="container program-list">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </section>

      <Footer />
    </>
  );
};

export default ProgramKerjaPage;
