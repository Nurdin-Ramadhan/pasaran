import { JenisDiklat } from "@/types/diklat"

export const DIKLAT_LABELS: Record<JenisDiklat, string> = {
  MAULID: "Maulid",
  SYABAN: "Sya'ban",
  RAMADHAN: "Ramadhan",
  DZULHIJJAH: "Dzulhijjah",
}

export const DIKLAT_ORDER: JenisDiklat[] = ["MAULID", "SYABAN", "RAMADHAN", "DZULHIJJAH"]

export type DiklatConfig = {
  id: number
  tahun_hijriah: number
  periode: number
  uang_miftah: number
  biaya_listrik: number
  kos_makan: number
  tafaruqon: number
  is_active: boolean
}

export type Kitab = {
  id: number
  nama_kitab: string
  harga: number
  jenis_diklat: JenisDiklat
  is_active: boolean
}

export type DiklatParticipantStat = {
  jenis_diklat: JenisDiklat
  tahun_diklat: number
  jumlah_peserta: number
  total_pendaftaran: number
  total_kitab: number
}

export type DiklatProgram = {
  jenis_diklat: JenisDiklat
  label: string
  slug: string
  kitab: Kitab[]
  jumlah_peserta: number
  totalKitab: number
}

export type DiklatOverview = {
  config: DiklatConfig | null
  programs: DiklatProgram[]
}

export function jenisFromSlug(slug: string): JenisDiklat | null {
  const normalized = slug.replace(/^pasaran-/, "").toUpperCase()
  return DIKLAT_ORDER.includes(normalized as JenisDiklat) ? (normalized as JenisDiklat) : null
}
