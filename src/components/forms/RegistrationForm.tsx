"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FieldPath, useForm, useWatch } from "react-hook-form"
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
import { cn } from "@/lib/utils"
import { DIKLAT_LABELS } from "@/lib/diklat-shared"
import { CONTACT_TEXT } from "@/lib/site"

interface Kitab {
  id: number;
  nama_kitab: string;
  harga: number;
  jenis_diklat: string;
  jenis_kelamin: "L" | "P" | "ALL";
  kategori: "KITAB" | "PERLENGKAPAN" | "BUKU";
  is_wajib: boolean;
  ruang: number | null;
}

interface DiklatConfig {
  tahun_hijriah: number;
  periode: number | null;
  uang_miftah: number | string;
  biaya_listrik: number | string;
  kos_makan: number | string;
  tafaruqon: number | string;
  uang_miftah_putri: number | string | null;
  biaya_listrik_putri: number | string | null;
  kos_makan_putri: number | string | null;
  tafaruqon_putri: number | string | null;
}

type RegistrationFormProps = {
  initialJenisDiklat?: RegistrationValues["jenis_diklat"]
}

const steps = [
  { id: 1, title: "Identitas", icon: User },
  { id: 2, title: "Program", icon: BookOpen },
  { id: 3, title: "Kitab", icon: ShoppingBag },
]

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
const months = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
]
const currentYearValue = new Date().getFullYear()
const years = Array.from({ length: 80 }, (_, i) => (currentYearValue - i).toString())
const fieldLabelClass = "text-[10px] font-black uppercase tracking-widest text-muted-foreground"
const fieldInputClass = "rounded-2xl border-border h-14 bg-muted/50 focus-visible:bg-background transition-all font-bold"
const sectionTitleClass = "text-2xl font-black text-foreground tracking-tight"
const sectionSubtitleClass = "text-muted-foreground text-sm font-medium italic"

const jenisDiklatOptions: RegistrationValues["jenis_diklat"][] = ["MAULID", "SYABAN", "RAMADHAN", "DZULHIJJAH"]
const programsWithRuang: RegistrationValues["jenis_diklat"][] = ["MAULID", "RAMADHAN"]
const ruangOptions = [
  { value: 1, label: "Ruang 1" },
  { value: 2, label: "Ruang 2" },
  { value: 3, label: "Ruang 3" },
]
const defaultDzulhijjahKitabNames = [
  "Maqulat Mama Syuja'i",
  "Maqulat Mama Syatibi",
  "Tuhfatul Mustaq",
  "Wad'ul Kalimah",
]
const jenisKelaminOptions: Array<{ value: RegistrationValues["jenis_kelamin"]; label: string }> = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
]

const toNumber = (value: number | string | null | undefined) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const normalizeKitabName = (name: string) => name.trim().toLowerCase()

const isKitabVisibleForGender = (kitab: Kitab, jenisKelamin: RegistrationValues["jenis_kelamin"]) => {
  return kitab.jenis_kelamin === "ALL" || kitab.jenis_kelamin === jenisKelamin
}

const getRequiredKitabIds = (
  kitabList: Kitab[],
  jenisDiklat: RegistrationValues["jenis_diklat"],
  jenisKelamin: RegistrationValues["jenis_kelamin"]
) => {
  return kitabList
    .filter((kitab) => kitab.jenis_diklat === jenisDiklat && kitab.is_wajib && isKitabVisibleForGender(kitab, jenisKelamin))
    .map((kitab) => kitab.id)
}

const getDefaultKitabIds = (
  kitabList: Kitab[],
  jenisDiklat: RegistrationValues["jenis_diklat"],
  jenisKelamin: RegistrationValues["jenis_kelamin"]
) => {
  const requiredIds = getRequiredKitabIds(kitabList, jenisDiklat, jenisKelamin)
  if (jenisDiklat !== "DZULHIJJAH") return requiredIds

  const defaultNames = new Set(defaultDzulhijjahKitabNames.map(normalizeKitabName))

  const defaultIds = kitabList
    .filter((kitab) => kitab.jenis_diklat === "DZULHIJJAH" && isKitabVisibleForGender(kitab, jenisKelamin) && defaultNames.has(normalizeKitabName(kitab.nama_kitab)))
    .map((kitab) => kitab.id)

  return Array.from(new Set([...defaultIds, ...requiredIds]))
}

const getFeesForGender = (config: DiklatConfig, jenisKelamin: RegistrationValues["jenis_kelamin"]) => {
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

export default function RegistrationForm({ initialJenisDiklat = "DZULHIJJAH" }: RegistrationFormProps) {
  const formTopRef = useRef<HTMLDivElement>(null)
  const hasMountedStepRef = useRef(false)
  const defaultDzulhijjahKitabAppliedRef = useRef(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<RegistrationValues | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // State Master Data
  const [masterKitab, setMasterKitab] = useState<Kitab[]>([])
  const [selectedKitabIds, setSelectedKitabIds] = useState<number[]>([])
  const [config, setConfig] = useState<DiklatConfig | null>(null)
  const [selectedRuang, setSelectedRuang] = useState<number | null>(null)

  // Custom Date Picker State
  const [dobDay, setDobDay] = useState("")
  const [dobMonth, setDobMonth] = useState("")
  const [dobYear, setDobYear] = useState("")

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
      jenis_kelamin: "L",
      jenis_diklat: initialJenisDiklat,
      tahun_diklat: 1448,
      ruang: null,
      periode: 1,
      biaya_pendaftaran: 0,
      uang_miftah: 0,
      biaya_listrik: 0,
      kos_makan: 0,
      tafaruqon: 0,
      belanja_kitab_nominal: 0,
      rincian_belanja: "",
    },
  })

  const { getValues, setValue, trigger } = form
  const currentJenisDiklat = useWatch({ control: form.control, name: "jenis_diklat" })
  const currentJenisKelamin = useWatch({ control: form.control, name: "jenis_kelamin" })
  const currentRuang = useWatch({ control: form.control, name: "ruang" })
  const tahunDiklat = useWatch({ control: form.control, name: "tahun_diklat" })
  const uangMiftah = useWatch({ control: form.control, name: "uang_miftah" })
  const biayaListrik = useWatch({ control: form.control, name: "biaya_listrik" })
  const kosMakan = useWatch({ control: form.control, name: "kos_makan" })
  const tafaruqon = useWatch({ control: form.control, name: "tafaruqon" })
  const biayaPendaftaran = useWatch({ control: form.control, name: "biaya_pendaftaran" })
  const belanjaKitabNominal = useWatch({ control: form.control, name: "belanja_kitab_nominal" })

  useEffect(() => {
    if (!hasMountedStepRef.current) {
      hasMountedStepRef.current = true
      return
    }

    const formTop = formTopRef.current
    if (!formTop) return

    const y = formTop.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" })
  }, [step])

  const applyConfigFees = useCallback((activeConfig: DiklatConfig, jenisKelamin: RegistrationValues["jenis_kelamin"]) => {
    const fees = getFeesForGender(activeConfig, jenisKelamin)
    setValue("uang_miftah", fees.uang_miftah)
    setValue("biaya_listrik", fees.biaya_listrik)
    setValue("kos_makan", fees.kos_makan)
    setValue("tafaruqon", fees.tafaruqon)
    setValue("biaya_pendaftaran", fees.uang_miftah + fees.biaya_listrik + fees.kos_makan + fees.tafaruqon)
  }, [setValue])

  useEffect(() => {
    async function loadInitialData() {
      const supabase = createClient()
      const { data: configData } = await supabase.from('config_diklat').select('*').eq('is_active', true).single()
      
      if (configData) {
        const activeConfig = configData as DiklatConfig

        setConfig(activeConfig)
        setValue("tahun_diklat", activeConfig.tahun_hijriah)
        setValue("periode", toNumber(activeConfig.periode) || 1)
        applyConfigFees(activeConfig, getValues("jenis_kelamin"))
      }

      const { data: kitabData } = await supabase.from('master_kitab').select('*').eq('is_active', true)
      if (kitabData) {
        const normalizedKitab = kitabData.map((kitab) => ({
          ...kitab,
          harga: toNumber(kitab.harga),
          jenis_kelamin: kitab.jenis_kelamin ?? "ALL",
          kategori: kitab.kategori ?? "KITAB",
          is_wajib: Boolean(kitab.is_wajib),
          ruang: kitab.ruang ?? null,
        }))
        setMasterKitab(normalizedKitab)

        if (initialJenisDiklat === "DZULHIJJAH") {
          const defaultIds = getDefaultKitabIds(normalizedKitab, "DZULHIJJAH", "L")
          if (defaultIds.length > 0) {
            setSelectedKitabIds(defaultIds)
            defaultDzulhijjahKitabAppliedRef.current = true
          }
        }
      }
      setIsLoading(false)
    }
    loadInitialData()
  }, [applyConfigFees, getValues, initialJenisDiklat, setValue])

  useEffect(() => {
    if (!config) return
    applyConfigFees(config, currentJenisKelamin)
  }, [applyConfigFees, config, currentJenisKelamin])

  useEffect(() => {
    if (dobDay && dobMonth && dobYear) {
      form.setValue("tanggal_lahir", `${dobYear}-${dobMonth}-${dobDay}`, { shouldValidate: true })
    }
  }, [dobDay, dobMonth, dobYear, form])

  const filteredKitab = masterKitab.filter(k => {
    const matchJenis = k.jenis_diklat === currentJenisDiklat
    const matchGender = isKitabVisibleForGender(k, currentJenisKelamin)
    
    // Jika program memiliki pembagian ruang
    if (programsWithRuang.includes(currentJenisDiklat)) {
      // Jika ruang dipilih, filter berdasarkan ruang
      if (currentRuang !== null) {
        return matchJenis && matchGender && k.ruang === currentRuang
      }
      // Jika ruang belum dipilih, tampilkan semua kitab untuk program ini
      return matchJenis && matchGender
    }
    
    // Jika tidak ada pembagian ruang (SYABAN, DZULHIJJAH)
    return matchJenis && matchGender && (k.ruang === null || k.ruang === undefined)
  })

  const selectedKitabs = masterKitab.filter(k => selectedKitabIds.includes(k.id))

  useEffect(() => {
    const totalHarga = selectedKitabs.reduce((acc, curr) => acc + Number(curr.harga), 0)
    const rincianString = selectedKitabs.map(k => k.nama_kitab).join(", ")
    setValue("belanja_kitab_nominal", totalHarga)
    setValue("rincian_belanja", rincianString)
  }, [selectedKitabs, setValue])

  const toggleKitab = (id: number) => {
    const kitab = masterKitab.find((item) => item.id === id)
    if (kitab?.is_wajib) return

    setSelectedKitabIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const handleJenisKelaminChange = (value: RegistrationValues["jenis_kelamin"] | null) => {
    if (!value) return

    setValue("jenis_kelamin", value, { shouldDirty: true, shouldValidate: true })
    if (config) applyConfigFees(config, value)
    setSelectedKitabIds(getDefaultKitabIds(masterKitab, currentJenisDiklat, value))
    defaultDzulhijjahKitabAppliedRef.current = currentJenisDiklat === "DZULHIJJAH"
  }

  const handleJenisDiklatChange = (value: RegistrationValues["jenis_diklat"] | null) => {
    if (!value) return

    setValue("jenis_diklat", value, { shouldDirty: true, shouldValidate: true })
    
    // Reset ruang when changing diklat type
    if (programsWithRuang.includes(value)) {
      // Keep current ruang or set to null for user to select
      setSelectedRuang(null)
      setValue("ruang", null)
    } else {
      setSelectedRuang(null)
      setValue("ruang", null)
    }
    
    if (value === "DZULHIJJAH") {
      setSelectedKitabIds(getDefaultKitabIds(masterKitab, value, currentJenisKelamin))
      defaultDzulhijjahKitabAppliedRef.current = true
    } else {
      setSelectedKitabIds(getDefaultKitabIds(masterKitab, value, currentJenisKelamin))
      defaultDzulhijjahKitabAppliedRef.current = false
    }
  }

  const handleRuangChange = (value: number | null) => {
    setSelectedRuang(value)
    setValue("ruang", value, { shouldDirty: true, shouldValidate: true })
    // Reset selected kitab when room changes
    setSelectedKitabIds([])
  }

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault() // Explicitly prevent form submission
    let fieldsToValidate: FieldPath<RegistrationValues>[] = []
    if (step === 1) {
      fieldsToValidate = ["nama_lengkap", "no_telepon", "pesantren_asal", "nama_wali", "pekerjaan_wali", "alamat_lengkap", "tempat_lahir", "tanggal_lahir", "jenis_kelamin"]
    } else if (step === 2) {
      fieldsToValidate = ["jenis_diklat"]
      if (programsWithRuang.includes(currentJenisDiklat)) {
        if (currentRuang === null || currentRuang === undefined) {
          form.setError("ruang", { message: "Wajib memilih ruang kajian" })
          return
        }
      }
    }

    const isValid = await trigger(fieldsToValidate)
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
          <div className="bg-primary p-12 text-center text-primary-foreground relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-primary-foreground/20">
               <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
             </div>
             <h2 className="text-3xl font-black mb-2 tracking-tight">ALHAMDULILLAH!</h2>
             <p className="text-primary-foreground/80 font-medium italic">Pendaftaran Anda Telah Berhasil</p>
          </div>
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed max-w-sm mx-auto">
              Data Anda telah tercatat dalam sistem kami. Silakan unduh bukti pendaftaran di bawah ini.
            </p>
            <DownloadPDFButton data={submittedData} qrCodeId={successId} />
            <div className="mt-8 pt-8 border-t border-border flex justify-center gap-6">
               <Link href="/" className="text-primary font-bold text-sm hover:underline">Kembali ke Beranda</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div ref={formTopRef} className="max-w-4xl mx-auto py-8 px-4">
      {/* Step Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative px-4 md:px-20">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
              step >= s.id ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/30" : "bg-card border-border text-muted-foreground"
            }`}>
              <s.icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= s.id ? "text-primary" : "text-muted-foreground"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <Card className="border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.14)] rounded-[3rem] overflow-hidden bg-card">
        <CardHeader className="bg-secondary text-secondary-foreground p-10 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border-none mb-4 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                {isLoading ? "LOADING..." : `TAHUN ${tahunDiklat} HIJRIAH`}
              </Badge>
              <CardTitle className="text-4xl font-black tracking-tighter leading-none mb-2">AL-HASANAH</CardTitle>
              <CardDescription className="text-secondary-foreground/70 font-medium italic text-lg">Pendaftaran Diklat Pasaran</CardDescription>
            </div>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="drop-shadow-2xl" />
          </div>
        </CardHeader>
        
        <CardContent className="p-10 -mt-10 bg-card rounded-t-[3.5rem] relative z-10">
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
                        <h3 className={sectionTitleClass}>Identitas Peserta</h3>
                        <p className={sectionSubtitleClass}>Lengkapi data diri Anda sesuai KTP/Ijazah</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="nama_lengkap" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>Nama Lengkap</FormLabel><FormControl><Input placeholder="Contoh: Ahmad Fauzi" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="no_telepon" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>No. WhatsApp</FormLabel><FormControl><Input placeholder="08xxxxxxxx" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="jenis_kelamin" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={fieldLabelClass}>Jenis Kelamin</FormLabel>
                        <Select onValueChange={handleJenisKelaminChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className={cn(fieldInputClass, "text-foreground")}>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl">
                            {jenisKelaminOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="font-bold py-3 uppercase tracking-widest">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="tempat_lahir" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>Tempat Lahir</FormLabel><FormControl><Input placeholder="Kota/Kabupaten" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="tanggal_lahir" render={() => (
                        <FormItem>
                          <FormLabel className={fieldLabelClass}>Tanggal Lahir</FormLabel>
                          <div className="grid grid-cols-3 gap-2">
                            <Select onValueChange={(val) => setDobDay(val || "")} value={dobDay}>
                              <FormControl>
                                <SelectTrigger className={fieldInputClass}>
                                  <SelectValue placeholder="Tgl" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                              </SelectContent>
                            </Select>

                            <Select onValueChange={(val) => setDobMonth(val || "")} value={dobMonth}>
                              <FormControl>
                                <SelectTrigger className={fieldInputClass}>
                                  <SelectValue placeholder="Bln" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                              </SelectContent>
                            </Select>

                            <Select onValueChange={(val) => setDobYear(val || "")} value={dobYear}>
                              <FormControl>
                                <SelectTrigger className={fieldInputClass}>
                                  <SelectValue placeholder="Thn" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="pesantren_asal" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>Asal Pesantren</FormLabel><FormControl><Input placeholder="Nama Pesantren Anda" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="nama_wali" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>Nama Wali</FormLabel><FormControl><Input placeholder="Ayah/Ibu/Saudara" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    
                    <FormField control={form.control} name="pekerjaan_wali" render={({ field }) => (
                        <FormItem><FormLabel className={fieldLabelClass}>Pekerjaan Wali</FormLabel><FormControl><Input placeholder="Pekerjaan wali Anda" {...field} className={fieldInputClass} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="alamat_lengkap" render={({ field }) => (
                      <FormItem><FormLabel className={fieldLabelClass}>Alamat Lengkap Rumah</FormLabel><FormControl><Textarea placeholder="Kp, RT/RW, Desa, Kec, Kota..." {...field} className="rounded-2xl border-border min-h-[120px] bg-muted/50 focus-visible:bg-background transition-all font-bold" /></FormControl><FormMessage /></FormItem>
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
                        <h3 className={sectionTitleClass}>Program Diklat</h3>
                        <p className={sectionSubtitleClass}>INFORMASI ADMINISTRASI PROGRAM DIKLAT PASARAN</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField control={form.control} name="jenis_diklat" render={({ field }) => (
                        <FormItem>
                          <FormLabel className={fieldLabelClass}>PROGRAM DIKLAT YANG AKAN DILAKSANAKAN</FormLabel>
                          <Select onValueChange={handleJenisDiklatChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={cn(fieldInputClass, "text-foreground")}>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl">
                              {jenisDiklatOptions.map((jenis) => (
                                <SelectItem key={jenis} value={jenis} className="font-bold py-3 uppercase tracking-widest">
                                  PASARAN {DIKLAT_LABELS[jenis].toUpperCase()}
                                </SelectItem>
                              ))}
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
                            { label: currentJenisKelamin === "P" ? "Uang Miftah Putri" : "Uang Miftah Putra", val: uangMiftah },
                            { label: "Listrik", val: biayaListrik },
                            { label: "Kos Makan", val: kosMakan },
                            { label: "Tafaruqon", val: tafaruqon },
                          ].map((item) => (
                            <li key={item.label} className="flex justify-between items-center text-muted-foreground text-sm">
                              <span className="font-bold">{item.label}</span>
                              <span className="font-mono font-black text-foreground">Rp {toNumber(item.val).toLocaleString("id-ID")}</span>
                            </li>
                          ))}
                          <li className="pt-3 border-t-2 border-primary/10 flex justify-between items-center">
                            <span className="font-black text-foreground uppercase tracking-widest text-[10px]">Total Wajib</span>
                            <span className="font-mono font-black text-primary text-lg">Rp {biayaPendaftaran.toLocaleString("id-ID")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Room Selection - Only for MAULID & RAMADHAN */}
                    {programsWithRuang.includes(currentJenisDiklat) && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-secondary/5 rounded-[2rem] p-6 border-2 border-secondary/10">
                          <div className="flex items-center gap-2 mb-4 text-secondary font-black uppercase tracking-widest text-[10px]">
                            <BookOpen className="w-4 h-4" /> PILIHAN RUANG
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            Program {DIKLAT_LABELS[currentJenisDiklat]} memiliki beberapa ruang kajian. Pilih ruang yang ingin Anda ikuti.
                          </p>
                          <Select 
                            onValueChange={(val) => handleRuangChange(val ? Number(val) : null)} 
                            value={currentRuang?.toString() ?? ""}
                          >
                            <FormControl>
                              <SelectTrigger className={cn(fieldInputClass, "text-foreground")}>
                                <SelectValue placeholder="Pilih Ruang" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl">
                              {ruangOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()} className="font-bold py-3">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {currentRuang && (
                            <p className="text-primary text-xs font-bold mt-2">
                              Kitab yang ditampilkan adalah kitab untuk {ruangOptions.find(r => r.value === currentRuang)?.label}
                            </p>
                          )}
                          {!currentRuang && (
                            <p className="text-muted-foreground text-xs font-bold mt-2 italic">
                              *Wajib memilih ruang kajian
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {[
                         { icon: MapPin, text: "Lokasi: Pesantren Al-Hasanah" },
                         { icon: Phone, text: `WA: ${CONTACT_TEXT}` },
                         { icon: GraduationCap, text: "Metode: Lugot & Surah" }
                       ].map((feat, i) => (
                         <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl border border-border">
                            <feat.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{feat.text}</span>
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
                        <h3 className={sectionTitleClass}>Koperasi Kitab & Perlengkapan</h3>
                        <p className={sectionSubtitleClass}>
                          {currentJenisKelamin === "P" ? "Pago dan Ratib wajib untuk peserta perempuan" : "Pilih kitab yang belum Anda miliki"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredKitab.map((kitab) => (
                        <div 
                          key={kitab.id}
                          onClick={() => toggleKitab(kitab.id)}
                          className={`group p-5 rounded-[2rem] border-2 transition-all cursor-pointer select-none ${
                            kitab.is_wajib
                              ? selectedKitabIds.includes(kitab.id)
                                ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] -translate-y-1'
                                : 'bg-amber-500/5 border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                              : selectedKitabIds.includes(kitab.id) 
                                ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10 -translate-y-1' 
                                : 'bg-card border-border hover:border-primary/20 hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex flex-col gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              kitab.is_wajib
                                ? selectedKitabIds.includes(kitab.id)
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-amber-500/20 text-amber-600 group-hover:bg-amber-500/30'
                                : selectedKitabIds.includes(kitab.id) 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                            }`}>
                               <Checkbox checked={selectedKitabIds.includes(kitab.id)} className="sr-only" />
                               <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className={`text-sm font-black tracking-tight ${selectedKitabIds.includes(kitab.id) ? 'text-foreground' : 'text-muted-foreground'}`}>{kitab.nama_kitab}</p>
                                {kitab.is_wajib && (
                                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                                    Wajib
                                  </span>
                                )}
                              </div>
                              {kitab.kategori !== "KITAB" && (
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{kitab.kategori}</p>
                              )}
                              <p className={`text-xs font-mono font-black mt-1 ${kitab.is_wajib ? 'text-amber-600' : 'text-primary'}`}>Rp {kitab.harga.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-10 bg-secondary text-secondary-foreground rounded-[3rem] shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                       <div className="relative z-10 space-y-6">
                          <div className="flex justify-between items-center">
                             <div className="space-y-1">
                                <p className="text-primary font-black uppercase tracking-widest text-[10px]">Ringkasan Pembayaran</p>
                                <h4 className="text-2xl font-black tracking-tighter">Total Infaq & Kitab</h4>
                             </div>
                             <div className="text-right">
                                <p className="text-secondary-foreground/50 font-mono text-sm line-through decoration-primary decoration-2">Rp {biayaPendaftaran.toLocaleString("id-ID")}</p>
                                <p className="text-4xl font-black text-secondary-foreground tracking-tighter">Rp {(biayaPendaftaran + belanjaKitabNominal).toLocaleString("id-ID")}</p>
                             </div>
                          </div>

                          {/* Rincian Biaya Wajib Diklat */}
                          <div className="space-y-3">
                            <p className="text-primary font-black uppercase tracking-widest text-[10px]">Biaya Wajib Diklat</p>
                            <div className="bg-secondary-foreground/5 rounded-2xl border border-secondary-foreground/10 divide-y divide-secondary-foreground/10">
                              {[
                                { label: currentJenisKelamin === "P" ? "Uang Miftah Putri" : "Uang Miftah Putra", val: uangMiftah },
                                { label: "Listrik", val: biayaListrik },
                                { label: "Kos & Makan", val: kosMakan },
                                { label: "Tafaruqon", val: tafaruqon },
                              ].filter(item => toNumber(item.val) > 0).map((item) => (
                                <div key={item.label} className="flex justify-between items-center px-4 py-3">
                                  <span className="text-xs font-bold text-secondary-foreground/70">{item.label}</span>
                                  <span className="font-mono font-black text-sm text-secondary-foreground">Rp {toNumber(item.val).toLocaleString("id-ID")}</span>
                                </div>
                              ))}
                              <div className="flex justify-between items-center px-4 py-3 bg-primary/10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Subtotal Biaya Wajib</span>
                                <span className="font-mono font-black text-primary">Rp {biayaPendaftaran.toLocaleString("id-ID")}</span>
                              </div>
                            </div>
                          </div>

                          {/* Rincian Kitab & Perlengkapan */}
                          {selectedKitabs.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-primary font-black uppercase tracking-widest text-[10px]">Kitab & Perlengkapan</p>
                              <div className="bg-secondary-foreground/5 rounded-2xl border border-secondary-foreground/10 divide-y divide-secondary-foreground/10">
                                {selectedKitabs.map((kitab) => (
                                  <div key={kitab.id} className="flex justify-between items-center px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-secondary-foreground/70">{kitab.nama_kitab}</span>
                                      {kitab.is_wajib && (
                                        <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-amber-500">Wajib</span>
                                      )}
                                    </div>
                                    <span className="font-mono font-black text-sm text-secondary-foreground">Rp {kitab.harga.toLocaleString("id-ID")}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between items-center px-4 py-3 bg-primary/10">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Subtotal Kitab</span>
                                  <span className="font-mono font-black text-primary">Rp {belanjaKitabNominal.toLocaleString("id-ID")}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3 p-4 bg-secondary-foreground/5 rounded-2xl border border-secondary-foreground/10">
                             <Heart className="w-5 h-5 text-primary shrink-0" />
                             <p className="text-xs text-secondary-foreground/70 leading-relaxed italic">
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
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-2xl py-8 h-auto flex-1 text-lg font-bold border-2 transition-all">
                    <ArrowLeft className="mr-3 w-5 h-5" /> Kembali
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="rounded-2xl py-8 h-auto flex-[2] text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-xl shadow-secondary/20 transition-all group">
                    Lanjut ke {steps[step].title} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="rounded-2xl py-8 h-auto flex-[2] text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/40 transition-all group">
                    {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <>Konfirmasi & Daftar <CheckCircle2 className="ml-3 w-5 h-5" /></>}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <p className="text-center mt-12 text-muted-foreground text-xs font-black uppercase tracking-[0.4em]">Pasaran Al-Hasanah Cibeuti</p>
    </div>
  )
}
