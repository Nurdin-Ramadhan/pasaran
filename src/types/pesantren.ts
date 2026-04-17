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
