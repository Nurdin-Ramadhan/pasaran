"use client"

import { motion } from "framer-motion"
import { Book, Heart, Users, Star, GraduationCap, Laptop } from "lucide-react"

const programs = [
  {
    title: "Tahfidzul Qur'an",
    desc: "Program menghafal Al-Qur'an 30 juz dengan bimbingan makhraj dan tajwid yang fasih.",
    icon: Star,
    color: "bg-amber-500/10 text-amber-600"
  },
  {
    title: "Kajian Kitab Kuning",
    desc: "Pendalaman literatur Islam klasik (Turats) dalam bidang Fiqih, Nahwu, Sharaf, dan Tauhid.",
    icon: Book,
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    title: "Pendidikan Madrasah",
    desc: "Kurikulum formal yang terintegrasi dengan nilai-nilai kepesantrenan dan akhlakul karimah.",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Pengembangan Karakter",
    desc: "Pembentukan mental dan spiritual santri melalui kegiatan pembiasaan ibadah dan disiplin.",
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600"
  },
  {
    title: "Keterampilan (Life Skill)",
    desc: "Pembekalan keahlian praktis seperti kewirausahaan, pertanian, dan teknologi informasi.",
    icon: Laptop,
    color: "bg-indigo-500/10 text-indigo-600"
  },
  {
    title: "Organisasi Santri",
    desc: "Wadah melatih kepemimpinan, tanggung jawab, dan kerjasama dalam bermasyarakat.",
    icon: Users,
    color: "bg-purple-500/10 text-purple-600"
  }
]

export default function ProgramSection() {
  return (
    <section className="py-24 bg-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Program Unggulan</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter uppercase">
            Kurikulum Pendidikan <span className="text-primary italic">Terpadu</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Kami menghadirkan sistem pendidikan yang menyeimbangkan antara aspek intelektual, spiritual, dan keterampilan praktis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, index) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-card border border-primary/5 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
              <div className={`w-14 h-14 ${prog.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <prog.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">
                {prog.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                {prog.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
