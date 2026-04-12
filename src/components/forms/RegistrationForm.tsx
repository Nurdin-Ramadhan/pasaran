"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, RegistrationValues } from "@/lib/validations/registration"
import { registerParticipant } from "@/actions/register"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { User, BookOpen, Loader2, CheckCircle2, ShoppingBag, Info, ArrowRight, ArrowLeft, Heart, MapPin, Phone, GraduationCap } from "lucide-react"
import DownloadPDFButton from "@/components/pdf/DownloadPDFButton"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import Link from "next/link"

interface Kitab {
  id: number;
  nama_kitab: string;
  harga: number;
  jenis_diklat: string;
}

const steps = [
  { id: 1, title: "Identitas", icon: User },
  { id: 2, title: "Program", icon: BookOpen },
  { id: 3, title: "Kitab", icon: ShoppingBag },
]

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
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
      alamat_pesantren: "Cibeuti, Kawalu, Tasikmalaya",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat_lengkap: "",
      no_telepon: "",
      pesantren_asal: "",
      jenis_diklat: "RAMADHAN",
      tahun_diklat: 1447,
      periode: 1, // Add default value for periode
      biaya_pendaftaran: 0,
      uang_miftah: 0,
      biaya_listrik: 0,
      kos_makan: 0,
      tafaruqon: 0,
      belanja_kitab_nominal: 0,
      rincian_belanja: "",
    },
  })

  const { watch, setValue, trigger } = form
  const currentJenisDiklat = watch("jenis_diklat")

  useEffect(() => {
    async function loadInitialData() {
      const supabase = createClient()
      const { data: configData } = await supabase.from('config_diklat').select('*').eq('is_active', true).single()
      
      if (configData) {
        setConfig(configData)
        setValue("tahun_diklat", configData.tahun_hijriah)
        setValue("periode", configData.periode || 1) // Sync with config
        setValue("uang_miftah", Number(configData.uang_miftah))
        setValue("biaya_listrik", Number(configData.biaya_listrik))
        setValue("kos_makan", Number(configData.kos_makan))
        setValue("tafaruqon", Number(configData.tafaruqon))
        setValue("biaya_pendaftaran", Number(configData.uang_miftah) + Number(configData.biaya_listrik) + Number(configData.kos_makan) + Number(configData.tafaruqon))
      }

      const { data: kitabData } = await supabase.from('master_kitab').select('*').eq('is_active', true)
      if (kitabData) setMasterKitab(kitabData)
      setIsLoading(false)
    }
    loadInitialData()
  }, [setValue])

  const filteredKitab = masterKitab.filter(k => k.jenis_diklat === currentJenisDiklat)

  useEffect(() => {
    setSelectedKitabIds([]) 
  }, [currentJenisDiklat])

  useEffect(() => {
    const selectedKitabs = masterKitab.filter(k => selectedKitabIds.includes(k.id))
    const totalHarga = selectedKitabs.reduce((acc, curr) => acc + Number(curr.harga), 0)
    const rincianString = selectedKitabs.map(k => k.nama_kitab).join(", ")
    setValue("belanja_kitab_nominal", totalHarga)
    setValue("rincian_belanja", rincianString)
  }, [selectedKitabIds, masterKitab, setValue])

  const toggleKitab = (id: number) => {
    setSelectedKitabIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault() // Explicitly prevent form submission
    let fieldsToValidate: any[] = []
    if (step === 1) {
      fieldsToValidate = ["nama_lengkap", "no_telepon", "pesantren_asal", "nama_wali", "pekerjaan_wali", "alamat_lengkap", "tempat_lahir", "tanggal_lahir"]
    } else if (step === 2) {
      fieldsToValidate = ["jenis_diklat"]
    }

    const isValid = await trigger(fieldsToValidate as any)
    if (isValid) setStep(prev => prev + 1)
  }

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep(prev => prev - 1)
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto py-12 px-6"
      >
        <Card className="rounded-[3rem] shadow-2xl border-2 border-primary/5 overflow-hidden">
          <div className="bg-primary p-12 text-center text-white relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
               <CheckCircle2 className="w-10 h-10 text-white" />
             </div>
             <h2 className="text-3xl font-black mb-2 tracking-tight">ALHAMDULILLAH!</h2>
             <p className="text-white/80 font-medium italic">Pendaftaran Anda Telah Berhasil</p>
          </div>
          <CardContent className="p-10 text-center">
            <p className="text-secondary/60 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
              Data Anda telah tercatat dalam sistem kami. Silakan unduh bukti pendaftaran di bawah ini.
            </p>
            <DownloadPDFButton data={submittedData} qrCodeId={successId} />
            <div className="mt-8 pt-8 border-t border-secondary/5 flex justify-center gap-6">
               <Link href="/" className="text-primary font-bold text-sm hover:underline">Kembali ke Beranda</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Step Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative px-4 md:px-20">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary/5 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
              step >= s.id ? "bg-primary border-primary text-white shadow-xl shadow-primary/30" : "bg-white border-secondary/10 text-secondary/30"
            }`}>
              <s.icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= s.id ? "text-primary" : "text-secondary/30"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white">
        <CardHeader className="bg-secondary text-white p-10 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border-none mb-4 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                {isLoading ? "LOADING..." : `TAHUN ${watch("tahun_diklat")} HIJRIAH`}
              </Badge>
              <CardTitle className="text-4xl font-black tracking-tighter leading-none mb-2">AL-HASANAH</CardTitle>
              <CardDescription className="text-white/50 font-medium italic text-lg">Pendaftaran Diklat Pasaran</CardDescription>
            </div>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="drop-shadow-2xl" />
          </div>
        </CardHeader>
        
        <CardContent className="p-10 -mt-10 bg-white rounded-t-[3.5rem] relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <AnimatePresence mode="wait">
                {/* STEP 1: IDENTITAS DIRI */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><User className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-2xl font-black text-secondary tracking-tight">Identitas Peserta</h3>
                        <p className="text-secondary/40 text-sm font-medium italic">Lengkapi data diri Anda sesuai KTP/Ijazah</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="nama_lengkap" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Nama Lengkap</FormLabel><FormControl><Input placeholder="Contoh: Ahmad Fauzi" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="no_telepon" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">No. WhatsApp</FormLabel><FormControl><Input placeholder="08xxxxxxxx" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="tempat_lahir" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Tempat Lahir</FormLabel><FormControl><Input placeholder="Kota/Kabupaten" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="tanggal_lahir" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="pesantren_asal" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Asal Pesantren</FormLabel><FormControl><Input placeholder="Nama Pesantren Anda" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="nama_wali" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Nama Wali</FormLabel><FormControl><Input placeholder="Ayah/Ibu/Saudara" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    
                    <FormField control={form.control} name="pekerjaan_wali" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Pekerjaan Wali</FormLabel><FormControl><Input placeholder="Pekerjaan wali Anda" {...field} className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="alamat_lengkap" render={({ field }) => (
                      <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Alamat Lengkap Rumah</FormLabel><FormControl><Textarea placeholder="Kp, RT/RW, Desa, Kec, Kota..." {...field} className="rounded-2xl border-secondary/10 min-h-[120px] bg-secondary/5 focus:bg-white transition-all font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </motion.div>
                )}

                {/* STEP 2: PROGRAM & ADMINISTRASI */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><BookOpen className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-2xl font-black text-secondary tracking-tight">Program Diklat</h3>
                        <p className="text-secondary/40 text-sm font-medium italic">Pilih gelombang pengajian yang akan diikuti</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField control={form.control} name="jenis_diklat" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Pilih Gelombang</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-2xl border-secondary/10 h-14 bg-secondary/5 focus:bg-white transition-all font-bold text-secondary">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl">
                              <SelectItem value="MAULID" className="font-bold py-3 uppercase tracking-widest">PASARAN MAULID</SelectItem>
                              <SelectItem value="SYABAN" className="font-bold py-3 uppercase tracking-widest">PASARAN SYABAN</SelectItem>
                              <SelectItem value="RAMADHAN" className="font-bold py-3 uppercase tracking-widest">PASARAN RAMADHAN</SelectItem>
                              <SelectItem value="DZULHIJJAH" className="font-bold py-3 uppercase tracking-widest">PASARAN DZULHIJJAH</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="bg-primary/5 rounded-[2rem] p-6 border-2 border-primary/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <div className="flex items-center gap-2 mb-4 text-primary font-black uppercase tracking-widest text-[10px]">
                           <Info className="w-4 h-4" /> Informasi Administrasi
                        </div>
                        <ul className="space-y-3">
                          {[
                            { label: "Uang Miftah", val: config?.uang_miftah },
                            { label: "Listrik", val: config?.biaya_listrik },
                            { label: "Kos Makan", val: config?.kos_makan },
                            { label: "Tafaruqon", val: config?.tafaruqon },
                          ].map((item) => (
                            <li key={item.label} className="flex justify-between items-center text-secondary/60 text-sm">
                              <span className="font-bold">{item.label}</span>
                              <span className="font-mono font-black text-secondary">Rp {item.val?.toLocaleString()}</span>
                            </li>
                          ))}
                          <li className="pt-3 border-t-2 border-primary/10 flex justify-between items-center">
                            <span className="font-black text-secondary uppercase tracking-widest text-[10px]">Total Wajib</span>
                            <span className="font-mono font-black text-primary text-lg">Rp {watch("biaya_pendaftaran").toLocaleString()}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {[
                         { icon: MapPin, text: "Lokasi: Pesantren Al-Hasanah" },
                         { icon: Phone, text: "WA: +62 8xx-xxxx-xxxx" },
                         { icon: GraduationCap, text: "Metode: Kitab Kuning" }
                       ].map((feat, i) => (
                         <div key={i} className="flex items-center gap-3 p-4 bg-secondary/5 rounded-2xl border border-secondary/5">
                            <feat.icon className="w-4 h-4 text-secondary/30" />
                            <span className="text-[10px] font-black uppercase text-secondary/60 tracking-tighter">{feat.text}</span>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: KOPERASI KITAB */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><ShoppingBag className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-2xl font-black text-secondary tracking-tight">Koperasi Kitab</h3>
                        <p className="text-secondary/40 text-sm font-medium italic">Pilih kitab yang belum Anda miliki</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredKitab.map((kitab) => (
                        <div 
                          key={kitab.id}
                          onClick={() => toggleKitab(kitab.id)}
                          className={`group p-5 rounded-[2rem] border-2 transition-all cursor-pointer select-none ${
                            selectedKitabIds.includes(kitab.id) 
                            ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10 -translate-y-1' 
                            : 'bg-white border-secondary/5 hover:border-primary/20 hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex flex-col gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedKitabIds.includes(kitab.id) ? 'bg-primary text-white' : 'bg-secondary/5 text-secondary/20 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                               <Checkbox checked={selectedKitabIds.includes(kitab.id)} className="sr-only" />
                               <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`text-sm font-black tracking-tight ${selectedKitabIds.includes(kitab.id) ? 'text-secondary' : 'text-secondary/60'}`}>{kitab.nama_kitab}</p>
                              <p className="text-xs font-mono font-black text-primary mt-1">Rp {kitab.harga.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-10 bg-secondary text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                       <div className="relative z-10 space-y-6">
                          <div className="flex justify-between items-center">
                             <div className="space-y-1">
                                <p className="text-primary font-black uppercase tracking-widest text-[10px]">Ringkasan Pembayaran</p>
                                <h4 className="text-2xl font-black tracking-tighter">Total Infaq & Kitab</h4>
                             </div>
                             <div className="text-right">
                                <p className="text-white/40 font-mono text-sm line-through decoration-primary decoration-2">Rp {watch("biaya_pendaftaran").toLocaleString()}</p>
                                <p className="text-4xl font-black text-white tracking-tighter">Rp {(watch("biaya_pendaftaran") + watch("belanja_kitab_nominal")).toLocaleString()}</p>
                             </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                             <Heart className="w-5 h-5 text-primary shrink-0" />
                             <p className="text-xs text-white/60 leading-relaxed italic">
                               Seluruh biaya sudah termasuk fasilitas dan operasional selama kegiatan berlangsung di Al-Hasanah.
                             </p>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-2xl py-8 h-auto flex-1 text-lg font-bold border-2 border-secondary/10 hover:bg-secondary/5 text-secondary transition-all">
                    <ArrowLeft className="mr-3 w-5 h-5" /> Kembali
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="rounded-2xl py-8 h-auto flex-[2] text-lg font-bold bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/20 transition-all group">
                    Lanjut ke {steps[step].title} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="rounded-2xl py-8 h-auto flex-[2] text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/40 transition-all group">
                    {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <>Konfirmasi & Daftar <CheckCircle2 className="ml-3 w-5 h-5" /></>}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <p className="text-center mt-12 text-secondary/30 text-xs font-black uppercase tracking-[0.4em]">Pasaran Al-Hasanah Cibeuti</p>
    </div>
  )
}
