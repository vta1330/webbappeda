import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import usePublikasiAdmin from "../hooks/usePublikasiAdmin";

const PublikasiAdminTable = ({
  publikasi,
  jenisDokumen,
  onEdit,
  onDelete,
}) => {
  const getJenisDokumenNama = (jenisDokumenId) => {
    const jenis = jenisDokumen.find((jd) => jd.id === parseInt(jenisDokumenId));
    return jenis ? jenis.nama : "-";
  };

  return (
    <table id="publikasi-table" className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Jenis Dokumen</th>
          <th>Dokumen</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="publikasi-tbody">
        {publikasi.map((pub) => (
          <tr key={pub.id}>
            <td>{pub.id}</td>
            <td>{pub.judul}</td>
            <td>{new Date(pub.tanggal).toLocaleDateString("id-ID")}</td>
            <td>{getJenisDokumenNama(pub.jenisDokumen)}</td>
            <td>
              {pub.dokumen ? <i className="fas fa-file"></i> : "-"}
            </td>
            <td className="action-buttons">
              <button className="btn-edit" onClick={() => onEdit(pub)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(pub.id)}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PublikasiAdminModal = ({
  isOpen,
  onClose,
  onSave,
  editingPublikasi,
  jenisDokumen,
}) => {
  const [judul, setJudul] = React.useState(
    editingPublikasi ? editingPublikasi.judul : ""
  );
  const [description, setDescription] = React.useState(
    editingPublikasi ? editingPublikasi.description : ""
  );
  const [tanggal, setTanggal] = React.useState(
    editingPublikasi ? editingPublikasi.tanggal.split("T")[0] : ""
  );
  const [jenisDokumenId, setJenisDokumenId] = React.useState(
    editingPublikasi ? editingPublikasi.jenisDokumen : ""
  );
  const [dokumen, setDokumen] = React.useState(null);
  const [dokumenPreview, setDokumenPreview] = React.useState("");

  React.useEffect(() => {
    if (editingPublikasi) {
      setJudul(editingPublikasi.judul);
      setDescription(editingPublikasi.description);
      setTanggal(editingPublikasi.tanggal.split("T")[0]);
      setJenisDokumenId(editingPublikasi.jenisDokumen);
      if (editingPublikasi.dokumen) {
        // Assuming dokumen is a file path, not the file itself
        setDokumenPreview(editingPublikasi.dokumen);
      } else {
        setDokumenPreview("");
      }
    } else {
      setJudul("");
      setDescription("");
      setTanggal("");
      setJenisDokumenId("");
      setDokumen(null);
      setDokumenPreview("");
    }
  }, [editingPublikasi]);

  const handleDokumenChange = (e) => {
    const file = e.target.files[0];
    setDokumen(file);
    if (file) {
      // In a real app, you might show a preview or filename
      setDokumenPreview(file.name); // Or generate a temporary URL for preview, if possible
    } else {
      setDokumenPreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("description", description);
    formData.append("tanggal", tanggal);
    formData.append("jenisDokumen", jenisDokumenId); // Send the ID
    if (dokumen) {
      formData.append("dokumen", dokumen);
    }

    onSave(editingPublikasi ? editingPublikasi.id : null, formData);
  };

  if (!isOpen) return null;

  return (
    <div id="publikasi-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modalTitle">
            {editingPublikasi ? "Edit Publikasi" : "Tambah Publikasi"}
          </h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form id="publikasi-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="judul">Judul Publikasi</label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tanggal">Tanggal</label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jenisDokumen">Jenis Dokumen</label>
            <select
              id="jenisDokumen"
              name="jenisDokumen"
              value={jenisDokumenId}
              onChange={(e) => setJenisDokumenId(e.target.value)}
              required
            >
              <option value="">Pilih Jenis Dokumen</option>
              {jenisDokumen.map((jd) => (
                <option key={jd.id} value={jd.id}>
                  {jd.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dokumen">Dokumen (Upload)</label>
            <input
              type="file"
              id="dokumen"
              name="dokumen"
              accept=".pdf,.doc,.docx"
              onChange={handleDokumenChange}
            />
            {dokumenPreview && <p>File terpilih: {dokumenPreview}</p>}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-save">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminPublikasiPage = () => {
  const {
    publikasi,
    jenisDokumen,
    loading,
    error,
    addPublikasi,
    updatePublikasi,
    deletePublikasi,
    modalOpen,
    openModal,
    closeModal,
    editingPublikasi,
  } = usePublikasiAdmin();

  const handleSave = async (id, formData) => {
    const success = id
      ? await updatePublikasi(id, formData)
      : await addPublikasi(formData);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <Header isAdmin={true} />
      <PageHeader
        title="KELOLA PUBLIKASI"
        description="Tambah, edit, dan hapus data publikasi dan dokumen"
      />

      <section className="container admin-content">
        <div className="admin-header">
          <h2>Daftar Publikasi</h2>
          <button className="btn-add" onClick={() => openModal()}>
            Tambah Publikasi
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Memuat data...
          </div>
        )}
        {error && (
          <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
            {error}
          </div>
        )}
        {!loading && !error && (
          <PublikasiAdminTable
            publikasi={publikasi}
            jenisDokumen={jenisDokumen}
            onEdit={openModal}
            onDelete={deletePublikasi}
          />
        )}
      </section>

      <PublikasiAdminModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingPublikasi={editingPublikasi}
        jenisDokumen={jenisDokumen}
      />

      <Footer variant="full" />
    </>
  );
};

export default AdminPublikasiPage;
