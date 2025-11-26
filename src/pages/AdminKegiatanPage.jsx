import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import useKegiatan from "../hooks/useKegiatan";

const KegiatanTable = ({ kegiatan, onEdit, onDelete }) => {
  return (
    <table id="kegiatanTable" className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Gambar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="jenisdokumen-tbody">
        {kegiatan.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.judul}</td>
            <td>{new Date(item.tanggal).toLocaleDateString("id-ID")}</td>
            <td>
              {item.image ? (
                <img
                  src={`/uploads/foto/${item.image}`}
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                  alt={item.judul}
                />
              ) : (
                "No Image"
              )}
            </td>
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

const KegiatanModal = ({
  isOpen,
  onClose,
  onSave,
  editingKegiatan,
}) => {
  const [judul, setJudul] = React.useState(
    editingKegiatan ? editingKegiatan.judul : ""
  );
  const [description, setDescription] = React.useState(
    editingKegiatan ? editingKegiatan.description : ""
  );
  const [tanggal, setTanggal] = React.useState(
    editingKegiatan ? editingKegiatan.tanggal.split("T")[0] : ""
  );
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState("");

  React.useEffect(() => {
    if (editingKegiatan) {
      setJudul(editingKegiatan.judul);
      setDescription(editingKegiatan.description);
      setTanggal(editingKegiatan.tanggal.split("T")[0]);
      if (editingKegiatan.image) {
        setImagePreview(`/uploads/foto/${editingKegiatan.image}`);
      } else {
        setImagePreview("");
      }
    } else {
      setJudul("");
      setDescription("");
      setTanggal("");
      setImage(null);
      setImagePreview("");
    }
  }, [editingKegiatan]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("description", description);
    formData.append("tanggal", tanggal);
    if (image) {
      formData.append("image", image);
    }
    onSave(editingKegiatan ? editingKegiatan.id : null, formData);
  };

  if (!isOpen) return null;

  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 id="modalTitle">
          {editingKegiatan ? "Edit Kegiatan" : "Tambah Kegiatan"}
        </h2>
        <form id="kegiatanForm" onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label htmlFor="tanggal">Tanggal:</label>
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
            <label htmlFor="image">Gambar:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                id="imagePreview"
                className="image-preview"
                src={imagePreview}
                alt="Preview"
                style={{ display: "block", maxWidth: "100px", marginTop: "10px" }}
              />
            )}
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

const AdminKegiatanPage = () => {
  const {
    kegiatan,
    loading,
    error,
    addKegiatan,
    updateKegiatan,
    deleteKegiatan,
    modalOpen,
    openModal,
    closeModal,
    editingKegiatan,
  } = useKegiatan();

  const handleSave = async (id, formData) => {
    const success = id
      ? await updateKegiatan(id, formData)
      : await addKegiatan(formData);
    if (success) {
      // Refetch or update the data as needed
      closeModal();
    }
  };

  return (
    <>
      <Header isAdmin={true} />
      <PageHeader title="Admin Kegiatan" description="Kelola data kegiatan BAPPEDA" />

      <section className="container admin-container">
        <div className="admin-header">
          <h2>Daftar Kegiatan</h2>
          <button className="btn-admin" onClick={() => openModal()}>
            Tambah Kegiatan
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
          <KegiatanTable
            kegiatan={kegiatan}
            onEdit={openModal}
            onDelete={deleteKegiatan}
          />
        )}
      </section>

      <KegiatanModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingKegiatan={editingKegiatan}
      />

      <Footer variant="full" />
    </>
  );
};

export default AdminKegiatanPage;
