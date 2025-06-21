# 🚀 Node.js Express Boilerplate with JWT, Swagger, Morgan & PostgreSQL

Boilerplate aplikasi backend dengan stack modern yang siap digunakan untuk membangun REST API. Dibuat menggunakan **Node.js**, **Express**, **JWT Auth**, dokumentasi otomatis dengan **Swagger**, logging dengan **Morgan**, serta integrasi database menggunakan **PostgreSQL** (melalui driver `pg`).

## ✨ Fitur Utama

- ✅ Struktur proyek yang modular dan mudah dipahami
- 🔐 Autentikasi menggunakan JWT (JSON Web Token)
- 📄 Dokumentasi API otomatis via Swagger (`/api-docs`)
- 📦 Koneksi ke database PostgreSQL menggunakan `pg`
- 🧾 Logging HTTP request dengan Morgan
- 📊 Validasi input dan error handler terpusat
- 🧪 Siap untuk ditambahkan testing (misalnya Jest/Supertest)

## 🗂️ Struktur Direktori
project-root/\
├── src/\
│ ├── controllers/ # Logika untuk menangani request\
│ ├── middleware/ # Middleware (auth, logger, error handler)\
│ ├── routes/ # Endpoint API\
│ │ └── routes.js # Routing utama aplikasi\
│ ├── index.js # Inisialisasi Express app\
│ └── swagger.js # Setup dokumentasi Swagger\
├── test/ # File testing (opsional)\
├── babel.config.js # Konfigurasi Babel untuk ES6+\
├── jest.config.mjs # Konfigurasi testing Jest\
├── package.json # Dependensi dan script\
├── .env # Konfigurasi environment (PORT, DB, JWT)\
└── README.md # Dokumentasi ini

## ⚙️ Instalasi & Menjalankan

### 1. Clone repository
`git clone https://github.com/esaprakoso/node-express-boilerplate.git`
`cd node-express-boilerplate`

### 2. Copy file .env & install dependencies
`cp .env.example .env`
`npm install`

### 3. Jalankan aplikasi
`npm run start`

### 4. Akses dokumentasi Swagger
Buka di browser: http://localhost:3000/api-docs

## 🧰 Teknologi yang Digunakan
- Express.js – Backend web framework
- pg – Native PostgreSQL driver untuk Node.js
- jsonwebtoken – Autentikasi dengan JWT
- dotenv – Environment configuration
- morgan – HTTP request logger
- swagger-ui-express – Dokumentasi API otomatis
- jest – Framework testing
- supertest – Untuk testing endpoint HTTP
- babel – Dukungan ES6+ (import/export)

## 📦 Script NPM
| Perintah      | Fungsi                                         |
| ------------- | ---------------------------------------------- |
| `npm start`   | Menjalankan server                             |
| `npm test`    | Menjalankan unit test & API test               |

## 🧪 Testing
Struktur pengujian menggunakan:
- jest untuk unit test
- supertest untuk pengujian HTTP endpoint
Menjalankan semua test:
`npm test`

## 📌 Catatan
- Pastikan PostgreSQL sudah berjalan di mesin lokal atau remote
- Update koneksi database dan secret di file .env
- Endpoint dapat diperluas dengan role-based access atau modul lain

## 📄 Lisensi
Proyek ini menggunakan lisensi MIT