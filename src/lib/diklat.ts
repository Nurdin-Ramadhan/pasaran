import { createClient } from "@/utils/supabase/server"
import { JenisDiklat } from "@/types/diklat"
import {
  DIKLAT_LABELS,
  DIKLAT_ORDER,
  DiklatConfig,
  DiklatOverview,
  DiklatParticipantStat,
  Kitab,
} from "@/lib/diklat-shared"

type RawConfig = {
  id: number
  tahun_hijriah: number
  periode: number | string | null
  uang_miftah: number | string | null
  biaya_listrik: number | string | null
  kos_makan: number | string | null
  tafaruqon: number | string | null
  is_active: boolean | null
}

type RawKitab = {
  id: number
  nama_kitab: string
  harga: number | string
  jenis_diklat: string
  is_active: boolean | null
}

type RawParticipantStat = {
  jenis_diklat: string
  tahun_diklat: number
  jumlah_peserta: number | string
  total_pendaftaran: number | string | null
  total_kitab: number | string | null
}

function toNumber(value: number | string | null | undefined, fallback = 0) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

function isJenisDiklat(value: string): value is JenisDiklat {
  return DIKLAT_ORDER.includes(value as JenisDiklat)
}

function slugFromJenis(jenis: JenisDiklat) {
  return jenis.toLowerCase()
}

function normalizeConfig(config: RawConfig | null): DiklatConfig | null {
  if (!config) return null

  return {
    id: config.id,
    tahun_hijriah: config.tahun_hijriah,
    periode: toNumber(config.periode, 1),
    uang_miftah: toNumber(config.uang_miftah),
    biaya_listrik: toNumber(config.biaya_listrik),
    kos_makan: toNumber(config.kos_makan),
    tafaruqon: toNumber(config.tafaruqon),
    is_active: Boolean(config.is_active),
  }
}

function normalizeKitab(row: RawKitab): Kitab | null {
  if (!isJenisDiklat(row.jenis_diklat)) return null

  return {
    id: row.id,
    nama_kitab: row.nama_kitab,
    harga: toNumber(row.harga),
    jenis_diklat: row.jenis_diklat,
    is_active: Boolean(row.is_active),
  }
}

function normalizeStat(row: RawParticipantStat): DiklatParticipantStat | null {
  if (!isJenisDiklat(row.jenis_diklat)) return null

  return {
    jenis_diklat: row.jenis_diklat,
    tahun_diklat: row.tahun_diklat,
    jumlah_peserta: toNumber(row.jumlah_peserta),
    total_pendaftaran: toNumber(row.total_pendaftaran),
    total_kitab: toNumber(row.total_kitab),
  }
}

export async function getDiklatOverview(): Promise<DiklatOverview> {
  const supabase = await createClient()

  const [{ data: configData }, { data: kitabData }, { data: pesertaData }] = await Promise.all([
    supabase
      .from("config_diklat")
      .select("id,tahun_hijriah,periode,uang_miftah,biaya_listrik,kos_makan,tafaruqon,is_active")
      .eq("is_active", true)
      .order("tahun_hijriah", { ascending: false })
      .order("periode", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("master_kitab")
      .select("id,nama_kitab,harga,jenis_diklat,is_active")
      .eq("is_active", true)
      .order("jenis_diklat", { ascending: true })
      .order("id", { ascending: true }),
    supabase
      .from("peserta_diklat")
      .select("jenis_diklat,tahun_diklat,biaya_pendaftaran,belanja_kitab_nominal"),
  ])

  const config = normalizeConfig(configData as RawConfig | null)
  const kitab = ((kitabData as RawKitab[] | null) ?? [])
    .map(normalizeKitab)
    .filter((item): item is Kitab => Boolean(item))

  const statMap = new Map<string, DiklatParticipantStat>()
  ;(
    (pesertaData as Array<{
      jenis_diklat: string
      tahun_diklat: number
      biaya_pendaftaran: number | string | null
      belanja_kitab_nominal: number | string | null
    }> | null) ?? []
  ).forEach((row) => {
    if (!isJenisDiklat(row.jenis_diklat)) return

    const key = `${row.jenis_diklat}:${row.tahun_diklat}`
    const current = statMap.get(key) ?? {
      jenis_diklat: row.jenis_diklat,
      tahun_diklat: row.tahun_diklat,
      jumlah_peserta: 0,
      total_pendaftaran: 0,
      total_kitab: 0,
    }

    current.jumlah_peserta += 1
    current.total_pendaftaran += toNumber(row.biaya_pendaftaran)
    current.total_kitab += toNumber(row.belanja_kitab_nominal)
    statMap.set(key, current)
  })

  const stats = Array.from(statMap.values()).map(normalizeStat).filter((item): item is DiklatParticipantStat => Boolean(item))

  const activeYear = config?.tahun_hijriah
  const statsByJenis = new Map(
    stats
      .filter((stat) => !activeYear || stat.tahun_diklat === activeYear)
      .map((stat) => [stat.jenis_diklat, stat])
  )

  const programs = DIKLAT_ORDER.map((jenis) => {
    const programKitab = kitab.filter((item) => item.jenis_diklat === jenis)
    const stat = statsByJenis.get(jenis)

    return {
      jenis_diklat: jenis,
      label: DIKLAT_LABELS[jenis],
      slug: slugFromJenis(jenis),
      kitab: programKitab,
      jumlah_peserta: stat?.jumlah_peserta ?? 0,
      totalKitab: programKitab.reduce((total, item) => total + item.harga, 0),
    }
  }).filter((program) => program.kitab.length > 0)

  return { config, programs }
}
