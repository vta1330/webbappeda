import React from "react";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import useJenisDokumen from "../hooks/useJenisDokumen";

const JenisDokumenTable = ({ jenisDokumen, onEdit, onDelete }) => {
  return (
    <table className="data-table" id="jenisdokumen-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Jenis Dokumen</th>
          <th>Jumlah Publikasi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="jenisdokumen-tbody">
        {jenisDokumen.map((jenis) => (
          <tr key={jenis.id}>
            <td>{jenis.id}</td>
            <td>{jenis.nama}</td>
            <td>{jenis.publikasi ? jenis.publikasi.length : 0}</td>
            <td className="action-buttons">
              <button className="btn-edit" onClick={() => onEdit(jenis)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(jenis.id)}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const JenisDokumenModal = ({
  isOpen,
  onClose,
  onSave,
  editingJenisDokumen,
}) => {
  const [nama, setNama] = React.useState(
    editingJenisDokumen ? editingJenisDokumen.nama : ""
  );

  React.useEffect(() => {
    setNama(editingJenisDokumen ? editingJenisDokumen.nama : "");
  }, [editingJenisDokumen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editingJenisDokumen ? editingJenisDokumen.id : null, nama);
  };

  if (!isOpen) return null;

  return (
    <div id="jenisdokumen-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modal-title">
            {editingJenisDokumen ? "Edit Jenis Dokumen" : "Tambah Jenis Dokumen"}
          </h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form id="jenisdokumen-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama Jenis Dokumen</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
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

const AdminJenisDokumenPage = () => {
  const {
    jenisDokumen,
    loading,
    error,
    addJenisDokumen,
    updateJenisDokumen,
    deleteJenisDokumen,
    modalOpen,
    openModal,
    closeModal,
    editingJenisDokumen,
  } = useJenisDokumen();

  const handleSave = async (id, nama) => {
    const success = id
      ? await updateJenisDokumen(id, nama)
      : await addJenisDokumen(nama);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <PageHeader
        title="KELOLA JENIS DOKUMEN"
        description="Tambah, edit, dan hapus kategori jenis dokumen"
      />

      <section className="container admin-content">
        <div className="admin-header">
          <h2>Daftar Jenis Dokumen</h2>
          <button className="btn-add" onClick={() => openModal()}>
            Tambah Jenis Dokumen
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
          <JenisDokumenTable
            jenisDokumen={jenisDokumen}
            onEdit={openModal}
            onDelete={deleteJenisDokumen}
          />
        )}
      </section>

      <JenisDokumenModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingJenisDokumen={editingJenisDokumen}
      />

      <Footer variant="full" />
    </>
  );
};

export default AdminJenisDokumenPage;
