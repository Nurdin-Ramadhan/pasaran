"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const otherPrograms = [
  {
    title: "MAULID (Periode 142)",
    dates: "28 Shofar - 12 Robi'ul Awwal",
    sections: [
      { 
        name: "Ruang 1 & 2 (Nahwu & Shorof)", 
        books: ["Jurumia 'Asymawi", "Nadzom Imrity", "Sorof Zanzani", "Nadzmul Maqshud"] 
      },
      { 
        name: "Ruang 3 (Balaghah, Manthiq, Munadzoroh)", 
        books: ["Jauharul Maknun", "Samarqondy", "Nadzom Samarqondy", "Sullamul Munauroq", "Al-Waladiyah"] 
      }
    ]
  },
  {
    title: "SYA'BAN (Periode 147)",
    dates: "10 - 26 Sya'ban",
    sections: [
      { 
        name: "Falak (Mu'allim: Kiyai Abdul Basith)", 
        books: ["Sulamul Munairain", "Fathul Rouful Mannan", "Taqribul Maqshod", "Durusul Falakiyah", "Badi'atul Mitsal", "Hisab Ephemeris", "Hisab Waktu Sholat", "Arah Qiblat", "Ru'yatul Hilal"] 
      },
      { 
        name: "Faroidh & Maqodir (Mu'allim: KH. Lili Syamsul Romli)", 
        books: ["Ar-Rohbiyyah", "Fathul Qodir Fi 'Ajabil Maqodir"] 
      }
    ]
  },
  {
    title: "RAMADHAN (Periode 148)",
    dates: "1 - 23 Ramadhan",
    sections: [
      { 
        name: "Ruang 1 (Mu'allim: Kiyai Asep Abdul Basith & Kiyai Zam Zam)", 
        books: ["Jurumiah", "Imrithy", "Yaqulu", "Zanjani"] 
      },
      { 
        name: "Ruang 2 (Mu'allim: Teteh Hj. Iis Mushlihah)", 
        books: ["Al-Fiyyah Ibnu Malik"] 
      },
      { 
        name: "Ruang 3 (Mu'allim: Aang KH. Lili Syamsul Romli)", 
        books: ["Uqudul Juman", "Syamsiyyah", "Al-Fiyyah", "Baiquniyyah"] 
      }
    ]
  }
]

export default function OtherDiklat() {
  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4 uppercase tracking-widest">Informasi Diklat <span className="text-primary italic">Lainnya</span></h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12">
          {otherPrograms.map((prog, pIdx) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, x: pIdx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-primary/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h3 className="text-3xl font-black text-secondary">{prog.title}</h3>
                  <p className="text-primary font-bold flex items-center gap-2 mt-2 tracking-widest uppercase text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {prog.dates}
                  </p>
                </div>
                <Badge variant="outline" className="text-secondary/40 border-secondary/20">Program Rutin</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {prog.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <h4 className="font-extrabold text-secondary flex items-center gap-2 border-b-2 border-primary/10 pb-2">
                      <div className="w-1.5 h-6 bg-primary rounded-full" />
                      {section.name}
                    </h4>
                    <ul className="space-y-2">
                      {section.books.map((book) => (
                        <li key={book} className="text-secondary/60 text-sm flex items-start gap-2 italic">
                          <span className="text-primary font-bold">»</span>
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
