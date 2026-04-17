"use client"

import { motion } from "framer-motion"
import { Target, Eye } from "lucide-react"

export default function VisiMisiSection() {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Visi */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[3rem] group hover:bg-white/10 transition-all"
          >
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-widest italic">Visi</h3>
            <p className="text-white/70 text-lg leading-relaxed font-medium italic">
              "Terwujudnya generasi yang bertaqwa, berakhlakul karimah, dan mumpuni dalam ilmu agama (Tafaqquh Fiddin) demi kejayaan umat dan bangsa."
            </p>
          </motion.div>

          {/* Misi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[3rem] group hover:bg-white/10 transition-all"
          >
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-widest italic">Misi</h3>
            <ul className="space-y-4 text-white/70 text-lg font-medium">
              {[
                "Menyelenggarakan pengajaran kitab-kitab salaf secara intensif.",
                "Menanamkan nilai-nilai adab dan akhlak dalam kehidupan sehari-hari.",
                "Mencetak kader ulama yang amaliyah dan ilmuwan yang syar'iyah.",
                "Menjaga dan melestarikan tradisi luhur pesantren salafiyah."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
