"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"

const news = [
  {
    title: "Pendaftaran Santri Baru Tahun Ajaran 2025/2026 Telah Dibuka",
    excerpt: "Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan Islam terbaik...",
    date: "12 April 2025",
    category: "Pengumuman",
    image: "/pasaran.jpg",
    slug: "pendaftaran-santri-baru-2025"
  },
  {
    title: "Kunjungan Ulama Internasional ke Pondok Pesantren Al-Hasanah",
    excerpt: "Syaikh dari Al-Azhar Mesir memberikan tausiyah dan motivasi bagi para santri...",
    date: "05 April 2025",
    category: "Kegiatan",
    image: "/pasaran.jpg",
    slug: "kunjungan-ulama-internasional"
  },
  {
    title: "Santri Al-Hasanah Meraih Juara 1 Lomba Musabaqah Qira'atil Kutub",
    excerpt: "Prestasi membanggakan kembali diukir oleh santri dalam ajang tingkat provinsi...",
    date: "28 Maret 2025",
    category: "Prestasi",
    image: "/pasaran.jpg",
    slug: "prestasi-mqk-2025"
  }
]

export default function BeritaSection() {
  return (
    <section className="py-24 bg-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Kabar Terbaru</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
              Berita & <span className="text-primary italic">Kegiatan</span>
            </h2>
          </div>
          <Link href="/berita" className="hidden md:flex items-center gap-2 text-primary font-bold group">
            Lihat Semua Berita
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-primary/5 flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  {item.date}
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 leading-tight uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={`/berita/${item.slug}`} 
                    className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/berita" className="inline-flex items-center gap-2 text-primary font-bold group border-b-2 border-primary/20 pb-1">
            Lihat Semua Berita
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
