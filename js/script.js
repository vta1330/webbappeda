document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Fungsi untuk toggle menu di tampilan mobile
    menuToggle.addEventListener('click', function() {
        // Cek jika navigasi belum punya class 'active' (berarti tersembunyi)
        if (mainNav.style.display === 'flex') {
            mainNav.style.display = 'none'; // Sembunyikan
        } else {
            // Tampilkan menu sebagai kolom (stacking vertically)
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'column';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '70px'; // Turunkan dari header
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.backgroundColor = 'rgba(0, 77, 153, 0.95)'; // Warna latar belakang
            mainNav.style.padding = '10px 0';
            
            // Tambahkan style untuk link di menu mobile
            mainNav.querySelectorAll('a').forEach(link => {
                link.style.display = 'block';
                link.style.padding = '10px 20px';
                link.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            });
        }
    });

    // Reset tampilan saat resize ke desktop (di atas 992px)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'row';
            mainNav.style.position = 'static';
            mainNav.style.backgroundColor = 'transparent';
            mainNav.style.padding = '0';
        }
    });

    // Anda bisa tambahkan fungsi untuk tombol pencarian di sini jika diperlukan.
});