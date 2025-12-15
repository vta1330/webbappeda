import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api"; // Replace with your actual API base URL

const usePublikasiAdmin = () => {
  const [publikasi, setPublikasi] = useState([]);
  const [jenisDokumen, setJenisDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPublikasi, setEditingPublikasi] = useState(null);

  const fetchPublikasi = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [publikasiResponse, jenisDokumenResponse] = await Promise.all([
        fetch(`${API_BASE}/publikasi`),
        fetch(`${API_BASE}/jenis-dokumen`),
      ]);

      if (!publikasiResponse.ok) {
        throw new Error(
          `Failed to fetch publikasi: ${publikasiResponse.status}`
        );
      }
      const publikasiData = await publikasiResponse.json();
      setPublikasi(Array.isArray(publikasiData) ? publikasiData : (publikasiData.data || []));

      if (!jenisDokumenResponse.ok) {
        throw new Error(
          `Failed to fetch jenis dokumen: ${jenisDokumenResponse.status}`
        );
      }
      const jenisDokumenData = await jenisDokumenResponse.json();
      setJenisDokumen(Array.isArray(jenisDokumenData) ? jenisDokumenData : (jenisDokumenData.data || []));

    } catch (err) {
      setError(err.message || "Failed to load publikasi data.");
      console.error("Error fetching publikasi and jenis dokumen:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPublikasi = useCallback(async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/publikasi`, {
        method: "POST",
        body: formData, // FormData is already handled here
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add publikasi.");
      }

      const newPublikasi = await response.json();
      setPublikasi((prevPublikasi) => [...prevPublikasi, newPublikasi]);
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to add publikasi.");
      console.error("Error adding publikasi:", err);
      return false; // Indicate failure
    }
  }, []);

  const updatePublikasi = useCallback(async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE}/publikasi/${id}`, {
        method: "PUT",
        body: formData, // FormData is already handled here
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update publikasi.");
      }

      const updatedPublikasi = await response.json();
      setPublikasi((prevPublikasi) =>
        prevPublikasi.map((pub) => (pub.id === id ? updatedPublikasi : pub))
      );
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to update publikasi.");
      console.error("Error updating publikasi:", err);
      return false; // Indicate failure
    }
  }, []);

  const deletePublikasi = useCallback(async (id) => {
      if (!window.confirm("Apakah Anda yakin ingin menghapus publikasi ini?")) {
          return false;
      }

    try {
      const response = await fetch(`${API_BASE}/publikasi/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete publikasi.");
      }

      setPublikasi((prevPublikasi) =>
        prevPublikasi.filter((pub) => pub.id !== id)
      );
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to delete publikasi.");
      console.error("Error deleting publikasi:", err);
      return false; // Indicate failure
    }
  }, []);

  const openModal = (publikasi = null) => {
    setEditingPublikasi(publikasi);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPublikasi(null);
  };

  useEffect(() => {
    fetchPublikasi();
  }, [fetchPublikasi]);

  return {
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
  };
};

export default usePublikasiAdmin;
