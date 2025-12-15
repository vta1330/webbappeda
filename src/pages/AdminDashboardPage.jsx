import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const AdminCard = ({ icon, title, description, link }) => {
  return (
    <div className="admin-card">
      <i className={`fas ${icon}`}></i>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>Kelola {title}</a>
    </div>
  );
};

const AdminDashboardPage = () => {
  const adminCardsData = [
    {
      icon: "fa-calendar-alt",
      title: "Kegiatan",
      description: "Kelola data kegiatan bidang PPM",
      link: "/admin-kegiatan", // Placeholder route
    },
    {
      icon: "fa-file-alt",
      title: "Publikasi",
      description: "Kelola dokumen dan publikasi",
      link: "/admin-publikasi", // Placeholder route
    },
    {
      icon: "fa-briefcase",
      title: "Program Kerja",
      description: "Kelola program kerja prioritas",
      link: "/admin-programkerja", // Placeholder route
    },
    {
      icon: "fa-tags",
      title: "Jenis Dokumen",
      description: "Kelola kategori jenis dokumen",
      link: "/admin-jenisdokumen", // Placeholder route
    },
  ];

  return (
    <>
      {/* Custom Header for Admin Page */}
      <Header isAdmin={true} />
      <PageHeader
        title="DASHBOARD ADMINISTRATOR"
        description="Kelola data kegiatan, publikasi, program kerja, dan jenis dokumen"
      />

      <section className="container admin-dashboard">
        <div className="admin-grid">
          {adminCardsData.map((card, index) => (
            <AdminCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </section>

      {/* Admin footer will likely be simpler or different,
          but for now, we use the full variant to match original HTML structure. */}
      <Footer variant="full" />
    </>
  );
};

export default AdminDashboardPage;
