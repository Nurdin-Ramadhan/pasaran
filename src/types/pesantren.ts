export interface BeritaItem {
  id: number
  created_at: string
  updated_at: string
  judul: string
  slug: string
  ringkasan: string | null
  konten: string | null
  kategori: string
  status: 'DRAFT' | 'PUBLISHED'
  thumbnail_url: string | null
  penulis_id: string | null
  is_featured: boolean
  tanggal_publish: string
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
