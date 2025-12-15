import React from "react";

const ProgramFilter = ({ onFilterChange, activeFilter }) => {
  const handleFilterClick = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <section className="container">
      <div className="program-filter">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
          data-filter="all"
        >
          <i className="fas fa-grip-lines"></i> Semua Program
        </button>
        <button
          className={`filter-btn ${activeFilter === "pendidikan" ? "active" : ""}`}
          onClick={() => handleFilterClick("pendidikan")}
          data-filter="pendidikan"
        >
          <i className="fas fa-user-graduate"></i> Pendidikan
        </button>
        <button
          className={`filter-btn ${activeFilter === "kesehatan" ? "active" : ""}`}
          onClick={() => handleFilterClick("kesehatan")}
          data-filter="kesehatan"
        >
          <i className="fas fa-heartbeat"></i> Kesehatan
        </button>
        <button
          className={`filter-btn ${activeFilter === "sosial" ? "active" : ""}`}
          onClick={() => handleFilterClick("sosial")}
          data-filter="sosial"
        >
          <i className="fas fa-hands-helping"></i> Sosial & Kemiskinan
        </button>
        <button
          className={`filter-btn ${activeFilter === "tenaga" ? "active" : ""}`}
          onClick={() => handleFilterClick("tenaga")}
          data-filter="tenaga"
        >
          <i className="fas fa-briefcase"></i> Ketenagakerjaan
        </button>
      </div>
    </section>
  );
};

export default ProgramFilter;
