"use client"

import { motion } from "framer-motion"
import { BookOpen, User, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiklatProgram } from "@/lib/diklat-shared"

type OtherDiklatProps = {
  programs: DiklatProgram[]
}

const OTHER_DIKLAT_DETAIL = {
  SYABAN: {
    subtitle: "Pengajian Ilmu Falak & Faro'idh",
    mualim: ["KH. Abdul Basith", "KH. Lili Syamsul Romli"],
    sections: [
      {
        title: "Ilmu Falak",
        kitab: [
          "Sullamun Nayirain / Fathul Ro'iful Mannan",
          "Taqribul Maqshod / Durusul Falakiyah",
          "Badi'atul Mitsal",
          "Hisab Ephemeris Kontemporer Awal Bulan, Gerhana Bulan & Matahari",
          "Jadwal Waktu Sholat (WIB & Istiwa)",
          "7 Metode Menentukan Arah Kiblat",
          "Konversi Tarikh",
          "Praktek Ru'yah",
        ],
      },
      {
        title: "Ilmu Faro'idh & Maqodir",
        kitab: ["Ar-Rohbiyyah", "Fathul Qodir Fi Aja'ibil Maqodir"],
      },
    ],
  },
  RAMADHAN: {
    subtitle: "Pengajian Kitab Kuning Intensif",
    rooms: [
      {
        name: "Ruang 1",
        mualim: ["KH. Abdul Basith", "Kiyai Zamzam Zamakhsyari"],
        kitab: [
          { fan: "Fan Nahwu & Shorof", nama: "Jurumiah Asymawi" },
          { fan: "Fan Nahwu & Shorof", nama: "Imrithy" },
          { fan: "Fan Nahwu & Shorof", nama: "Nadzmul Maqsud" },
          { fan: "Fan Nahwu & Shorof", nama: "Shorof Zanzany" },
        ],
      },
      {
        name: "Ruang 2",
        mualim: ["Hj. Iis Mushlihah"],
        kitab: [
          { fan: "Fan Nahwu & Shorof", nama: "Al-Fiyah" },
        ],
      },
      {
        name: "Ruang 3",
        mualim: ["KH. Lili Syamsul Romli"],
        kitab: [
          { fan: "Fan Nahwu & Shorof", nama: "Al-Fiyah" },
          { fan: "Fan Balaghah", nama: "Uqudul Juman" },
          { fan: "Fan Manthiq", nama: "Syamsiyyah" },
          { fan: "Fan Mushtholahat Hadits", nama: "Baiquniyyah & Mandzumahnya" },
        ],
      },
    ],
  },
  DZULHIJJAH: {
    subtitle: "Pengajian Kitab Kuning & Tauhid",
    mualim: ["Ustadz Senior Al-Hasanah"],
    kitab: [
      { fan: "Ilmu Arudh", nama: "Mukhtashor Syafi" },
      { fan: "Ilmu Istiqooq", nama: "Tuhfatul Mustaq" },
      { fan: "Ilmu Wadho", nama: "Wadh'ul Kalimah" },
      { fan: "Ilmu Maqulat", nama: "Mama Syuja'i & Mama Syathiby" },
      { fan: "Ilmu Tauhid", nama: "Tijan Addarori" },
    ],
  },
}

export default function OtherDiklat({ programs }: OtherDiklatProps) {
  const otherPrograms = programs.filter(p => p.jenis_diklat !== "MAULID")

  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4 uppercase tracking-widest">Informasi Diklat <span className="text-primary italic">Lainnya</span></h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12">
          {otherPrograms.map((prog, pIdx) => {
            const detail = OTHER_DIKLAT_DETAIL[prog.jenis_diklat as keyof typeof OTHER_DIKLAT_DETAIL]
            if (!detail) return null

            return (
              <motion.div
                key={prog.jenis_diklat}
                initial={{ opacity: 0, x: pIdx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-primary/5"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-secondary tracking-tighter uppercase">{prog.label}</h3>
                    <p className="text-primary font-bold flex items-center gap-2 mt-2 tracking-widest uppercase text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {prog.kitab.length} kitab aktif
                    </p>
                    <p className="text-secondary/60 text-sm mt-1 italic">{detail.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="text-secondary/50 border-secondary/20">
                      <Users className="w-3 h-3" />
                      {prog.jumlah_peserta.toLocaleString("id-ID")} peserta
                    </Badge>
                    <Button
                      render={<Link href={`/diklat/${prog.slug}/daftar`} />}
                      nativeButton={false}
                      variant="secondary"
                      className="rounded-2xl h-10 px-5 font-black"
                    >
                      Daftar
                    </Button>
                  </div>
                </div>

                {/* Mu'allim */}
                <div className="bg-secondary/5 rounded-2xl p-6 mb-8 border border-secondary/10">
                  <div className="flex items-center gap-2 text-primary font-bold mb-3">
                    <User className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">Mu'allim</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {("rooms" in detail
                      ? detail.rooms.flatMap(r => r.mualim)
                      : "mualim" in detail
                        ? detail.mualim
                        : []
                    ).map((m, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kitab - Multi Room */}
                {"rooms" in detail && detail.rooms.map((room, rIdx) => (
                  <div key={rIdx} className="mb-8 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary text-white px-4 py-2 rounded-xl">
                        <h4 className="text-sm font-black uppercase tracking-wider">{room.name}</h4>
                      </div>
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {room.kitab.map((k, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{k.fan}</p>
                            <p className="text-sm font-bold text-secondary">{k.nama}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Kitab - Single */}
                {"kitab" in detail && !("rooms" in detail) && detail.kitab && (
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Kajian Kitab</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {detail.kitab.map((k, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{k.fan}</p>
                            <p className="text-sm font-bold text-secondary">{k.nama}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sections (Syaban) */}
                {"sections" in detail && detail.sections && (
                  <div className="space-y-6">
                    {detail.sections.map((section, sIdx) => (
                      <div key={sIdx}>
                        <h5 className="text-sm font-black uppercase tracking-widest text-primary mb-3">{section.title}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {section.kitab.map((nama, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <BookOpen className="w-4 h-4 text-primary" />
                              </div>
                              <p className="text-sm font-bold text-secondary">{nama}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Waktu Ngaji */}
                <div className="mt-8 pt-6 border-t border-secondary/10">
                  <div className="flex items-center gap-2 text-primary font-bold mb-3">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">Waktu Ngaji</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { time: "Pagi", jam: "07:00 s/d Selesai" },
                      { time: "Siang", jam: "13:30 s/d Selesai" },
                      { time: "Malam", jam: "20:00 s/d Selesai" },
                    ].map((item) => (
                      <span key={item.time} className="text-sm text-secondary/70">
                        <span className="font-bold text-secondary">{item.time}</span>: {item.jam}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
