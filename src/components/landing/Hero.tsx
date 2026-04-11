"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/20"
          >
            Pendaftaran Diklat Pasaran Telah Dibuka
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-primary font-serif italic text-2xl md:text-3xl font-bold mb-2 tracking-widest"
          >
            AL-HASANAH
          </motion.h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-8 leading-[1.1]">
            Menyemai Ilmu, <br />
            <span className="text-primary">Meraih Keberkahan</span> di Pesantren
          </h1>
          <p className="text-lg md:text-xl text-secondary/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ikuti program Diklat Pasaran intensif untuk mendalami kitab-kitab klasik dengan metode yang teruji dan suasana yang penuh khidmat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/daftar" 
              className="group bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center gap-2"
            >
              Daftar Diklat Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#diklat" 
              className="px-10 py-4 rounded-2xl font-bold text-lg text-secondary border-2 border-secondary/10 hover:border-secondary/20 transition-all"
            >
              Lihat Program
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
