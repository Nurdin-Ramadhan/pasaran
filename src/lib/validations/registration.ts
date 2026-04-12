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
  jenis_diklat: z.enum(['MAULID', 'SYABAN', 'RAMADHAN', 'DZULHIJJAH']),
  tahun_diklat: z.number(),
  periode: z.number().optional(),
  biaya_pendaftaran: z.number().min(0),
  uang_miftah: z.number().min(0),
  biaya_listrik: z.number().min(0),
  kos_makan: z.number().min(0),
  tafaruqon: z.number().min(0),
  belanja_kitab_nominal: z.number().min(0),
  rincian_belanja: z.string().optional().default(""),
})

export type RegistrationValues = z.infer<typeof registrationSchema>
