"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-secondary p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Mari Bergabung Bersama Kami</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
              Mulai Perjalanan Spiritual <span className="text-primary italic">Anda di Al-Hasanah</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-medium">
              Jadilah bagian dari keluarga besar Pondok Pesantren Al-Hasanah Cibeuti. Pendaftaran santri baru dan program diklat selalu terbuka untuk Anda yang haus akan ilmu.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/daftar" 
                className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                Daftar Sekarang
                <ArrowRight className="w-6 h-6" />
              </a>
              <a 
                href="/kontak" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-6 h-6" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
