"use server"

import { createClient } from "@/utils/supabase/server"
import { registrationSchema, RegistrationValues } from "@/lib/validations/registration"
import { randomUUID } from "crypto"

export async function registerParticipant(data: RegistrationValues) {
  const supabase = await createClient()

  // Validate data server-side
  const validation = registrationSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, error: "Data tidak valid" }
  }

  // Generate unique UUID for QR Code using built-in crypto
  const qr_code_id = randomUUID()

  // Remove fields that don't exist in 'peserta_diklat' table if needed
  const { periode, ...insertData } = validation.data

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
