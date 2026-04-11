import * as z from "zod"

export const registrationSchema = z.object({
  nama_lengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nama_wali: z.string().min(3, "Nama wali minimal 3 karakter"),
  pekerjaan_wali: z.string().min(2, "Pekerjaan wali harus diisi"),
  alamat_pesantren: z.string().min(5, "Alamat pesantren minimal 5 karakter"),
  tempat_lahir: z.string().min(2, "Tempat lahir harus diisi"),
  tanggal_lahir: z.string().min(1, "Tanggal lahir harus diisi"),
  alamat_lengkap: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  no_telepon: z.string().min(10, "No telepon minimal 10 digit"),
  pesantren_asal: z.string().min(3, "Pesantren asal minimal 3 karakter"),
  jenis_diklat: z.enum(['MULUD', 'SYABAN', 'RAMADHAN', 'DZULHIJJAH']),
  tahun_diklat: z.number().default(new Date().getFullYear()),
  biaya_pendaftaran: z.number().min(0, "Biaya pendaftaran tidak boleh negatif"),
  belanja_kitab_nominal: z.number().min(0, "Nominal belanja tidak boleh negatif"),
  rincian_belanja: z.string().optional().default(""),
})

export type RegistrationValues = z.infer<typeof registrationSchema>
