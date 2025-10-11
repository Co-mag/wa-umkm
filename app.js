document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidenav = document.getElementById('sidenav');
    const navLinks = document.querySelectorAll('#sidenav a');
    const contentSections = document.querySelectorAll('.content-section');

    // Fungsi untuk menampilkan menu samping
    hamburgerBtn.addEventListener('click', function() {
        sidenav.classList.toggle('show');
    });

    // Fungsi untuk navigasi halaman
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            sidenav.classList.remove('show'); // Tutup menu setelah diklik
        });
    });

    // Fungsi untuk menampilkan section tertentu dan menyembunyikan yang lain
    function showSection(sectionId) {
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Fungsi untuk memuat data produk dari file JSON
    async function loadProducts() {
        try {
            const response = await fetch('/_data/produk.json');
            // Jika file tidak ditemukan, jangan tampilkan error
            if (!response.ok) {
                 console.log('File produk.json belum ada. Tambahkan produk dari panel admin.');
                 return;
            }
            const data = await response.json();
            const container = document.getElementById('produk-container');
            
            // Kosongkan container sebelum mengisi
            container.innerHTML = '';
            
            if (data.produk_list && data.produk_list.length > 0) {
                data.produk_list.forEach(produk => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    
                    card.innerHTML = `
                        <img src="${produk.thumbnail}" alt="${produk.title}">
                        <div class="product-card-content">
                            <h3>${produk.title}</h3>
                            ${produk.harga ? `<div class="harga">${produk.harga}</div>` : ''}
                            ${produk.deskripsi ? `<p>${produk.deskripsi}</p>` : ''}
                        </div>
                    `;
                    container.appendChild(card);
                });
            } else {
                 container.innerHTML = '<p>Belum ada produk. Silakan tambahkan dari panel admin.</p>';
            }

        } catch (error) {
            console.error('Gagal memuat produk:', error);
        }
    }

    // Muat produk saat halaman pertama kali dibuka dan tampilkan section utama
    loadProducts();
    showSection('utama');
});
