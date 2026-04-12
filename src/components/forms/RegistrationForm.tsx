"use client"

import { useState, useEffect } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { User, ShieldCheck, BookOpen, Loader2, CheckCircle2, Wallet, ShoppingBag, Info } from "lucide-react"
import DownloadPDFButton from "@/components/pdf/DownloadPDFButton"
import { createClient } from "@/utils/supabase/client"

interface Kitab {
  id: number;
  nama_kitab: string;
  harga: number;
  jenis_diklat: string;
}

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<RegistrationValues | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // State Master Data
  const [masterKitab, setMasterKitab] = useState<Kitab[]>([])
  const [selectedKitabIds, setSelectedKitabIds] = useState<number[]>([])
  const [config, setConfig] = useState<any>(null)

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
      jenis_diklat: "RAMADHAN",
      tahun_diklat: 1447,
      biaya_pendaftaran: 0,
      uang_miftah: 0,
      biaya_listrik: 0,
      kos_makan: 0,
      tafaruqon: 0,
      belanja_kitab_nominal: 0,
      rincian_belanja: "",
    },
  })

  const { watch, setValue } = form
  const currentJenisDiklat = watch("jenis_diklat")

  // 1. Fetch Master Config & Kitab
  useEffect(() => {
    async function loadInitialData() {
      const supabase = createClient()
      
      // Load Config
      const { data: configData } = await supabase
        .from('config_diklat')
        .select('*')
        .eq('is_active', true)
        .single()
      
      if (configData) {
        setConfig(configData)
        setValue("tahun_diklat", configData.tahun_hijriah)
        setValue("uang_miftah", Number(configData.uang_miftah))
        setValue("biaya_listrik", Number(configData.biaya_listrik))
        setValue("kos_makan", Number(configData.kos_makan))
        setValue("tafaruqon", Number(configData.tafaruqon))
        setValue("biaya_pendaftaran", Number(configData.uang_miftah) + Number(configData.biaya_listrik) + Number(configData.kos_makan) + Number(configData.tafaruqon))
      }

      // Load Semua Kitab
      const { data: kitabData } = await supabase.from('master_kitab').select('*').eq('is_active', true)
      if (kitabData) setMasterKitab(kitabData)
      
      setIsLoading(false)
    }
    loadInitialData()
  }, [setValue])

  // 2. Filter Kitab sesuai Jenis Diklat & Reset Pilihan jika ganti jenis
  const filteredKitab = masterKitab.filter(k => k.jenis_diklat === currentJenisDiklat)

  useEffect(() => {
    setSelectedKitabIds([]) // Reset pilihan saat jenis diklat berubah
  }, [currentJenisDiklat])

  // 3. Kalkulasi Otomatis Belanja Kitab
  useEffect(() => {
    const selectedKitabs = masterKitab.filter(k => selectedKitabIds.includes(k.id))
    const totalHarga = selectedKitabs.reduce((acc, curr) => acc + Number(curr.harga), 0)
    const rincianString = selectedKitabs.map(k => k.nama_kitab).join(", ")

    setValue("belanja_kitab_nominal", totalHarga)
    setValue("rincian_belanja", rincianString)
  }, [selectedKitabIds, masterKitab, setValue])

  const toggleKitab = (id: number) => {
    setSelectedKitabIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

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
          Silakan unduh bukti pendaftaran untuk ditunjukkan kepada pengurus.
        </p>
        <DownloadPDFButton data={submittedData} qrCodeId={successId} />
      </motion.div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-0">
      <Card className="border-2 border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-secondary text-white p-10 pb-16 relative">
          <Badge className="bg-primary hover:bg-primary text-white mb-4 px-4 py-1 border-none font-bold uppercase tracking-widest text-xs">Periode {config?.periode || '...'} | {watch("tahun_diklat")} H</Badge>
          <CardTitle className="text-4xl font-extrabold mb-3 leading-tight">Formulir Peserta <br /> <span className="text-primary italic font-serif">Diklat Pasaran Al-Hasanah</span></CardTitle>
          <CardDescription className="text-white/60 text-lg max-w-xl">
            Pendaftaran Pengajian Intensif untuk Santri Luar (Non-Mukimin). Silakan pilih program dan kitab yang dibutuhkan.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 -mt-10 bg-white rounded-t-[3rem] relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Seksi 1: Data Diri */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><User className="w-5 h-5" /></div>
                  <h3 className="text-2xl font-bold text-secondary">Identitas Peserta</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <FormField control={form.control} name="nama_lengkap" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs font-bold uppercase text-secondary/50">Nama Lengkap</FormLabel><FormControl><Input placeholder="Sesuai KTP/Ijazah" {...field} className="rounded-xl border-2 py-6" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="no_telepon" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs font-bold uppercase text-secondary/50">WhatsApp</FormLabel><FormControl><Input placeholder="08xxxxxxxx" {...field} className="rounded-xl border-2 py-6" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField control={form.control} name="pesantren_asal" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs font-bold uppercase text-secondary/50">Asal Pesantren</FormLabel><FormControl><Input {...field} className="rounded-xl border-2 py-6" /></FormControl></FormItem>
                  )} />
                   <FormField control={form.control} name="nama_wali" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs font-bold uppercase text-secondary/50">Nama Wali</FormLabel><FormControl><Input {...field} className="rounded-xl border-2 py-6" /></FormControl></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="alamat_lengkap" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase text-secondary/50">Alamat Lengkap Rumah</FormLabel><FormControl><Textarea placeholder="Kp, RT/RW, Desa, Kec, Kota..." {...field} className="rounded-xl border-2 min-h-[100px]" /></FormControl></FormItem>
                )} />
              </div>

              {/* Seksi 2: Program & Administrasi (READ ONLY) */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><BookOpen className="w-5 h-5" /></div>
                  <h3 className="text-2xl font-bold text-secondary">Program & Administrasi</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  <div className="md:col-span-1">
                    <FormField control={form.control} name="jenis_diklat" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-secondary/50">Pilih Gelombang</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="rounded-xl border-2 h-[60px] font-bold"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="MAULID">PASARAN MAULID</SelectItem>
                            <SelectItem value="SYABAN">PASARAN SYABAN</SelectItem>
                            <SelectItem value="RAMADHAN">PASARAN RAMADHAN</SelectItem>
                            <SelectItem value="DZULHIJJAH">PASARAN DZULHIJJAH</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>

                  <div className="md:col-span-2 bg-secondary/5 rounded-3xl p-6 border-2 border-secondary/5">
                    <div className="flex items-center gap-2 mb-4 text-secondary/60"><Info className="w-4 h-4"/> <span className="text-xs font-bold uppercase tracking-widest">Rincian Administrasi Wajib</span></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div><p className="text-[10px] uppercase text-secondary/40 font-bold mb-1">Miftah</p><p className="font-mono font-bold text-secondary">Rp {config?.uang_miftah?.toLocaleString()}</p></div>
                      <div><p className="text-[10px] uppercase text-secondary/40 font-bold mb-1">Listrik</p><p className="font-mono font-bold text-secondary">Rp {config?.biaya_listrik?.toLocaleString()}</p></div>
                      <div><p className="text-[10px] uppercase text-secondary/40 font-bold mb-1">Kos Makan</p><p className="font-mono font-bold text-secondary">Rp {config?.kos_makan?.toLocaleString()}</p></div>
                      <div><p className="text-[10px] uppercase text-secondary/40 font-bold mb-1">Tafaruqon</p><p className="font-mono font-bold text-secondary">Rp {config?.tafaruqon?.toLocaleString()}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seksi 3: Koperasi Kitab (DYNAMIC) */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><ShoppingBag className="w-5 h-5" /></div>
                  <h3 className="text-2xl font-bold text-secondary">Koperasi Kitab</h3>
                </div>

                <div className="bg-primary/5 rounded-[2.5rem] p-8 border-2 border-primary/10">
                  <p className="text-sm text-secondary/60 mb-6 font-medium">Pilih kitab yang ingin Anda beli. Harga akan otomatis ditambahkan ke total pembayaran.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {filteredKitab.map((kitab) => (
                      <div 
                        key={kitab.id}
                        onClick={() => toggleKitab(kitab.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                          selectedKitabIds.includes(kitab.id) 
                          ? 'bg-white border-primary shadow-lg shadow-primary/10 translate-y-[-2px]' 
                          : 'bg-white/50 border-transparent hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={selectedKitabIds.includes(kitab.id)} onCheckedChange={() => toggleKitab(kitab.id)} className="rounded-md border-2" />
                          <div>
                            <p className={`text-sm font-bold ${selectedKitabIds.includes(kitab.id) ? 'text-secondary' : 'text-secondary/60'}`}>{kitab.nama_kitab}</p>
                            <p className="text-[10px] font-bold text-primary">Rp {kitab.harga.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredKitab.length === 0 && <p className="text-secondary/40 italic text-sm py-4 col-span-full text-center">Belum ada daftar kitab untuk jenis diklat ini.</p>}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t-2 border-primary/10">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest mb-1">Total Belanja Kitab</p>
                      <p className="text-2xl font-black text-secondary">Rp {watch("belanja_kitab_nominal").toLocaleString()}</p>
                    </div>
                    <div className="bg-primary px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 text-center md:text-right min-w-[240px]">
                       <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest mb-1">Total Yang Harus Dibayar</p>
                       <p className="text-3xl font-black text-white tracking-tighter">Rp {(watch("biaya_pendaftaran") + watch("belanja_kitab_nominal")).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button type="submit" disabled={isSubmitting || isLoading} className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-2xl py-8 h-auto text-xl font-bold shadow-2xl transition-all group">
                  {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <>Konfirmasi & Daftar Sekarang <div className="ml-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">→</div></>}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
