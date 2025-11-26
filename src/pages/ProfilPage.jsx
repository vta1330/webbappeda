import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const ProfilPage = () => {
  const vision =
    "Menjadi Perencana Utama **Pembangunan Manusia yang Berdaya Saing Tinggi** untuk mewujudkan masyarakat daerah yang Sejahtera dan Mandiri.";
  const missions = [
    "Mengintegrasikan data dan analisis IPM, kesehatan, dan pendidikan ke dalam dokumen perencanaan daerah.",
    "Mengkoordinasikan program lintas sektor untuk percepatan penurunan angka kemiskinan dan pengangguran.",
    "Mendorong inovasi dan partisipasi publik dalam proses perencanaan pembangunan manusia.",
  ];

  const tupoksiList = [
    {
      title: "Penyusunan Dokumen Perencanaan:",
      details: [
        "Mengkoordinasikan penyusunan dokumen perencanaan pembangunan daerah, seperti Rencana Pembangunan Jangka Panjang Daerah (RPJPD), Rencana Pembangunan Jangka Menengah Daerah (RPJMD), dan Rencana Kerja Pemerintah Daerah (RKPD), untuk lingkup Pemerintahan dan Pembangunan Manusia.",
        "Mengkoordinasikan penyusunan Rencana Strategis (Renstra) dan Rencana Kerja (Renja) Perangkat Daerah di bidang terkait.",
      ],
    },
    {
      title: "Koordinasi dan Musyawarah Perencanaan:",
      details: [
        "Mengkoordinasikan pelaksanaan Musyawarah Perencanaan Pembangunan (Musrenbang) untuk RPJPD, RPJMD, dan RKPD pada bidang terkait.",
        "Mengkoordinasikan sinergitas dan harmonisasi kegiatan Perangkat Daerah Provinsi/Kabupaten/Kota serta Kementerian/Lembaga di wilayah tersebut.",
        "Mengkoordinasikan pelaksanaan kesepakatan dengan Dewan Perwakilan Rakyat Daerah (DPRD) terkait dokumen perencanaan dan penganggaran (APBD) pada bidangnya.",
      ],
    },
    {
      title: "Kajian dan Evaluasi:",
      details: [
        "Menyelenggarakan pengkajian bahan kebijakan teknis perencanaan pembangunan lingkup Pemerintahan dan Pembangunan Manusia.",
        "Melaksanakan pengendalian, monitoring, evaluasi, dan pelaporan pelaksanaan perencanaan Perangkat Daerah bidang Pemerintahan dan Pembangunan Manusia.",
      ],
    },
    {
      title: "Pembinaan Teknis:",
      details: [
        "Mengkoordinasikan dan melaksanakan pembinaan teknis perencanaan kepada Perangkat Daerah terkait di bidang Pemerintahan dan Pembangunan Manusia.",
      ],
    },
  ];

  return (
    <>
      <Header />
      <PageHeader
        title="PROFIL BIDANG PERENCANAAN PEMBANGUNAN MANUSIA (PPM)"
        description="Memahami peran strategis, struktur, dan komitmen kami dalam meningkatkan kualitas hidup masyarakat."
      />

      <section className="profile-section">
        <div className="container">
          <h2>Visi dan Misi Bidang PPM</h2>
          <div className="vision-mission-grid">
            <div className="vm-box">
              <h3>
                <i className="fas fa-eye"></i> Visi
              </h3>
              <p dangerouslySetInnerHTML={{ __html: vision.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
            <div className="vm-box">
              <h3>
                <i className="fas fa-bullseye"></i> Misi
              </h3>
              <ul>
                {missions.map((mission, index) => (
                  <li key={index}>{mission}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      <section className="profile-section">
        <div className="container">
          <h2>Tugas Pokok dan Fungsi (Tupoksi)</h2>
          <p>
            Fungsi dan rincian tugas Bidang Perencanaan Pemerintahan dan
            Pembangunan Manusia Bappeda meliputi:
          </p>
          <ol className="tupoksi-list">
            {tupoksiList.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                {item.details.map((detail, detIndex) => (
                  <React.Fragment key={detIndex}>
                    <br />
                    {detail}
                  </React.Fragment>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr />

      <section className="profile-section">
        <div className="container">
          <h2>Struktur Organisasi Bidang PPM</h2>
          <div className="structure-container">
            <p>
              Silakan ganti *placeholder* ini dengan gambar struktur organisasi
              Bidang PPM yang resmi (misalnya, Kepala Bidang, Kasubbid Kesehatan,
              Kasubbid Pendidikan, dll.).
            </p>
            <img
              src="/assets/struktur-organisasi-ppm.png" // Adjusted path
              alt="Struktur Organisasi Bidang PPM"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProfilPage;
