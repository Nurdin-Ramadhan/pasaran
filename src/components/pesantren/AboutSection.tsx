"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
              
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-card shadow-2xl aspect-[4/5] md:aspect-video lg:aspect-[4/5]">
                <Image 
                  src="/pasaran.jpg" 
                  alt="Suasana Pesantren Al-Hasanah" 
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
              </div>

              {/* Float Badge */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-primary p-6 rounded-[2rem] shadow-2xl hidden md:block"
              >
                <div className="text-white text-center">
                  <div className="text-3xl font-black leading-none">30+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Tahun Khidmat</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Profil Singkat</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter leading-none uppercase">
              Membentuk Generasi <span className="text-primary italic">Beradab & Berilmu</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-medium">
              Pondok Pesantren Al-Hasanah Cibeuti adalah lembaga pendidikan Islam klasik yang berfokus pada pelestarian tradisi kitab kuning dengan integrasi nilai-nilai modern. Kami berkomitmen mencetak santri yang berafiliasi kuat pada Al-Qur'an dan As-Sunnah.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                "Pendidikan Kitab Kuning",
                "Tahfidzul Qur'an",
                "Kajian Fiqih & Tauhid",
                "Bahasa Arab Intensif",
                "Pendidikan Karakter",
                "Sanad Keilmuan Jelas"
              ].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-foreground font-bold text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/tentang" 
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl"
              >
                Selengkapnya
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/kontak" 
                className="border-2 border-primary/20 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:bg-primary/5 transition-all"
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
