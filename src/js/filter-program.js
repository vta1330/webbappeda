// SCRIPT JAVASCRIPT UNTUK FILTER PROGRAM
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const programCards = document.querySelectorAll(".program-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Kelola kelas 'active' pada tombol
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      programCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        // Tampilkan/sembunyikan kartu berdasarkan filter
        if (filter === "all" || category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
