"use server"

import { createClient } from "@/utils/supabase/server"
import { registrationSchema, RegistrationValues } from "@/lib/validations/registration"
import { randomUUID } from "crypto"

const participantInsertSchema = registrationSchema.omit({ periode: true })

type DiklatConfig = {
  uang_miftah: number | string | null
  biaya_listrik: number | string | null
  kos_makan: number | string | null
  tafaruqon: number | string | null
  uang_miftah_putri: number | string | null
  biaya_listrik_putri: number | string | null
  kos_makan_putri: number | string | null
  tafaruqon_putri: number | string | null
}

function toNumber(value: number | string | null | undefined) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

function getFeesForGender(config: DiklatConfig, jenisKelamin: RegistrationValues["jenis_kelamin"]) {
  if (jenisKelamin === "P") {
    return {
      uang_miftah: toNumber(config.uang_miftah_putri ?? config.uang_miftah),
      biaya_listrik: toNumber(config.biaya_listrik_putri ?? config.biaya_listrik),
      kos_makan: toNumber(config.kos_makan_putri ?? config.kos_makan),
      tafaruqon: toNumber(config.tafaruqon_putri ?? config.tafaruqon),
    }
  }

  return {
    uang_miftah: toNumber(config.uang_miftah),
    biaya_listrik: toNumber(config.biaya_listrik),
    kos_makan: toNumber(config.kos_makan),
    tafaruqon: toNumber(config.tafaruqon),
  }
}

export async function registerParticipant(data: RegistrationValues) {
  const supabase = await createClient()

  // Validate data server-side
  const validation = registrationSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, error: "Data tidak valid" }
  }

  // Generate unique UUID for QR Code using built-in crypto
  const qr_code_id = randomUUID()

  const { data: configData, error: configError } = await supabase
    .from("config_diklat")
    .select("uang_miftah,biaya_listrik,kos_makan,tafaruqon,uang_miftah_putri,biaya_listrik_putri,kos_makan_putri,tafaruqon_putri")
    .eq("is_active", true)
    .order("tahun_hijriah", { ascending: false })
    .order("periode", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (configError) {
    console.error("Supabase config error:", configError)
    return { success: false, error: `Gagal membaca konfigurasi biaya: ${configError.message}` }
  }

  const sanitizedData = { ...validation.data }

  if (configData) {
    const fees = getFeesForGender(configData as DiklatConfig, sanitizedData.jenis_kelamin)
    sanitizedData.uang_miftah = fees.uang_miftah
    sanitizedData.biaya_listrik = fees.biaya_listrik
    sanitizedData.kos_makan = fees.kos_makan
    sanitizedData.tafaruqon = fees.tafaruqon
    sanitizedData.biaya_pendaftaran = fees.uang_miftah + fees.biaya_listrik + fees.kos_makan + fees.tafaruqon
  }

  const insertData = participantInsertSchema.parse(sanitizedData)

  const { error } = await supabase.from("peserta_diklat").insert({
    ...insertData,
    qr_code_id,
    status_pembayaran: "PENDING",
    dicatat_oleh: "Self Registration",
  })

  if (error) {
    console.error("Supabase error:", error)
    return { success: false, error: `Gagal menyimpan: ${error.message}` }
  }

  return { success: true, qr_code_id }
}
