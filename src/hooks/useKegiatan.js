import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api"; // Replace with your API base URL

const useKegiatan = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKegiatan, setEditingKegiatan] = useState(null);

  const fetchKegiatan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/kegiatan`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setKegiatan(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      setError(err.message || "Failed to load kegiatan.");
      console.error("Error fetching kegiatan:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addKegiatan = useCallback(async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/kegiatan`, {
        method: "POST",
        body: formData, // FormData is already handled here
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add kegiatan.");
      }

      const newKegiatan = await response.json();
      setKegiatan((prevKegiatan) => [...prevKegiatan, newKegiatan]);
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to add kegiatan.");
      console.error("Error adding kegiatan:", err);
      return false; // Indicate failure
    }
  }, []);

  const updateKegiatan = useCallback(async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE}/kegiatan/${id}`, {
        method: "PUT",
        body: formData, // FormData is already handled here
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update kegiatan.");
      }

      const updatedKegiatan = await response.json();
      setKegiatan((prevKegiatan) =>
        prevKegiatan.map((kgt) => (kgt.id === id ? updatedKegiatan : kgt))
      );
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to update kegiatan.");
      console.error("Error updating kegiatan:", err);
      return false; // Indicate failure
    }
  }, []);

  const deleteKegiatan = useCallback(async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      return false;
    }
    try {
      const response = await fetch(`${API_BASE}/kegiatan/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete kegiatan.");
      }

      setKegiatan((prevKegiatan) =>
        prevKegiatan.filter((kgt) => kgt.id !== id)
      );
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to delete kegiatan.");
      console.error("Error deleting kegiatan:", err);
      return false; // Indicate failure
    }
  }, []);

  const openModal = (kegiatan = null) => {
    setEditingKegiatan(kegiatan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingKegiatan(null);
  };

  useEffect(() => {
    fetchKegiatan();
  }, [fetchKegiatan]);

  return {
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
  };
};

export default useKegiatan;
