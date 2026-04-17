# PROMPT REFACTORING: Website Diklat → Website Pesantren Al-Hasanah
## Untuk AI CLI (Gemini CLI / Claude Code / Cursor / dll)

---

## KONTEKS PROYEK

Kamu sedang melakukan refactoring sebuah website Next.js yang sebelumnya
hanya berfungsi sebagai website pendaftaran Diklat, menjadi **website resmi
dan portofolio lengkap Pondok Pesantren Al-Hasanah**. Diklat tidak dihapus,
melainkan dijadikan sub-fitur dengan route `/diklat/[slug]`.

**Stack yang digunakan:**
- Next.js (App Router)
- shadcn/ui + Tailwind CSS
- Supabase (PostgreSQL)
- TypeScript

**Prinsip utama yang WAJIB dipertahankan:**
1. Skema warna, estetika, dan kombinasi warna yang sudah ada — elegan,
   profesional, modern, dengan dukungan light/dark mode penuh
2. Semua animasi yang sudah berjalan
3. Komponen `Hero.tsx` dan `Leadership.tsx` — JANGAN diubah strukturnya,
   hanya boleh dipindahkan posisinya jika diperlukan
4. Semua komponen di `components/ui/` — jangan disentuh
5. Koneksi Supabase di `utils/supabase/` — jangan diubah
6. `ThemeProvider.tsx` — jangan diubah

---

## STRUKTUR FOLDER SAAT INI

```
src/
├── actions/
│   └── register.ts
├── app/
│   ├── daftar/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── forms/
│   │   └── RegistrationForm.tsx
│   ├── landing/
│   │   ├── Hero.tsx               ← PERTAHANKAN
│   │   ├── Leadership.tsx         ← PERTAHANKAN
│   │   ├── Navbar.tsx             ← REFACTOR TOTAL
│   │   ├── OtherDiklat.tsx
│   │   └── UpcomingDiklat.tsx
│   ├── pdf/
│   │   ├── DownloadPDFButton.tsx
│   │   └── RegistrationReceipt.tsx
│   ├── ThemeProvider.tsx          ← JANGAN DIUBAH
│   └── ui/                        ← JANGAN DIUBAH APAPUN
├── lib/
│   ├── utils.ts
│   └── validations/
│       └── registration.ts
├── middleware.ts
├── types/
│   └── diklat.ts
└── utils/
    └── supabase/
        ├── client.ts              ← JANGAN DIUBAH
        └── server.ts              ← JANGAN DIUBAH
```

---

## STRUKTUR FOLDER TARGET SETELAH REFACTORING

```
src/
├── actions/
│   └── register.ts                ← tidak berubah
├── app/
│   ├── (pesantren)/               ← route group, tidak muncul di URL
│   │   ├── tentang/
│   │   │   └── page.tsx           ← BUAT BARU
│   │   ├── program/
│   │   │   └── page.tsx           ← BUAT BARU
│   │   ├── fasilitas/
│   │   │   └── page.tsx           ← BUAT BARU
│   │   ├── berita/
│   │   │   └── page.tsx           ← BUAT BARU
│   │   └── kontak/
│   │       └── page.tsx           ← BUAT BARU
│   ├── diklat/
│   │   ├── page.tsx               ← BUAT BARU (list semua diklat)
│   │   └── [slug]/
│   │       ├── page.tsx           ← PINDAHKAN logika dari app/page.tsx lama
│   │       └── daftar/
│   │           └── page.tsx       ← PINDAHKAN dari app/daftar/page.tsx
│   ├── favicon.ico
│   ├── globals.css                ← tidak berubah
│   ├── layout.tsx                 ← update metadata saja
│   └── page.tsx                   ← REFACTOR menjadi beranda pesantren
├── components/
│   ├── forms/
│   │   └── RegistrationForm.tsx   ← tidak berubah
│   ├── landing/
│   │   ├── Hero.tsx               ← PERTAHANKAN, tidak diubah
│   │   ├── Leadership.tsx         ← PERTAHANKAN, tidak diubah
│   │   ├── Navbar.tsx             ← REFACTOR TOTAL (lihat spesifikasi)
│   │   ├── OtherDiklat.tsx        ← PINDAHKAN ke components/diklat/
│   │   └── UpcomingDiklat.tsx     ← PINDAHKAN ke components/diklat/
│   ├── pesantren/                 ← BUAT FOLDER BARU
│   │   ├── AboutSection.tsx
│   │   ├── ProgramSection.tsx
│   │   ├── FasilitasSection.tsx
│   │   ├── BeritaSection.tsx
│   │   ├── StatistikSection.tsx
│   │   └── CTASection.tsx
│   ├── diklat/                    ← BUAT FOLDER BARU
│   │   ├── DiklatCard.tsx
│   │   ├── DiklatList.tsx
│   │   └── DiklatHero.tsx
│   ├── layout/                    ← BUAT FOLDER BARU
│   │   ├── Footer.tsx             ← BUAT BARU
│   │   └── PageHeader.tsx         ← BUAT BARU (hero kecil untuk inner pages)
│   ├── pdf/                       ← tidak berubah
│   ├── ThemeProvider.tsx          ← tidak berubah
│   └── ui/                        ← tidak berubah
├── lib/
│   ├── utils.ts
│   └── validations/
│       └── registration.ts
├── middleware.ts
├── types/
│   ├── diklat.ts                  ← tidak berubah
│   └── pesantren.ts               ← BUAT BARU
└── utils/
    └── supabase/                  ← tidak berubah
```

---

## TASK 1: REFACTOR NAVBAR

**File target:** `src/components/landing/Navbar.tsx`

Refactor total Navbar menjadi navigasi enterprise-grade. Pertahankan
skema warna, dark/light mode, dan animasi yang sudah ada.

**Spesifikasi Navbar:**

```
DESKTOP LAYOUT:
┌──────────────────────────────────────────────────────────────────┐
│  [Logo/Nama Pesantren]    [Nav Links]              [CTA] [Theme] │
└──────────────────────────────────────────────────────────────────┘

Nav Links menggunakan pola MEGA MENU untuk item yang punya sub-halaman:

[ Beranda ]
[ Tentang  ▾ ]  → dropdown: Profil Pesantren | Pengasuh | Sejarah | Visi Misi
[ Program  ▾ ]  → dropdown: Kurikulum | Kegiatan | Ekstrakulikuler
[ Diklat   ▾ ]  → dropdown: Diklat Aktif | Arsip Diklat | Daftar Sekarang
[ Fasilitas ]
[ Berita ]
[ Kontak ]

CTA Button di kanan: "Daftar Santri" — warna accent yang sudah ada
Theme toggle: sun/moon icon, sudah ada, pertahankan
```

**Behavior yang harus diimplementasi:**

1. **Sticky navbar** dengan efek blur/frosted glass saat scroll
   (`backdrop-blur-md` + `bg-background/80`)

2. **Scroll-aware**: saat di top halaman, navbar sedikit transparan.
   Saat scroll down, navbar solid dengan shadow halus.

3. **Mega menu dropdown**: saat hover item yang punya sub-menu,
   muncul dropdown dengan animasi fade+slide ke bawah.
   Dropdown memiliki grid layout 2 kolom dengan icon dan deskripsi singkat
   per item, bukan list biasa. Contoh untuk "Tentang":
   ```
   ┌─────────────────────────────────────┐
   │  🏫 Profil Pesantren                │
   │     Sejarah dan latar belakang      │
   │                                     │
   │  👤 Pengasuh                        │
   │     Pimpinan dan pengajar           │
   │                                     │
   │  📋 Visi & Misi                     │
   │     Tujuan dan arah pesantren       │
   └─────────────────────────────────────┘
   ```

4. **Active state**: item menu yang sesuai route aktif mendapat highlight
   dengan warna accent dan underline animasi.

5. **Mobile (hamburger menu)**:
   - Tombol hamburger di kanan
   - Sheet/drawer dari kiri (gunakan shadcn Sheet)
   - Accordion untuk sub-menu di dalam drawer
   - Smooth open/close animation

6. **Hover animation pada link**: underline yang tumbuh dari kiri ke kanan
   menggunakan `after:` pseudo-element dan `transition-all`.

---

## TASK 2: REFACTOR HALAMAN BERANDA (page.tsx)

**File target:** `src/app/page.tsx`

Halaman beranda bukan lagi halaman diklat. Jadikan sebagai portofolio
dan wajah pertama pesantren. Susun section dalam urutan berikut:

```
1. <Navbar />                     ← sudah ada, diimport
2. <Hero />                       ← PERTAHANKAN PERSIS, sudah ada
3. <StatistikSection />           ← BUAT BARU (lihat spesifikasi)
4. <AboutSection />               ← BUAT BARU (ringkasan tentang pesantren)
5. <ProgramSection />             ← BUAT BARU (highlight program unggulan)
6. <Leadership />                 ← PERTAHANKAN PERSIS, sudah ada
7. <FasilitasSection />           ← BUAT BARU (preview fasilitas)
8. <UpcomingDiklat />             ← PINDAHKAN dari posisi lama, tetap ada
9. <BeritaSection />              ← BUAT BARU (3 berita terbaru)
10. <CTASection />                ← BUAT BARU (call to action daftar santri)
11. <Footer />                    ← BUAT BARU
```

**Spesifikasi StatistikSection:**
Komponen dengan 4 angka yang muncul dengan animasi counting saat
masuk viewport (gunakan Intersection Observer):
- Total Santri: [angka]
- Tahun Berdiri: [angka]
- Alumni: [angka]
- Pengajar: [angka]

Gunakan `data-*` attribute untuk nilai, sehingga mudah diganti tanpa
ubah kode. Layout: 4 kolom di desktop, 2 kolom di mobile.

**Spesifikasi CTASection:**
Banner lebar dengan background gradient dari warna yang sudah ada,
teks ajakan, dan dua tombol: "Daftar Sekarang" dan "Hubungi Kami".

---

## TASK 3: BUAT HALAMAN DIKLAT

**File baru:** `src/app/diklat/page.tsx`

Halaman ini menampilkan semua program Diklat yang tersedia.
Data diambil dari Supabase menggunakan pattern yang sudah ada
di `utils/supabase/server.ts`.

**Layout halaman:**
```
<PageHeader title="Program Diklat" subtitle="..." />
<DiklatList />   ← menampilkan semua diklat sebagai card grid
```

**File baru:** `src/app/diklat/[slug]/page.tsx`

Pindahkan logika yang ada di `app/page.tsx` lama (detail diklat)
ke sini. Sesuaikan agar membaca parameter `slug` dari URL.

**File baru:** `src/app/diklat/[slug]/daftar/page.tsx`

Pindahkan `app/daftar/page.tsx` ke sini. Update semua referensi
path yang berubah.

---

## TASK 4: BUAT HALAMAN INNER (Tentang, Program, dll)

Buat 5 halaman baru dengan struktur yang konsisten:

**Pattern setiap halaman:**
```tsx
// Setiap halaman inner menggunakan pattern ini:
export default function Page() {
  return (
    <>
      <Navbar />
      <PageHeader title="..." subtitle="..." />
      <main className="container mx-auto px-4 py-16">
        {/* Konten halaman */}
      </main>
      <Footer />
    </>
  )
}
```

**`src/app/(pesantren)/tentang/page.tsx`**
Konten: Sejarah singkat pesantren, visi misi, nilai-nilai pesantren.
Gunakan layout dua kolom (teks + foto placeholder) yang responsif.

**`src/app/(pesantren)/program/page.tsx`**
Konten: Grid kartu program pendidikan (Tahfidz, Nahwu Sharaf, dll).
Setiap kartu punya ikon, judul, dan deskripsi singkat.

**`src/app/(pesantren)/fasilitas/page.tsx`**
Konten: Grid foto fasilitas dengan overlay teks. Gunakan
`aspect-video` untuk konsistensi rasio gambar.

**`src/app/(pesantren)/berita/page.tsx`**
Konten: List berita dengan filter kategori. Data statis dulu
(bisa disambungkan ke Supabase belakangan).

**`src/app/(pesantren)/kontak/page.tsx`**
Konten: Informasi kontak, embed Google Maps (iframe placeholder),
dan form kontak sederhana menggunakan komponen dari `components/ui/`.

---

## TASK 5: BUAT KOMPONEN FOOTER

**File baru:** `src/components/layout/Footer.tsx`

Footer enterprise dengan layout 4 kolom:

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo & Deskripsi]  [Navigasi]   [Program]   [Kontak & Sosmed]  │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  © 2025 Pondok Pesantren Al-Hasanah. All rights reserved.        │
└──────────────────────────────────────────────────────────────────┘
```

Kolom 1: Logo/nama pesantren + deskripsi 2-3 kalimat + icon sosmed
Kolom 2: Link navigasi utama
Kolom 3: Link program & diklat
Kolom 4: Alamat, nomor telepon, email

Warna footer: gunakan `bg-card` atau `bg-muted` dari tema yang ada,
agar otomatis support dark/light mode.

---

## TASK 6: BUAT KOMPONEN PageHeader

**File baru:** `src/components/layout/PageHeader.tsx`

Hero kecil untuk halaman-halaman inner (bukan beranda).

```tsx
interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
}
```

Visual: background dengan pattern halus atau gradient tipis dari
warna yang sudah ada. Tinggi: `py-20`. Teks center.
Breadcrumb di bawah subtitle jika ada.

---

## TASK 7: UPDATE METADATA & SEO

**File target:** `src/app/layout.tsx`

Update metadata root:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Pondok Pesantren Al-Hasanah',
    template: '%s | Pondok Pesantren Al-Hasanah',
  },
  description: 'Pondok Pesantren Al-Hasanah — Lembaga pendidikan Islam...',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Pondok Pesantren Al-Hasanah',
  },
}
```

Tambahkan metadata spesifik di setiap halaman baru:

```typescript
// Contoh untuk halaman Tentang
export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Sejarah dan profil Pondok Pesantren Al-Hasanah...',
}
```

---

## TASK 8: BUAT FILE TYPES BARU

**File baru:** `src/types/pesantren.ts`

```typescript
export interface BeritaItem {
  id: string
  judul: string
  slug: string
  ringkasan: string
  konten: string
  gambar_url?: string
  kategori: 'pengumuman' | 'kegiatan' | 'prestasi' | 'umum'
  published_at: string
}

export interface ProgramItem {
  id: string
  nama: string
  deskripsi: string
  icon: string
  highlight: boolean
}

export interface FasilitasItem {
  id: string
  nama: string
  deskripsi: string
  gambar_url?: string
}

export interface StatistikItem {
  label: string
  nilai: number
  satuan?: string
}
```

---

## TASK 9: UPDATE MIDDLEWARE

**File target:** `src/middleware.ts`

Pastikan middleware yang ada tidak memblokir route-route baru.
Jika middleware hanya mengatur redirect untuk `/daftar`,
update agar juga handle `/diklat/[slug]/daftar`.

---

## ATURAN WAJIB SELAMA REFACTORING

1. **JANGAN ubah** komponen `Hero.tsx` dan `Leadership.tsx` sedikitpun.
   Kedua komponen ini sudah sempurna dan dipertahankan persis.

2. **JANGAN ubah** semua file di `components/ui/` — ini adalah
   komponen shadcn/ui yang tidak boleh dimodifikasi manual.

3. **JANGAN ubah** `utils/supabase/client.ts` dan `server.ts`.

4. **JANGAN ubah** `ThemeProvider.tsx`.

5. **PERTAHANKAN** semua CSS custom variable di `globals.css`.
   Hanya boleh menambah, tidak menghapus yang sudah ada.

6. **PERTAHANKAN** semua animasi yang sudah berjalan.
   Jangan hapus class animasi yang sudah ada.

7. Semua komponen baru harus **otomatis support dark/light mode**
   dengan menggunakan variabel warna dari tema yang ada
   (`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, dll).
   Jangan gunakan warna hardcode seperti `bg-white` atau `text-black`.

8. Semua halaman baru harus **fully responsive**:
   mobile-first, breakpoint `md:` untuk tablet, `lg:` untuk desktop.

9. Gunakan **`next/link`** untuk semua navigasi internal, bukan `<a>`.

10. Gunakan **`next/image`** untuk semua gambar, bukan `<img>`.
    Untuk gambar yang belum ada, gunakan placeholder dengan format:
    `src="/images/placeholder-[nama].jpg"` dan beri komentar
    `{/* TODO: ganti dengan gambar asli */}`.

---

## URUTAN PENGERJAAN YANG DIREKOMENDASIKAN

Kerjakan dalam urutan ini untuk menghindari error karena dependency:

```
TAHAP 1 — Fondasi (tidak ada yang rusak dulu)
  1. Buat types/pesantren.ts
  2. Buat components/layout/PageHeader.tsx
  3. Buat components/layout/Footer.tsx

TAHAP 2 — Pindahkan & Reorganisasi
  4. Pindahkan OtherDiklat.tsx dan UpcomingDiklat.tsx ke components/diklat/
  5. Update semua import yang berubah
  6. Buat app/diklat/[slug]/page.tsx dari logika app/page.tsx lama
  7. Buat app/diklat/[slug]/daftar/page.tsx dari app/daftar/page.tsx lama
  8. Verifikasi /diklat/[slug] berjalan dengan benar

TAHAP 3 — Navbar Baru
  9. Refactor Navbar.tsx total
  10. Test semua link dan dropdown di desktop dan mobile

TAHAP 4 — Halaman Baru
  11. Buat semua komponen di components/pesantren/
  12. Buat app/(pesantren)/tentang/page.tsx
  13. Buat app/(pesantren)/program/page.tsx
  14. Buat app/(pesantren)/fasilitas/page.tsx
  15. Buat app/(pesantren)/berita/page.tsx
  16. Buat app/(pesantren)/kontak/page.tsx

TAHAP 5 — Beranda Baru
  17. Refactor app/page.tsx menjadi beranda pesantren
  18. Pastikan Hero.tsx dan Leadership.tsx tetap ada di posisinya

TAHAP 6 — Finalisasi
  19. Update metadata di layout.tsx dan semua halaman
  20. Update middleware.ts jika diperlukan
  21. Jalankan `npm run build` dan pastikan tidak ada error TypeScript
```

---

## CATATAN UNTUK AI

- Jika menemukan kode yang tidak jelas asalnya, tanya dulu sebelum mengubah.
- Jika ada konflik antara instruksi di atas dengan kode eksisting yang
  kelihatannya penting, prioritaskan mempertahankan kode eksisting dan
  tanya konfirmasi.
- Semua komponen baru ditulis dalam TypeScript dengan interface yang proper.
- Jangan install library baru tanpa konfirmasi — gunakan apa yang sudah ada.
- Setelah selesai setiap tahap, jalankan `npm run dev` untuk memastikan
  tidak ada error sebelum lanjut ke tahap berikutnya.
