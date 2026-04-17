"use client"

import { motion } from "framer-motion"
import { Book, Languages, Quote, Brain, Compass, Scale, History, ScrollText, GraduationCap } from "lucide-react"

const fanKitabs = [
  {
    fan: "Fan Nahwu & Shorof",
    icon: Languages,
    kitabs: ["Jurumia 'Asymawi", "Nadzom Imrity", "Sorof Zanzani", "Nadzmul Maqshud"],
    color: "bg-amber-500/10 text-amber-600"
  },
  {
    fan: "Fan Bilaghah",
    icon: Quote,
    kitabs: ["Jauharul Maknun", "Uqudul Juman", "Samarqondy & Nadzomnya"],
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    fan: "Fan Mantiq",
    icon: Brain,
    kitabs: ["Sullamul Munawraq", "Syamsiyyah"],
    color: "bg-indigo-500/10 text-indigo-600"
  },
  {
    fan: "Fan Falak",
    icon: Compass,
    kitabs: ["Sulamul Munairain", "Fathul Rouful Mannan", "Taqribul Maqshod", "Durusul Falakiyah", "Badi'atul Mitsal", "Hisab Ephemeris", "Hisab Waktu Sholat", "Arah Qiblat", "Ru'yatul Hilal"],
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    fan: "Fan Fiqih",
    icon: Scale,
    kitabs: ["Safinatun Najah", "I'anatu Thalibin", "Sarqawi"],
    color: "bg-rose-500/10 text-rose-600"
  },
  {
    fan: "Fan Ushul Fiqih",
    icon: GraduationCap,
    kitabs: ["Waraqat", "Lathoiful Isyarah", "Jam'ul Jawami"],
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    fan: "Fan Hadis",
    icon: History,
    kitabs: ["Sohih Bukhari", "Musthalat Hadis (Baiquniyyah)"],
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    fan: "Fan Lainnya",
    icon: ScrollText,
    kitabs: ["Munadzarah (Al-Waladiyah)", "Faroid (Ar-Rohbiyah)", "Maqodir (Fathul Qodir)"],
    color: "bg-cyan-500/10 text-cyan-600"
  }
]

export default function ProgramSection() {
  return (
    <section className="py-24 bg-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Kurikulum Pesantren</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter uppercase">
            Kajian <span className="text-primary italic">Kitab Kuning</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Daftar kajian kitab (Fan) yang dipelajari di Pondok Pesantren Al-Hasanah, menjaga sanad keilmuan para ulama salafiyah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fanKitabs.map((item, index) => (
            <motion.div
              key={item.fan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-primary/5 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group flex flex-col"
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-foreground mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                {item.fan}
              </h3>
              <ul className="space-y-2 mt-auto">
                {item.kitabs.map((kitab) => (
                  <li key={kitab} className="text-muted-foreground text-xs font-bold flex items-start gap-2 italic">
                    <span className="text-primary">»</span>
                    {kitab}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
