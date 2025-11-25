<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin</title>
    <link rel="stylesheet" href="style.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <style>
        /* Asumsi Anda memiliki variabel CSS: --bg-light, --primary-color, --secondary-color */
        :root {
            --primary-color: #0b4f8d; /* Biru Bappeda */
            --secondary-color: #e67e22; /* Oranye/Aksen */
            --bg-light: #f4f7f6;
        }

        body {
            background-color: var(--bg-light); 
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; 
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .login-container {
            width: 100%;
            max-width: 400px; 
            padding: 30px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 8px 30px rgba(0, 77, 153, 0.15); /* Bayangan lebih tebal */
            text-align: center;
        }

        .login-container h2 {
            color: var(--primary-color);
            margin-bottom: 25px;
            font-size: 1.8em;
            text-transform: uppercase;
        }

        .logo-login {
            height: 60px; /* Diperbesar sedikit */
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
            text-align: left;
            position: relative;
        }

        .form-group i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #aaa;
            transition: color 0.3s;
        }

        .form-group input {
            width: 100%;
            padding: 12px 12px 12px 45px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
            transition: border-color 0.3s;
        }

        .form-group input:focus {
            border-color: var(--primary-color);
            outline: none;
        }
        
        .form-group input:focus + i { /* Mengubah warna ikon saat fokus */
            color: var(--primary-color);
        }

        .login-container button {
            width: 100%;
            border: none;
            cursor: pointer;
            padding: 12px;
            margin-top: 10px;
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
            font-size: 1em;
            border-radius: 5px;
            transition: background-color 0.3s, transform 0.2s;
        }
        
        .login-container button:hover {
            background-color: #1a78c2; /* Sedikit lebih terang */
            transform: translateY(-1px);
        }
        
        .alert-message {
            color: #dc3545;
            font-size: 0.9em;
            margin-bottom: 15px;
            display: none;
            padding: 10px;
            border: 1px solid #f5c6cb;
            background-color: #f8d7da;
            border-radius: 5px;
        }

        .back-link {
            display: block;
            margin-top: 25px;
            font-size: 0.9em;
            color: var(--primary-color);
            text-decoration: none;
        }
        .back-link:hover {
             text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <img src="foto/logo biru.png" alt="Logo Bappeda" class="logo-login">
        <h2>Administrator PPM</h2>
        
        <div id="login-alert" class="alert-message">
            Nama pengguna atau kata sandi salah. Silakan coba lagi.
        </div>
        
        <form id="login-form"> <div class="form-group">
                <i class="fas fa-user"></i>
                <input type="text" id="username" name="username" placeholder="Nama Pengguna" required>
            </div>
            
            <div class="form-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" placeholder="Kata Sandi" required>
            </div>
            
            <button type="submit">
                <i class="fas fa-sign-in-alt"></i> MASUK KE DASHBOARD
            </button>
        </form>
        
        <a href="index.html" class="back-link"><i class="fas fa-arrow-left"></i> Kembali ke Halaman Utama</a>
    </div>

    <script>
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah pengiriman form default
            
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            const alertMessage = document.getElementById('login-alert');
            
            // --- KREDENSIAL LOGIN HARDCODED ---
            const validUsername = 'adminppm'; // Tentukan username admin Anda
            const validPassword = 'supersecret'; // Tentukan password admin Anda
            const adminDashboardPage = 'semua_berita_admin_grid_v2.html'; // Tentukan halaman dashboard admin

            if (usernameInput === validUsername && passwordInput === validPassword) {
                // Login Berhasil
                alertMessage.style.display = 'none';
                
                // Opsional: Simpan status login (misal: di sessionStorage)
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userRole', 'admin');
                
                // PENGALIHAN KE DASHBOARD
                window.location.href = adminDashboardPage;

            } else {
                // Login Gagal
                alertMessage.textContent = 'Nama pengguna atau kata sandi salah. Silakan coba lagi.';
                alertMessage.style.display = 'block';
                document.getElementById('password').value = ''; // Kosongkan field password
            }
        });

        // --- Fitur Pencegahan Akses Langsung ke Admin Page (OPSIONAL TAPI DISARANKAN) ---
        // Jika Anda ingin memastikan pengguna harus login sebelum melihat halaman admin, 
        // tambahkan kode berikut di bagian atas file 'semua_berita_admin_grid_v2.html':
        /*
        document.addEventListener('DOMContentLoaded', function() {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Anda harus login sebagai Admin untuk mengakses halaman ini.');
                window.location.href = 'login.html'; // Arahkan kembali ke halaman login
            }
        });
        */
    </script>
</body>
</html>