"use client"

import { motion } from "framer-motion"

const leaders = [
  { 
    name: "Syaikhuna Aang KH. Lili Syamsul Romli", 
    role: "Pimpinan Umum", 
    bio: "Pimpinan utama yang membimbing para santri dengan keteladanan serta menjaga kemurnian tradisi kitab kuning." 
  },
  { 
    name: "Teteh Hj. Iis Mushlihah", 
    role: "Pimpinan Putri", 
    bio: "Membimbing santriwati dalam aspek keilmuan, adab, dan kemandirian di lingkungan pesantren putri." 
  },
]

const dewanKiyai = [
  { name: "Kiyai Asep Abdul Basith", role: "Dewan Kiyai" },
  { name: "Kiyai Zamzam", role: "Dewan Kiyai" },
  { name: "Kiyai Rifki", role: "Dewan Kiyai" },
  { name: "Kiyai Faiz", role: "Dewan Kiyai" },
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
            className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tighter"
          >
            Pimpinan <span className="text-primary italic">Pesantren</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8 shadow-lg shadow-primary/20" />
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
            Dibimbing oleh para kiyai yang kompeten dan bersanad untuk mencetak generasi yang beradab dan mumpuni dalam ilmu agama.
          </p>
        </div>

        {/* Main Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-4xl mx-auto">
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
                  <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold text-white/40 italic">
                    FOTO
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{leader.name}</h3>
              <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4">{leader.role}</p>
              <p className="text-white/50 leading-relaxed text-sm max-w-[300px] font-medium">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dewan Kiyai Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest inline-block border-b-2 border-primary/20 pb-2">Dewan Kiyai</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dewanKiyai.map((kiyai, index) => (
              <motion.div
                key={kiyai.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-all group"
              >
                <h4 className="font-bold text-white text-sm md:text-base group-hover:text-primary transition-colors">{kiyai.name}</h4>
                <p className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-2">{kiyai.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
