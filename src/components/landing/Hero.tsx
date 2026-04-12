"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Decor - Refined for elegance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Image 
                src="/logo.png" 
                alt="Logo Pesantren" 
                width={80} 
                height={80} 
                className="drop-shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4 border border-primary/20 tracking-[0.2em] uppercase">
                Pendaftaran Diklat Pasaran Telah Dibuka
              </span>
              
              <h1 className="text-7xl md:text-9xl font-black text-secondary mb-4 leading-none tracking-tighter">
                AL-HASANAH
              </h1>
              
              <p className="text-xl md:text-2xl font-serif italic text-primary/80 mb-10 max-w-2xl leading-relaxed">
                "Menyemai Ilmu, Meraih Keberkahan di Pesantren"
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
                <Link 
                  href="/daftar" 
                  className="group relative bg-secondary text-white px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-secondary/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link 
                  href="#tentang" 
                  className="px-10 py-4 rounded-2xl font-bold text-lg text-secondary border-2 border-secondary/10 hover:bg-secondary/5 transition-all"
                >
                  Tentang Pesantren
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Leadership Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Leader Image Container */}
              <div className="absolute inset-4 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full overflow-hidden border-8 border-white shadow-2xl backdrop-blur-sm">
                <Image 
                  src="/aang.png" 
                  alt="KH. Lili Syamsul Romli" 
                  fill 
                  className="object-contain object-bottom scale-125 translate-y-8"
                  priority
                />
              </div>

              {/* Float decor */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center border border-primary/10"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-secondary/40">Scroll</span>
      </motion.div>
    </section>
  )
}
