## API SISFO Laundry

Ini adalah proyek API Sistem Informasi Laundry sederhana khusus laundry kiloan yang dibangun dengan menggunakan Node.js, Express dan MongoDB. API ini dirancang untuk mengelola data dan operasi terkait laundry dalam sebuah sistem informasi laundry. Dengan API ini, kita dapat dengan mudah melakukan operasi seperti menambahkan data pelanggan, mencatat pesanan laundry dan banyak lagi.

## Library yang Digunakan

Proyek ini dibangun dengan teknologi berikut:

- **Node.js**: Menggunakan runtime JavaScript untuk menjalankan server.
- **Express**: Framework web Node.js yang mempermudah pembuatan API.
- **MongoDB**: Basis data NoSQL yang fleksibel untuk menyimpan data aplikasi.

## Fitur

- **Fitur Master User** digunakan untuk mengelola pengguna atau staf yang memiliki akses ke sistem.
- **Fitur Master Pelanggan** digunakan untuk mengelola data pelanggan yang menggunakan layanan laundry.
- **Fitur Master Barang** digunakan sebagai layanan yang tersedia di laundry.
- **Fitur Transaksi Penerimaan Cucian** adalah inti dari sistem ini, digunakan untuk mencatat pesanan pelanggan dan mengelola transaksi.

## Instalasi

Clone project ini dengan perintah:

```
git clone https://github.com/kongbayan92/api-sisfo-laundry.git
cd api-sisfo-laundry
```

> Pastikan database MongoDB sudah berjalan.

Kemudian, ganti file `.env-copy` menjadi `.env` dan isi dengan konfigurasi berikut:

```
API_PORT=<port-kamu>
MONGO_URI=mongodb://0.0.0.0:27017/api-sisfo-laundry
TOKEN_KEY=<token-key>
```

Kemudian, instal library yang diperlukan:

```
npm install
```

Setelah itu, jalankan project dengan perintah:

```
npm run dev
```

> Pastikan nodemon sudah diinstal.
