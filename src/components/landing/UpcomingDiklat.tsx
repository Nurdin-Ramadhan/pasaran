"use client"

import { motion } from "framer-motion"
import { Calendar, User, Info, CheckCircle2, Star } from "lucide-react"

const upcomingProgram = {
  title: "DZULHIJJAH",
  dates: "1 - 9 Dzulhijjah",
  description: "Pengajian Intensif Kitab Kuning khusus menyambut bulan Dzulhijjah.",
  features: [
    "Pengajaran Kitab Kuning Otentik",
    "Dibimbing Langsung oleh Dewan Kiyai",
    "Lingkungan Belajar Khidmat di Al-Hasanah",
    "Sertifikasi Diklat Resmi Pesantren"
  ]
}

export default function UpcomingDiklat() {
  return (
    <section id="diklat" className="py-24 bg-background relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black mb-6 border border-primary/20 tracking-widest uppercase"
          >
            <Star className="w-3 h-3 fill-primary" />
            Program Terdekat
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tighter uppercase">
            DIKLAT <span className="text-primary italic">PASARAN</span>
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-700" />
            
            <h3 className="text-6xl font-black text-primary mb-4 tracking-tighter dark:neon-gold">{upcomingProgram.title}</h3>
            <p className="text-2xl font-bold text-foreground/80 mb-8 italic">"{upcomingProgram.description}"</p>
            
            <div className="space-y-6">
              {upcomingProgram.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group/item"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-medium text-foreground/70 group-hover/item:text-foreground transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Details & Action */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                      <Calendar className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Pelaksanaan</p>
                      <p className="text-xl font-black">{upcomingProgram.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Mu'allim (Guru)</p>
                      <p className="text-lg font-black leading-tight">Syaikhuna Aang <br/>KH. Lili Syamsul Romli</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2 text-primary font-bold mb-3">
                      <Info className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">Informasi Penting</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed italic">
                      Lughoh dan Surahan menggunakan <span className="text-primary font-bold">Bahasa Sunda</span>. Kitab dan alat tulis tersedia di Sekretariat.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-primary p-10 rounded-[2.5rem] flex flex-col items-center text-center text-primary-foreground shadow-2xl shadow-primary/20 border border-white/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
              <h4 className="text-3xl font-black mb-4 relative z-10 tracking-tighter">SIAP BERGABUNG?</h4>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed font-bold relative z-10">Segera daftarkan diri Anda untuk mengikuti pengajian Diklat ini !</p>
              <button 
                onClick={() => window.location.href = '/daftar'}
                className="w-full bg-secondary hover:bg-white hover:text-secondary text-white px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:scale-105 active:scale-95 relative z-10"
              >
                DAFTAR SEKARANG
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
