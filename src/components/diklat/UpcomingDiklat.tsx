"use client"

import { motion } from "framer-motion"
import { BookOpen, Calendar, MapPin, User, Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const kits = [
  { fan: "Fan Arudh", kitab: "Mukhtashor Syafi", desc: "Ilmu timbangan syi'ir Arab." },
  { fan: "Fan Tauhid", kitab: "Tijan Addarori", desc: "Ilmu dasar akidah dan sifat-sifat Allah." },
  { fan: "Fan Maqulat", kitab: "Maqulat Mama Syuja'i & Mama Syatibi", desc: "Kajian logika 10 kategori (Al-Maqulat al-Asyr)." },
  { fan: "Fan Istiqoq", kitab: "Tuhfatul Mustaq", desc: "Ilmu asal-usul pembentukan kata." },
  { fan: "Fan Wadho'", kitab: "Wadh'ul Kalimah", desc: "Ilmu peletakan makna pada lafadz." },
]

export default function UpcomingDiklat() {
  return (
    <section id="diklat" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Periode Ke-148</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            MA'LUMAT <span className="text-primary italic font-serif">DZULHIJJAH 1447 H</span>
          </h2>
          <p className="text-secondary/70 max-w-3xl mx-auto leading-relaxed text-lg">
            In Syaa Allah di Pondok Pesantren Al-Hasanah Cibeuti akan dilaksanakan Pengajian Diklat (PASARAN/KILATAN) dengan kajian kitab-kitab sebagai berikut:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {kits.map((kit, index) => (
            <motion.div
              key={kit.kitab}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-primary/10 hover:border-primary/40 transition-all rounded-[2rem] bg-white group">
                <CardHeader className="p-6">
                  <p className="text-primary font-bold text-xs uppercase tracking-tighter mb-2">{kit.fan}</p>
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{kit.kitab}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-secondary/50 text-sm leading-relaxed">{kit.desc}</p>
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
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Waktu Pelaksanaan</p>
                    <p className="text-xl font-bold">1 - 9 Dzulhijjah 1447 H</p>
                    <p className="text-white/40 text-sm italic">(Selama 9 Hari)</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Mu'allim (Guru)</p>
                    <p className="text-xl font-bold">Syaikhuna Aang KH. Lili Syamsul Romli</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <Info className="w-4 h-4" />
                    <span>Informasi Lughoh</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Lughoh dan Surahan menggunakan <span className="text-white font-bold">Bahasa Sunda</span>. Kitab dan alat tulis tersedia di Sekretariat.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center text-white shadow-2xl shadow-primary/20">
            <h4 className="text-2xl font-bold mb-4">Siap Bergabung?</h4>
            <p className="text-white/80 mb-8 leading-relaxed">Segera daftarkan diri Anda untuk mengamankan kuota pengajian.</p>
            <button 
              onClick={() => window.location.href = '/daftar'}
              className="w-full bg-secondary hover:bg-white hover:text-secondary text-white px-8 py-5 rounded-2xl font-extrabold transition-all shadow-xl"
            >
              DAFTAR SEKARANG
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
