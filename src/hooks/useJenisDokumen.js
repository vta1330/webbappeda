import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api"; // Replace with your API base URL

const useJenisDokumen = () => {
  const [jenisDokumen, setJenisDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJenisDokumen, setEditingJenisDokumen] = useState(null);

  const fetchJenisDokumen = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/jenis-dokumen`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setJenisDokumen(Array.isArray(data) ? data : (data.data || [])); // Handle potential data structure differences
    } catch (err) {
      setError(err.message || "Failed to load jenis dokumen.");
      console.error("Error fetching jenis dokumen:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addJenisDokumen = useCallback(async (nama) => {
    try {
      const response = await fetch(`${API_BASE}/jenis-dokumen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add jenis dokumen.");
      }

      const newJenisDokumen = await response.json();
      setJenisDokumen((prevJenisDokumen) => [...prevJenisDokumen, newJenisDokumen]);
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to add jenis dokumen.");
      console.error("Error adding jenis dokumen:", err);
      return false; // Indicate failure
    }
  }, []);

  const updateJenisDokumen = useCallback(async (id, nama) => {
    try {
      const response = await fetch(`${API_BASE}/jenis-dokumen/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update jenis dokumen.");
      }

      const updatedJenisDokumen = await response.json();
      setJenisDokumen((prevJenisDokumen) =>
        prevJenisDokumen.map((jd) => (jd.id === id ? updatedJenisDokumen : jd))
      );
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to update jenis dokumen.");
      console.error("Error updating jenis dokumen:", err);
      return false; // Indicate failure
    }
  }, []);

  const deleteJenisDokumen = useCallback(async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus jenis dokumen ini?")) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/jenis-dokumen/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete jenis dokumen.");
      }

      setJenisDokumen((prevJenisDokumen) =>
        prevJenisDokumen.filter((jd) => jd.id !== id)
      );
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to delete jenis dokumen.");
      console.error("Error deleting jenis dokumen:", err);
      return false; // Indicate failure
    }
  }, []);

  const openModal = (jenis = null) => {
    setEditingJenisDokumen(jenis);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJenisDokumen(null);
  };


  useEffect(() => {
    fetchJenisDokumen();
  }, [fetchJenisDokumen]);

  return {
    jenisDokumen,
    loading,
    error,
    fetchJenisDokumen,
    addJenisDokumen,
    updateJenisDokumen,
    deleteJenisDokumen,
    modalOpen,
    openModal,
    closeModal,
    editingJenisDokumen,
  };
};

export default useJenisDokumen;
