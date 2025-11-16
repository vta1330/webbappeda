// SCRIPT JAVASCRIPT UNTUK FILTER DAN PENCARIAN
document.addEventListener("DOMContentLoaded", function () {
  const typeFilter = document.getElementById("type-filter");
  const searchInput = document.getElementById("search-input");
  const publicationList = document.getElementById("publication-list");
  const publicationCards =
    publicationList.querySelectorAll(".publication-card");

  function filterAndSearch() {
    const selectedType = typeFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    publicationCards.forEach((card) => {
      const cardType = card.getAttribute("data-type");
      const cardTitle = card.getAttribute("data-title").toLowerCase();

      let typeMatch = selectedType === "all" || cardType === selectedType;
      let searchMatch = cardTitle.includes(searchTerm);

      if (typeMatch && searchMatch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Tambahkan event listener untuk filter dan pencarian
  typeFilter.addEventListener("change", filterAndSearch);
  searchInput.addEventListener("input", filterAndSearch);

  // Jalankan filter saat halaman dimuat (untuk inisialisasi)
  filterAndSearch();
});
