import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000/api"; // Replace with your API base URL

const useProgramKerja = () => {
  const [programKerja, setProgramKerja] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgramKerja, setEditingProgramKerja] = useState(null);

  const fetchProgramKerja = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/program-kerja`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProgramKerja(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      setError(err.message || "Failed to load program kerja.");
      console.error("Error fetching program kerja:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProgramKerja = useCallback(async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/program-kerja`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add program kerja.");
      }

      const newProgramKerja = await response.json();
      setProgramKerja((prevProgramKerja) => [...prevProgramKerja, newProgramKerja]);
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to add program kerja.");
      console.error("Error adding program kerja:", err);
      return false; // Indicate failure
    }
  }, []);

  const updateProgramKerja = useCallback(async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE}/program-kerja/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update program kerja.");
      }

      const updatedProgramKerja = await response.json();
      setProgramKerja((prevProgramKerja) =>
        prevProgramKerja.map((pk) => (pk.id === id ? updatedProgramKerja : pk))
      );
      closeModal();
      return true; // Indicate success
    } catch (err) {
      setError(err.message || "Failed to update program kerja.");
      console.error("Error updating program kerja:", err);
      return false; // Indicate failure
    }
  }, []);

  const deleteProgramKerja = useCallback(async (id) => {
      if (!window.confirm("Apakah Anda yakin ingin menghapus program kerja ini?")) {
          return false;
      }
      try {
          const response = await fetch(`${API_BASE}/program-kerja/${id}`, {
              method: "DELETE",
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Failed to delete program kerja.");
          }

          setProgramKerja((prevProgramKerja) =>
              prevProgramKerja.filter((pk) => pk.id !== id)
          );
          return true; // Indicate success
      } catch (err) {
          setError(err.message || "Failed to delete program kerja.");
          console.error("Error deleting program kerja:", err);
          return false; // Indicate failure
      }
  }, []);

  const openModal = (programKerja = null) => {
    setEditingProgramKerja(programKerja);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProgramKerja(null);
  };

  useEffect(() => {
    fetchProgramKerja();
  }, [fetchProgramKerja]);

  return {
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
  };
};

export default useProgramKerja;
