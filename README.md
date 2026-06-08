# Simulasi Optimasi Penempatan Mesin Vending di Kampus Menggunakan Hill Climbing

## Deskripsi Proyek

Proyek ini merupakan aplikasi berbasis web yang mensimulasikan proses optimasi penempatan mesin vending di lingkungan kampus menggunakan algoritma Hill Climbing.

Tujuan utama simulasi adalah mencari posisi mesin vending yang dapat melayani jumlah mahasiswa terbanyak berdasarkan radius layanan tertentu. Posisi mahasiswa dihasilkan secara acak pada area kampus berbentuk grid 20×20, kemudian algoritma pencarian lokal digunakan untuk menemukan lokasi terbaik.

Aplikasi ini mengimplementasikan tiga varian algoritma Hill Climbing:

1. Simple Hill Climbing
2. Steepest-Ascent Hill Climbing
3. Stochastic Hill Climbing

Selain menampilkan hasil akhir optimasi, aplikasi juga memvisualisasikan proses pencarian solusi secara interaktif sehingga pengguna dapat melihat bagaimana algoritma bergerak dari satu posisi ke posisi lain hingga menemukan solusi terbaik.

---

## Tujuan Proyek

- Memahami konsep Local Search Algorithm.
- Membandingkan perilaku beberapa varian Hill Climbing.
- Memvisualisasikan proses pencarian solusi secara interaktif.
- Mengidentifikasi kondisi Local Optimum dan Plateau.
- Menyediakan simulasi yang mudah digunakan untuk keperluan pembelajaran Artificial Intelligence.

---

## Fitur Utama

### Simulasi Algoritma

- Simple Hill Climbing
- Steepest-Ascent Hill Climbing
- Stochastic Hill Climbing

### Visualisasi Interaktif

- Peta kampus berbentuk grid
- Posisi mahasiswa
- Posisi mesin vending
- Jalur pencarian algoritma
- Radius layanan vending machine
- Status pencarian

### Analisis Hasil

- Grafik perkembangan fitness setiap iterasi
- Tabel riwayat pencarian
- Informasi posisi terbaik
- Jumlah iterasi
- Fitness maksimum
- Kondisi solusi (Local Optimum atau Plateau)

### Pengaturan Parameter

- Pemilihan algoritma
- Jumlah mahasiswa
- Radius layanan
- Kecepatan animasi

---

## Teknologi yang Digunakan

### Backend

- Python 3
- Flask

### Frontend

- HTML5
- CSS3
- JavaScript

### Visualisasi

- HTML Canvas
- Chart.js

### Algoritma AI

- Simple Hill Climbing
- Steepest-Ascent Hill Climbing
- Stochastic Hill Climbing

---

## Struktur Folder

```text
vending_hill_climbing/
│
├── app.py
│
├── algorithms/
│   ├── simple_hc.py
│   ├── steepest_hc.py
│   └── stochastic_hc.py
│
├── utils/
│   ├── fitness.py
│   └── campus_generator.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── simulation.js
│
├── requirements.txt
│
└── README.md
