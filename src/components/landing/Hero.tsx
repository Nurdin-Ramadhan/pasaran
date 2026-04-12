"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Decor - Futuristic Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Moving Particles simulation for Futuristic feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/3 w-1 h-1 bg-primary rounded-full" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          }} 
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full" 
        />
      </div>

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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all duration-500" />
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={100} 
                  height={100} 
                  className="relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-black mb-6 border border-primary/20 tracking-[0.2em] uppercase backdrop-blur-sm">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                Pendaftaran Diklat Pasaran 1447 H
              </span>
              
              <h1 className="text-7xl md:text-9xl font-black text-foreground mb-4 leading-none tracking-tighter dark:neon-gold">
                AL-HASANAH
              </h1>
              
              <p className="text-xl md:text-3xl font-serif italic text-primary/80 mb-10 max-w-2xl leading-relaxed">
                "Menyemai Ilmu, Meraih Keberkahan di Pesantren"
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <Link 
                  href="/daftar" 
                  className="group relative bg-secondary text-secondary-foreground px-12 py-5 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-secondary/40"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Daftar Sekarang
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
                <Link 
                  href="#tentang" 
                  className="px-10 py-5 rounded-2xl font-bold text-lg text-foreground border-2 border-primary/20 hover:bg-primary/5 transition-all backdrop-blur-md"
                >
                  Tentang Pesantren
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Leadership / Aang Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative w-[320px] h-[320px] md:w-[550px] md:h-[550px] mx-auto">
              {/* Futuristic Decorative rings */}
              <div className="absolute inset-0 border-[1px] border-primary/30 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 border-[1px] border-secondary/20 rounded-full animate-[spin_20s_linear_infinite_reverse] border-dashed" />
              <div className="absolute inset-16 border-[1px] border-primary/10 rounded-full animate-[spin_40s_linear_infinite]" />
              
              {/* Leader Image Container with Glassmorphism */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute inset-6 bg-gradient-to-tr from-secondary/10 to-primary/5 rounded-full overflow-hidden border-[6px] border-background/50 shadow-[0_0_50px_rgba(201,168,76,0.15)] backdrop-blur-sm z-10 group"
              >
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                <Image 
                  src="/aang.png" 
                  alt="KH. Lili Syamsul Romli" 
                  fill 
                  className="object-contain object-bottom scale-125 translate-y-10 group-hover:scale-130 transition-transform duration-1000"
                  priority
                />
              </motion.div>

              {/* Float decor / Micro-interactions */}
              <motion.div 
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-24 h-24 glass-card rounded-3xl flex items-center justify-center z-20"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                   <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ 
                  y: [0, 30, 0],
                  x: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 left-0 w-20 h-20 glass-card rounded-full flex items-center justify-center z-20"
              >
                <div className="text-primary font-black text-xs">PP</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-[2px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent relative overflow-hidden">
           <motion.div 
             animate={{ y: [0, 64] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 w-full h-1/2 bg-white blur-sm"
           />
        </div>
        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground/40 animate-pulse">Explore</span>
      </motion.div>
    </section>
  )
}
