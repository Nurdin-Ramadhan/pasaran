"use client"

import { motion } from "framer-motion"

const leaders = [
  { name: "KH. Nama Pimpinan Utama", role: "Pengasuh Pesantren", bio: "Fokus dalam membimbing para santri dengan keteladanan dan keikhlasan." },
  { name: "KH. Nama Pimpinan Kedua", role: "Dewan Pengawas", bio: "Berperan dalam memastikan kualitas pendidikan agama yang diajarkan." },
  { name: "Ust. Nama Pimpinan Ketiga", role: "Ketua Diklat Pasaran", bio: "Bertanggung jawab atas jalannya program pengajian intensif." },
]

export default function Leadership() {
  return (
    <section id="pimpinan" className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Background patterns or glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Pimpinan <span className="text-primary italic">Pesantren</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8 shadow-lg shadow-primary/20" />
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-lg">
            Dibimbing oleh para asatidz dan kyai yang kompeten di bidangnya untuk mencetak generasi yang beradab dan berilmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group text-center flex flex-col items-center"
            >
              <div className="relative mb-8">
                <div className="w-56 h-56 bg-primary/20 rounded-full flex items-center justify-center p-3 border border-white/10 group-hover:border-primary transition-colors duration-500">
                  <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold text-white/40">
                    FOTO
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">{leader.role}</p>
              <p className="text-white/50 leading-relaxed text-sm max-w-[280px]">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
