"use server"

import { createClient } from "@/utils/supabase/server"
import { registrationSchema, RegistrationValues } from "@/lib/validations/registration"
import { nanoid } from "nanoid"

export async function registerParticipant(data: RegistrationValues) {
  const supabase = await createClient()

  // Validate data server-side
  const validation = registrationSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, error: "Data tidak valid" }
  }

  // Generate unique QR Code ID
  const qr_code_id = `PASARAN-${nanoid(10).toUpperCase()}`

  const { error } = await supabase.from("peserta_diklat").insert({
    ...validation.data,
    qr_code_id,
    status_pembayaran: "PENDING",
    dicatat_oleh: "Self Registration",
  })

  if (error) {
    console.error("Supabase error:", error)
    return { success: false, error: "Gagal menyimpan data pendaftaran" }
  }

  return { success: true, qr_code_id }
}
