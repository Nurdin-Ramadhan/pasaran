"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Building2, Search } from "lucide-react"

const facilities = [
  { name: "Masjid Utama", image: "/pasaran.jpg" },
  { name: "Asrama Santri", image: "/pasaran.jpg" },
  { name: "Ruang Kelas", image: "/pasaran.jpg" },
  { name: "Kantin Santri", image: "/pasaran.jpg" },
]

export default function FasilitasSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block text-center md:text-left">Lingkungan Pesantren</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase text-center md:text-left">
              Fasilitas & <span className="text-primary italic">Sarana</span>
            </h2>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="hidden md:block"
          >
            <a href="/fasilitas" className="text-primary font-bold flex items-center gap-2 group border-b-2 border-primary/20 pb-1">
              Lihat Semua Fasilitas
              <Building2 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fasi, index) => (
            <motion.div
              key={fasi.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group rounded-[2rem] overflow-hidden aspect-video shadow-xl"
            >
              <Image 
                src={fasi.image} 
                alt={fasi.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{fasi.name}</h3>
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <Search className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
