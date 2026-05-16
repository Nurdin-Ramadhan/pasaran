"use client"

import { motion } from "framer-motion"
import { BookOpen, Calendar, ShoppingBag, User, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DIKLAT_LABELS, DiklatConfig, DiklatProgram } from "@/lib/diklat-shared"

type UpcomingDiklatProps = {
  config: DiklatConfig | null
  programs: DiklatProgram[]
}

const formatCurrency = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

function getFeaturedProgram(programs: DiklatProgram[]) {
  return programs.find((program) => program.jenis_diklat === "DZULHIJJAH") ?? programs[0]
}

export default function UpcomingDiklat({ config, programs }: UpcomingDiklatProps) {
  const featuredProgram = getFeaturedProgram(programs)
  const totalWajib = config
    ? config.uang_miftah + config.biaya_listrik + config.kos_makan + config.tafaruqon
    : 0

  if (!featuredProgram) {
    return (
      <section id="diklat" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
            Data belum tersedia
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            Program Diklat
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto leading-relaxed text-lg">
            Data program aktif belum ditemukan di master kitab Supabase.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="diklat" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
            {config ? `Periode Ke-${config.periode}` : "Periode Aktif"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            MA&apos;LUMAT <span className="text-primary italic font-serif">{featuredProgram.label.toUpperCase()} {config?.tahun_hijriah ?? ""} H</span>
          </h2>
          <p className="text-secondary/70 max-w-3xl mx-auto leading-relaxed text-lg">
            In Syaa Allah di Pondok Pesantren Al-Hasanah Cibeuti akan dilaksanakan Pengajian Diklat (PASARAN/KILATAN) dengan data kitab dan administrasi sesuai Supabase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featuredProgram.kitab.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-primary/10 hover:border-primary/40 transition-all rounded-[2rem] bg-white group">
                <CardHeader className="p-6">
                  <p className="text-primary font-bold text-xs uppercase tracking-tighter mb-2">
                    {DIKLAT_LABELS[kit.jenis_diklat]}
                  </p>
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{kit.nama_kitab}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-secondary/50 text-sm leading-relaxed">Harga kitab: <span className="font-black text-secondary">{formatCurrency(kit.harga)}</span></p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 bg-secondary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Tahun & Periode</p>
                    <p className="text-xl font-bold">{config?.tahun_hijriah ?? "-"} H</p>
                    <p className="text-white/40 text-sm italic">Periode ke-{config?.periode ?? "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Peserta Terdata</p>
                    <p className="text-xl font-bold">{featuredProgram.jumlah_peserta.toLocaleString("id-ID")} Peserta</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Program</p>
                    <p className="text-xl font-bold">Pasaran {featuredProgram.label}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Administrasi</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Total wajib <span className="text-white font-bold">{formatCurrency(totalWajib)}</span>. Paket kitab tersedia mulai dari <span className="text-white font-bold">{formatCurrency(featuredProgram.totalKitab)}</span> jika semua kitab dipilih.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center text-white shadow-2xl shadow-primary/20">
            <h4 className="text-2xl font-bold mb-4">Siap Bergabung?</h4>
            <p className="text-white/80 mb-8 leading-relaxed">Segera daftarkan diri Anda untuk mengamankan kuota pengajian.</p>
            <Button
              render={<Link href={`/diklat/${featuredProgram.slug}/daftar`} />}
              className="w-full bg-secondary hover:bg-white hover:text-secondary text-white px-8 py-5 rounded-2xl font-extrabold transition-all shadow-xl h-auto"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              DAFTAR SEKARANG
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
