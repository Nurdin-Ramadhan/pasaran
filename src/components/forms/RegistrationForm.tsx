"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, RegistrationValues } from "@/lib/validations/registration"
import { registerParticipant } from "@/actions/register"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, ShieldCheck, BookOpen, Loader2, CheckCircle2, FileDown } from "lucide-react"
import DownloadPDFButton from "@/components/pdf/DownloadPDFButton"

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<RegistrationValues | null>(null)

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nama_lengkap: "",
      nama_wali: "",
      pekerjaan_wali: "",
      alamat_pesantren: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat_lengkap: "",
      no_telepon: "",
      pesantren_asal: "",
      jenis_diklat: "DZULHIJJAH",
      tahun_diklat: new Date().getFullYear(),
      biaya_pendaftaran: 100000, // Contoh biaya default
      belanja_kitab_nominal: 0,
      rincian_belanja: "Tauhid, Tijan, Maqulat, Maqodir",
    },
  })

  async function onSubmit(values: RegistrationValues) {
    setIsSubmitting(true)
    const result = await registerParticipant(values)
    setIsSubmitting(false)

    if (result.success && result.qr_code_id) {
      setSubmittedData(values)
      setSuccessId(result.qr_code_id)
    } else {
      alert(result.error || "Terjadi kesalahan")
    }
  }

  if (successId && submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12 px-6 text-center bg-white rounded-[3rem] shadow-2xl border-2 border-primary/5"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-inner">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-4xl font-extrabold text-secondary mb-4">Pendaftaran Berhasil!</h2>
        <p className="text-secondary/60 mb-10 text-lg leading-relaxed max-w-md mx-auto">
          Alhamdulillah, data Anda telah kami simpan. <br /> 
          Silakan unduh bukti pendaftaran di bawah ini untuk ditunjukkan kepada pengurus.
        </p>
        
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="bg-accent/10 p-8 rounded-3xl border border-primary/10 w-full max-w-sm">
            <p className="text-xs text-secondary/40 uppercase tracking-widest font-extrabold mb-3">ID PENDAFTARAN UNIK</p>
            <p className="text-3xl font-mono font-bold text-secondary tracking-tighter">{successId}</p>
          </div>
          
          <DownloadPDFButton data={submittedData} qrCodeId={successId} />
        </div>

        <div className="pt-8 border-t border-secondary/5 flex justify-center gap-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = "/"}
            className="rounded-2xl font-bold text-secondary/60 hover:text-primary transition-colors"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-0">
      <Card className="border-2 border-primary/10 shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-secondary text-white p-10 pb-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
          <Badge className="bg-primary hover:bg-primary text-white mb-4 px-4 py-1 border-none font-bold uppercase tracking-widest text-xs">Pendaftaran Diklat</Badge>
          <CardTitle className="text-4xl font-extrabold mb-3 leading-tight">Formulir Peserta <br /> <span className="text-primary italic font-serif">Diklat Pasaran</span></CardTitle>
          <CardDescription className="text-white/60 text-lg leading-relaxed max-w-xl">
            Lengkapi data diri Anda dengan teliti untuk proses administrasi yang lancar. Semua data akan divalidasi manual oleh pengurus.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 -mt-10 bg-white rounded-t-[3rem] relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Seksi 1: Identitas Pribadi */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Identitas Pribadi</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <FormField
                    control={form.control}
                    name="nama_lengkap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Sesuai KTP/Ijazah" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="no_telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">No. Telepon / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Tempat Lahir</FormLabel>
                        <FormControl>
                          <Input placeholder="Kota/Kabupaten" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tanggal_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Tanggal Lahir</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="alamat_lengkap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Alamat Lengkap Rumah</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Nama Jalan, Desa, RT/RW, Kecamatan..." {...field} className="rounded-xl border-2 min-h-[100px] focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Seksi 2: Wali & Asal Pesantren */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Wali & Asal Pesantren</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <FormField
                    control={form.control}
                    name="nama_wali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Nama Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="Ayah / Ibu / Wali" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pekerjaan_wali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Pekerjaan Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="Pekerjaan wali" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pesantren_asal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Nama Pesantren Asal</FormLabel>
                        <FormControl>
                          <Input placeholder="Isi 'Tidak Ada' jika bukan santri" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alamat_pesantren"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Alamat Pesantren Asal</FormLabel>
                        <FormControl>
                          <Input placeholder="Kota/Kabupaten pesantren" {...field} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Seksi 3: Detail Diklat */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Program Diklat</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <FormField
                    control={form.control}
                    name="jenis_diklat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Pilih Gelombang Diklat</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-2 h-[56px] focus:border-primary transition-all">
                              <SelectValue placeholder="Pilih Diklat" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-2 shadow-xl">
                            <SelectItem value="MULUD">MULUD</SelectItem>
                            <SelectItem value="SYABAN">SYABAN</SelectItem>
                            <SelectItem value="RAMADHAN">RAMADHAN</SelectItem>
                            <SelectItem value="DZULHIJJAH">DZULHIJJAH (Aktif)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="biaya_pendaftaran"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Biaya Pendaftaran (Rp)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} className="rounded-xl border-2 py-6 focus:border-primary transition-all" />
                        </FormControl>
                        <FormDescription>Minimal Rp 100.000 untuk administrasi</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="rincian_belanja"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary/70 font-bold uppercase tracking-wider text-xs">Rincian Kitab yang Dibeli</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="rounded-xl border-2 min-h-[80px] focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] py-8 h-auto text-xl font-bold shadow-2xl shadow-primary/30 group transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Sedang Memproses...
                    </>
                  ) : (
                    <>
                      Konfirmasi & Daftar Sekarang
                      <div className="ml-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        →
                      </div>
                    </>
                  )}
                </Button>
                <p className="text-center text-secondary/40 mt-6 text-sm">
                  Dengan mendaftar, Anda menyetujui seluruh tata tertib dan peraturan Pesantren.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
