import React from "react";

const PublicationCard = ({ pub, formatDate, typeMap }) => {
  const typeKey = pub.jenisDokumen.nama.toLowerCase().replace(/\s+/g, "");
  const typeInfo = typeMap[typeKey] || {
    icon: "fa-file",
    text: pub.jenisDokumen.nama,
  };
  const year = new Date(pub.tanggal).getFullYear();

  return (
    <div
      className="publication-card"
      data-type={typeKey}
      data-year={year}
      data-title={pub.judul}
    >
      <div className="cover-placeholder">
        <i className={`fas ${typeInfo.icon}`}></i>
        {typeInfo.text} {year}
      </div>
      <div className="card-content">
        <h4>{pub.judul}</h4>
        <p className="meta">
          Jenis: {pub.jenisDokumen.nama} | Tanggal: {formatDate(pub.tanggal)}
        </p>
        <p>{pub.deskripsi}</p>
        <a href={pub.dokumenUrl} target="_blank" className="download-link" rel="noopener noreferrer">
          <i className="fas fa-download"></i> Unduh Dokumen (PDF)
        </a>
      </div>
    </div>
  );
};

export default PublicationCard;
