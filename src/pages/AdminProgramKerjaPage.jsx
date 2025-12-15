import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import useProgramKerja from "../hooks/useProgramKerja";

const ProgramKerjaTable = ({ programKerja, onEdit, onDelete }) => {
  return (
    <table id="programKerjaTable" className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Sub Judul</th>
          <th>Kategori</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="jenisdokumen-tbody">
        {programKerja.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.judul}</td>
            <td>{item.sub_judul}</td>
            <td>{item.kategori}</td>
            <td className="action-buttons">
              <button className="btn-edit" onClick={() => onEdit(item)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(item.id)}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProgramKerjaModal = ({
  isOpen,
  onClose,
  onSave,
  editingProgramKerja,
}) => {
  const [judul, setJudul] = React.useState(
    editingProgramKerja ? editingProgramKerja.judul : ""
  );
  const [sub_judul, setSubJudul] = React.useState(
    editingProgramKerja ? editingProgramKerja.sub_judul : ""
  );
  const [description, setDescription] = React.useState(
    editingProgramKerja ? editingProgramKerja.description : ""
  );
  const [kategori, setKategori] = React.useState(
    editingProgramKerja ? editingProgramKerja.kategori : ""
  );

  React.useEffect(() => {
    if (editingProgramKerja) {
      setJudul(editingProgramKerja.judul);
      setSubJudul(editingProgramKerja.sub_judul);
      setDescription(editingProgramKerja.description);
      setKategori(editingProgramKerja.kategori);
    } else {
      setJudul("");
      setSubJudul("");
      setDescription("");
      setKategori("");
    }
  }, [editingProgramKerja]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editingProgramKerja ? editingProgramKerja.id : null, {
      judul,
      sub_judul,
      description,
      kategori,
    });
  };

  if (!isOpen) return null;

  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modalTitle">
            {editingProgramKerja ? "Edit Program Kerja" : "Tambah Program Kerja"}
          </h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form id="programKerjaForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="judul">Judul:</label>
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
            <label htmlFor="sub_judul">Sub Judul:</label>
            <input
              type="text"
              id="sub_judul"
              name="sub_judul"
              value={sub_judul}
              onChange={(e) => setSubJudul(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deskripsi:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="kategori">Kategori:</label>
            <select
              id="kategori"
              name="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="sosial">Sosial & Kemiskinan</option>
              <option value="tenaga">Ketenagakerjaan</option>
            </select>
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

const AdminProgramKerjaPage = () => {
  const {
    programKerja,
    loading,
    error,
    addProgramKerja,
    updateProgramKerja,
    deleteProgramKerja,
    modalOpen,
    openModal,
    closeModal,
    editingProgramKerja,
  } = useProgramKerja();

  const handleSave = async (id, formData) => {
    const success = id
      ? await updateProgramKerja(id, formData)
      : await addProgramKerja(formData);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <Header isAdmin={true} />
      <PageHeader
        title="Admin Program Kerja"
        description="Kelola data program kerja BAPPEDA"
      />

      <section className="container admin-container">
        <div className="admin-header">
          <h2>Daftar Program Kerja</h2>
          <button className="btn-admin" onClick={() => openModal()}>
            Tambah Program Kerja
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
          <ProgramKerjaTable
            programKerja={programKerja}
            onEdit={openModal}
            onDelete={deleteProgramKerja}
          />
        )}
      </section>

      <ProgramKerjaModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingProgramKerja={editingProgramKerja}
      />

      <Footer variant="full" />
    </>
  );
};

export default AdminProgramKerjaPage;
