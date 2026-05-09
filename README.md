<div align="center">

# 📸⏳ PhotoBooth Mesin Waktu

### 🪄🚀 AI Time-Travel Photo Booth berbasis React + Vite + Gemini, lengkap dengan kamera, face transformation, era selector, style cartoon, filter, gallery, AI mood music, collage-ready, bilingual UI, dan dark mode

PhotoBooth Mesin Waktu adalah aplikasi photobooth AI yang mengubah selfie menjadi potret lintas zaman. Ambil foto dari kamera, pilih era tujuan, pilih gaya visual, biarkan Gemini mengubah wajah jadi karakter lucu/epik dari masa lain, lalu simpan ke galeri lokal, download, share, atau tambah musik suasana. Ini seperti studio foto, mesin waktu, dan komposer film kecil yang masuk ke satu layar HP. 🌀📷🎼

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini-Image%20%2B%20Music-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 📌 GitHub About / Description siap pakai

> **PhotoBooth Mesin Waktu 📸⏳ AI time-travel photobooth berbasis React + Vite + Gemini, dengan kamera selfie, face transformation, pilihan era, gaya cartoon/realistic, filter, AI mood music, gallery lokal, share/download, collage-ready, bilingual UI, dan dark mode.**

**Versi pendek:**

> **AI time-travel photobooth 📸⏳ Ubah selfie jadi potret Mesir Kuno, Viking, Cyberpunk, Samurai, Dino, dan era lain dengan Gemini.**

**Topics rekomendasi:**

`ai-photobooth` `time-travel` `gemini-ai` `image-generation` `react` `vite` `typescript` `tailwindcss` `camera-app` `photo-editor` `ai-music` `google-ai-studio`

---

## 🌟 Ringkasan Project

**PhotoBooth Mesin Waktu** adalah app photobooth mobile-first untuk membuat potret AI bertema era. User membuka kamera, mengarahkan wajah ke frame, memilih destinasi waktu, memilih gaya visual, lalu AI membuat potret baru yang terasa seperti poster film dari semesta paralel. 🧭🕰️

Project ini dibuat untuk:

- 📸 Eksperimen selfie AI
- 🎭 Transformasi wajah ke berbagai era
- 🤖 Gemini image generation
- 🎼 Eksperimen AI-generated mood music
- 🖼️ Galeri lokal berbasis browser
- 📱 Pengalaman UI seperti aplikasi mobile
- 🧑‍💻 Lanjutan development di Google AI Studio

---

## 🧩 Fitur Utama

| Area | Fitur |
|---|---|
| 📸 **Booth Kamera** | Ambil selfie langsung dari kamera browser dengan face target guide |
| 🧭 **Era Selector** | Pilih destinasi waktu seperti Mesir Kuno, Viking, Victoria, Cyberpunk, Samurai, Dino |
| 🎨 **Cartoon Style** | 3D Movie, Anime, Comic, Retro Rubber Hose, dan Realistic Cinematic Photo |
| 🧪 **Live Filter Preview** | Normal, Vintage/Sepia, Noir/Grayscale, Cinematic/Contrast |
| 🤖 **Gemini Image Transform** | Face reference diubah menjadi karakter sesuai era dan style |
| ✨ **AI Enhance** | Toggle enhancement visual untuk contrast, saturation, brightness |
| 🎼 **Era Music** | Optional AI mood music saat generate foto |
| 🖼️ **Gallery Lokal** | Simpan hasil ke localStorage, lihat grid, preview fullscreen |
| 📤 **Share & Download** | Download PNG dan Web Share API untuk berbagi file gambar |
| 🧩 **Collage-ready** | Tab Collage disiapkan untuk membuat kolase dari 2+ foto |
| 🎵 **Mood Music Tab** | Generate soundtrack dari mood/atmosphere text prompt |
| ⚙️ **Settings** | Bahasa ID/EN, dark mode, clear data, cloud/collab/privacy placeholder |
| 🌍 **Bilingual UI** | Bahasa Indonesia dan English |
| 🌙 **Dark Mode** | Default dark mode dengan toggle di settings |

---

## 📱 Navigasi App

PhotoBooth Mesin Waktu punya 5 tab utama:

| Tab | Fungsi |
|---|---|
| 📸 **Booth** | Ambil selfie dan generate potret lintas zaman |
| 🖼️ **Gallery** | Lihat, download, share, atau hapus foto tersimpan |
| 🧩 **Collage** | Placeholder fitur kolase time-travel dari beberapa foto |
| 🎵 **Music** | Generate AI soundtrack dari mood/atmosphere |
| ⚙️ **Settings** | Bahasa, dark mode, data lokal, dan fitur pro/coming soon |

---

## 📸 Booth Detail

Booth adalah inti aplikasi.

### Alur user

```txt
1. Kamera browser aktif
2. User memilih era tujuan
3. User memilih gaya visual
4. User memilih filter preview
5. Optional: aktifkan AI era music
6. User capture selfie
7. App crop portrait 3:4 dan mirror wajah
8. Gemini membuat potret baru sesuai era + style
9. User bisa enhance, retake, atau save
10. Foto masuk ke gallery lokal
```

### Face Target Guide

Booth punya visual guide:

- Bracket target wajah 🟩
- Label `[ Face Target ]`
- Instruksi untuk sejajarkan wajah
- Kamera memakai `facingMode: user`
- Capture portrait 600x800, aspect ratio 3:4

---

## 🧭 Era / Destinasi Waktu

Era yang tersedia saat ini:

| ID Internal | Indonesia | English |
|---|---|---|
| `mesir kuno` | Mesir Kuno | Ancient Egypt |
| `era viking` | Era Viking | Viking Age |
| `london masa victoria` | London Victoria | Victorian London |
| `masa depan cyberpunk` | Masa Depan Cyberpunk | Cyberpunk Future |
| `samurai jepang` | Jepang Feodal | Feudal Japan |
| `zaman dinosaurus` | Era Dinosaurus | Jurassic Era |

Ide pengembangan: tambah Wild West, Majapahit, Nusantara Klasik, Jakarta 2099, Atlantis, Renaissance, Space Colony, dan Post-Apocalyptic Desert. 🌋🏯🚀

---

## 🎨 Style Visual

Pilihan style saat ini:

- 🎬 **3D Movie**: nuansa film animasi 3D
- 🌸 **Anime**: gaya Japanese Anime
- 💥 **Comic**: ilustrasi komik yang kontras dan ekspresif
- 🕰️ **Retro**: vintage 1930s rubber hose cartoon
- 🎥 **Realistic**: cinematic photo manipulation / realistic face swap

Perbedaan prompt:

- Style **Realistic Cinematic Photo** memakai prompt realistis untuk face-swap sinematik.
- Style lain memakai prompt kartun/meme-style yang menggambar ulang wajah sebagai karakter ilustrasi.

---

## 🧪 Filter dan AI Enhance

### Filter Booth

- Normal
- Sepia / Vintage / Klasik
- Grayscale / Noir / Hitam Putih
- Contrast / Cinematic / Sinematik

Filter dipakai sebagai preview live dan dibake ke hasil saat user menyimpan foto.

### AI Enhance

AI Enhance saat ini berupa toggle visual enhancement:

- Contrast naik
- Saturation naik
- Brightness naik
- Animasi sparkle/enhancing

Catatan pengembangan: fitur ini bisa ditingkatkan jadi real AI enhancement pipeline memakai Gemini image edit atau provider image enhancement khusus.

---

## 🤖 Gemini Integration

File utama:

```txt
src/gemini.ts
```

Fungsi AI:

| Function | Fungsi |
|---|---|
| `generateBackground(era)` | Generate background era 3:4, saat ini tersedia sebagai helper |
| `generateCaricaturePortrait(faceDataUrl, era, style)` | Generate potret AI dari wajah + era + style |
| `generateMoodMusic(mood)` | Generate audio mood menggunakan Lyria preview stream |

Model yang dipakai:

- `gemini-2.5-flash-image` untuk image generation
- `lyria-3-clip-preview` untuk AI music generation

---

## 🎼 AI Mood Music

Ada dua jalur musik:

### 1. Musik saat Booth

Di Booth, user bisa menyalakan tombol musik. Saat foto digenerate, app juga mencoba membuat audio berdasarkan era. Jika audio gagal, proses image tetap jalan.

### 2. Music Tab

Music Tab punya input mood, misalnya:

```txt
Epic cinematic battle
```

Lalu AI membuat track pendek berdasarkan mood tersebut.

Fitur Music Tab:

- Input mood/atmosphere
- Generate music
- Loading state
- Play/pause
- Hidden audio element
- UI soundtrack card

---

## 🖼️ Gallery Detail

Gallery menyimpan foto di localStorage lewat AppContext.

Data foto:

```ts
interface Photo {
  id: string;
  dataUrl: string;
  era: string;
  timestamp: number;
  audioUrl?: string;
}
```

Fitur gallery:

- Grid 2 kolom
- Label era di tiap thumbnail
- Preview fullscreen
- Download HD PNG
- Share file via Web Share API
- Delete photo
- Auto-play audio jika foto punya audioUrl
- Empty state saat belum ada foto

Storage key:

```txt
chrono_photos
```

---

## 🧩 Collage Tab

Collage tab sudah disiapkan sebagai fondasi fitur kolase.

Saat ini:

- Butuh minimal 2 foto di gallery
- Jika kurang dari 2 foto, tampil pesan requirement
- Jika cukup, muncul tombol `Create New Collage`

Ide lanjut:

- Template kolase 2, 3, 4 foto
- Export collage PNG
- Era timeline collage
- Before/after layout
- Sticker mode
- Drag & drop layout

---

## ⚙️ Settings Detail

Settings saat ini mendukung:

- 🌍 Language: English / Indonesia
- 🌙 Dark Mode toggle
- 🗑️ Clear all local photos
- ☁️ Cloud Storage Sync placeholder / Pro
- 👥 Team Collaboration placeholder / Coming Soon
- 🛡️ Privacy & Data Security placeholder

State settings utama:

- `lang`
- `darkMode`
- `photos`

---

## 🌍 Bilingual UI

Translation file:

```txt
src/i18n.ts
```

Bahasa tersedia:

- 🇮🇩 Indonesia
- 🇺🇸 English

UI text yang sudah diterjemahkan:

- App title
- Booth controls
- Gallery
- Music
- Collage
- Settings
- Eras
- Filters
- Error messages
- Export/share text

---

## 🛠️ Tech Stack

| Bagian | Teknologi |
|---|---|
| UI | React 19 |
| Build Tool | Vite 6 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS 4 |
| Animasi | motion/react |
| AI | @google/genai |
| Icons | lucide-react |
| Env | dotenv + Vite env define |
| Server Support | Express + tsx dependency ready |
| Storage Lokal | localStorage |
| Camera | Browser MediaDevices API |
| Share | Web Share API |
| Export | Canvas data URL + PNG download |

---

## 📁 Struktur Penting

```txt
PhotoBoothMesinWaktu/
├── README.md
├── package.json
├── vite.config.ts
├── index.html
└── src/
    ├── App.tsx
    ├── AppContext.tsx
    ├── gemini.ts
    ├── i18n.ts
    ├── index.css
    └── components/
        ├── Booth.tsx
        ├── Gallery.tsx
        ├── CollageTab.tsx
        ├── MusicTab.tsx
        ├── SettingsTab.tsx
        └── Page.tsx
```

---

## 🚀 Jalankan Lokal

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan environment Gemini

Pastikan environment berikut tersedia:

```txt
GEMINI_API_KEY
```

Untuk Google AI Studio, masukkan key melalui environment panel. Untuk lokal, gunakan file environment lokal sesuai workflow kamu.

🛡️ Jangan hardcode API key ke source code dan jangan commit credential rahasia.

### 3. Jalankan dev server

```bash
npm run dev
```

Default server:

```txt
http://localhost:3000
```

### 4. Build production

```bash
npm run build
```

### 5. Preview build

```bash
npm run preview
```

### 6. Type-check

```bash
npm run lint
```

---

## 📷 Permission Kamera

App memakai:

```ts
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
```

Pastikan:

- Browser memberi izin kamera
- App dibuka di HTTPS atau localhost
- Jika permission error, buka ulang app di tab baru
- Mobile browser kadang butuh user gesture sebelum kamera aktif

---

## 🔐 Catatan Keamanan dan Privasi

- Foto disimpan lokal di browser melalui localStorage
- Belum ada cloud sync aktif
- Jika ingin publik production, tambahkan privacy notice
- Jangan upload foto user ke cloud tanpa consent jelas
- Gemini API key sebaiknya tidak diekspos di frontend untuk production publik
- Untuk production serius, pindahkan AI call ke backend proxy
- Tambahkan rate limiting jika backend dibuat
- Tambahkan tombol export/delete data yang lebih eksplisit

---

## 🧠 Cara Kerja App

```txt
1. User membuka Booth
2. Kamera aktif dan menampilkan face target guide
3. User memilih era, visual style, filter, dan optional music
4. User capture selfie
5. Canvas mengambil portrait 3:4 dan mirror camera
6. Gemini menerima image reference + prompt era/style
7. Gemini mengembalikan image data URL
8. User bisa enhance, retake, atau save
9. Save memasukkan foto ke AppContext + localStorage
10. Gallery menampilkan foto untuk preview, download, share, atau delete
```

---

## 🧩 Panduan Pengembangan Lanjutan

### ➕ Tambah era baru

Edit:

```txt
src/i18n.ts
```

Tambahkan key era di `translations.en.eras` dan `translations.id.eras`.

Contoh ide:

- `wild west`
- `majapahit kingdom`
- `jakarta 2099`
- `atlantis`
- `renaissance italy`

### ➕ Tambah style visual baru

Edit array `cartoonStyles` di:

```txt
src/components/Booth.tsx
```

Lalu update logic prompt jika style butuh perlakuan khusus di:

```txt
src/gemini.ts
```

### ➕ Tambah filter baru

Area yang perlu diubah:

```txt
src/components/Booth.tsx
src/i18n.ts
```

Tambahkan filter di array `filters`, logic `getCssFilter`, dan label bahasa.

### ➕ Upgrade AI Enhance jadi real AI

Saat ini AI Enhance adalah visual post-processing lokal. Untuk upgrade:

- Tambahkan function `enhancePortrait(imageDataUrl)` di `src/gemini.ts`
- Kirim gambar hasil ke Gemini image model
- Minta peningkatan detail, lighting, sharpness, dan color grade
- Simpan hasil baru sebagai image final

### ➕ Real Collage Builder

Area kerja:

```txt
src/components/CollageTab.tsx
src/AppContext.tsx
```

Ide:

- Pilih banyak foto
- Layout 2x2 / filmstrip / timeline
- Export canvas PNG
- Tambah caption era
- Tambah tanggal/timestamp

### ➕ Cloud Sync

Settings sudah punya placeholder Cloud Storage Sync. Lanjutan yang masuk akal:

- Firebase Auth
- Firebase Storage untuk image
- Firestore metadata photo
- Sync per user
- Delete cloud photo
- Privacy consent

### ➕ Backend Proxy AI

Untuk production publik, lebih aman bila Gemini call lewat backend:

```txt
client -> /api/generate-portrait -> Gemini
client -> /api/generate-music -> Gemini/Lyria
```

Keuntungan:

- API key tidak bocor ke browser
- Bisa rate limit
- Bisa validasi request
- Bisa logging error lebih rapi
- Bisa tambah moderation/consent flow

---

## ✅ Checklist Sebelum Rilis

- [ ] Test kamera di Chrome desktop
- [ ] Test kamera di Android Chrome
- [ ] Test kamera di iOS Safari
- [ ] Test permission denied state
- [ ] Test semua era
- [ ] Test semua style visual
- [ ] Test semua filter
- [ ] Test generate dengan musik aktif
- [ ] Test Music Tab generate/play/pause
- [ ] Test save ke gallery
- [ ] Test gallery download
- [ ] Test Web Share API di mobile
- [ ] Test delete photo
- [ ] Test clear all data
- [ ] Test bahasa Indonesia/English
- [ ] Test dark mode
- [ ] Pastikan API key tidak masuk commit

---

## 🧪 Roadmap Pengembangan

### 🎯 Prioritas Cepat

- [ ] Tambah loading progress step-by-step saat processing
- [ ] Tambah toast UI menggantikan alert
- [ ] Tambah search/filter gallery by era
- [ ] Tambah delete confirmation modal yang lebih cantik
- [ ] Tambah download sticker mode transparan jika memungkinkan
- [ ] Tambah retake confirmation saat hasil belum disimpan
- [ ] Tambah fallback ketika AI music gagal
- [ ] Tambah error banner Gemini quota/rate limit

### 🚀 Prioritas Menengah

- [ ] Real collage builder
- [ ] Export collage PNG
- [ ] PWA installable
- [ ] Share sheet yang lebih rapi
- [ ] Prompt presets per era
- [ ] Random era mode
- [ ] Random style mode
- [ ] Before/after comparison slider
- [ ] Local backup/restore gallery JSON

### 🪄 Prioritas AI Studio

- [ ] AI prompt enhancer per era
- [ ] AI face consistency improvement
- [ ] AI super-resolution / detail enhance
- [ ] AI sticker cutout mode
- [ ] AI caption generator untuk hasil foto
- [ ] AI soundtrack mood presets
- [ ] AI cinematic poster mode
- [ ] AI time-travel story caption per foto

### ☁️ Prioritas Production

- [ ] Backend proxy untuk Gemini
- [ ] Auth + cloud sync
- [ ] Firebase Storage / object storage
- [ ] Privacy policy + consent
- [ ] Rate limiting
- [ ] Queue untuk long-running generation
- [ ] Error monitoring

---

## 🤖 Prompt Lanjutan untuk Google AI Studio

```txt
Lanjutkan project PhotoBooth Mesin Waktu tanpa mengubah struktur besar yang sudah ada.
Jangan hapus fitur existing: Booth camera, Gallery, CollageTab, MusicTab, SettingsTab, AppContext, i18n, Gemini image generation, Gemini/Lyria music generation, localStorage photos, filters, styles, dark mode, dan bilingual UI.
Pertahankan React + TypeScript + Vite + Tailwind CSS + motion/react + @google/genai.
Buat perubahan kecil, modular, dan aman.
Jangan hardcode credential rahasia di source code.
Jika menambah fitur AI untuk production, prioritaskan backend proxy agar API key tidak bocor ke client.
Jika menambah text UI baru, tambahkan versi Indonesia dan English di i18n.ts.
Jika menambah era/style/filter baru, update Booth UI, prompt logic bila perlu, dan dokumentasi.
Jaga mobile-first layout max-width seperti app photobooth.
Jelaskan file mana yang diubah dan alasan perubahannya.
```

---

## 🧹 Script NPM

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan Vite dev server di port 3000 |
| `npm run build` | Build production |
| `npm run preview` | Preview hasil build |
| `npm run clean` | Menghapus folder `dist` |
| `npm run lint` | Type-check dengan `tsc --noEmit` |

---

## 🧯 Known Notes

- `generateBackground()` tersedia sebagai helper, tapi flow Booth utama memakai `generateCaricaturePortrait()`.
- Collage tab masih fondasi/placeholder, belum builder penuh.
- Cloud Sync, Collaboration, dan Privacy item di settings masih placeholder.
- AI Enhance saat ini visual toggle lokal, belum AI image re-generation.
- API key masih didefinisikan ke frontend via Vite define, lebih cocok untuk prototype/AI Studio daripada production publik.

---

## 🧭 Roadmap Mini

```txt
v0.1 ✅ Camera booth + Gemini time-travel portrait
v0.2 ✅ Era/style/filter + local gallery
v0.3 ✅ AI mood music + Music tab
v0.4 ✅ Bilingual UI + dark mode + settings
v0.5 🔜 Real collage builder + export
v0.6 🔜 PWA + backend proxy + cloud sync optional
v0.7 🔜 AI enhance real pipeline + sticker/poster modes
```

---

<div align="center">

## 📸⏳ PhotoBooth Mesin Waktu

**Ambil selfie, pilih era, tekan tombol, lalu biarkan wajahmu nyasar ke timeline yang paling dramatis.**  
Satu kamera kecil, satu portal waktu, banyak kemungkinan absurd yang kinclong. 🌀🎭🚀

</div>
