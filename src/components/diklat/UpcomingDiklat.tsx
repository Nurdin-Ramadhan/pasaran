"use client"

import { motion } from "framer-motion"
import { BookOpen, Calendar, User, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiklatConfig, DiklatProgram } from "@/lib/diklat-shared"

type UpcomingDiklatProps = {
  config: DiklatConfig | null
  programs: DiklatProgram[]
}

const formatCurrency = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

const DIKLAT_DETAIL = {
  MAULID: {
    subtitle: "Pengajian Kitab Kuning & Tafaqquh Fiddin",
    rooms: [
      {
        name: "Ruang 1 & 2",
        note: "Kajian sama, Ruang 2 lebih diperluas",
        mualim: ["KH. Abdul Basith", "Kiyai Zamzam Zamakhsyari", "Hj. Iis Mushlihah"],
        kitab: [
          { fan: "Fan Nahwu", nama: "Jurumiah Asmawi" },
          { fan: "Fan Sorof", nama: "Nadzmul Maqsud" },
          { fan: "Fan Nahwu", nama: "Nadzmul Imrity" },
          { fan: "Fan Sorof", nama: "Shorof Zanzany" },
        ],
      },
      {
        name: "Ruang 3",
        mualim: ["Aang KH. Lili Syamsul Romli"],
        kitab: [
          { fan: "Fan Balaghah", nama: "Jauharul Maknun" },
          { fan: "Fan Balaghah", nama: "Samarqondi & Nadzomnya" },
          { fan: "Fan Manthiq", nama: "Sullamul Munauroq" },
          { fan: "Fan Munadzoroh", nama: "Al-waladiyyah" },
        ],
      },
    ],
  },
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

export default function UpcomingDiklat({ config, programs }: UpcomingDiklatProps) {
  const featuredProgram = programs.find((p) => p.jenis_diklat === "MAULID") ?? programs[0]
  const totalWajib = config
    ? config.uang_miftah + config.biaya_listrik + config.kos_makan + config.tafaruqon
    : 0

  if (!featuredProgram) {
    return (
      <section id="diklat" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
            Data belum tersedia
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            Program Diklat
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto leading-relaxed text-lg">
            Data program aktif belum ditemukan.
          </p>
        </div>
      </section>
    )
  }

  const detail = DIKLAT_DETAIL[featuredProgram.jenis_diklat as keyof typeof DIKLAT_DETAIL]

  return (
    <section id="diklat" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
            {config ? `Periode Ke-${config.periode}` : "Periode Aktif"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4 leading-tight">
            MA&apos;LUMAT <span className="text-primary italic font-serif">{featuredProgram.label.toUpperCase()} {config?.tahun_hijriah ?? ""} H</span>
          </h2>
          <p className="text-secondary/70 max-w-3xl mx-auto leading-relaxed text-lg">
            {detail?.subtitle}
          </p>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 bg-secondary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Tahun & Periode</p>
                    <p className="text-xl font-bold">{config?.tahun_hijriah ?? "-"} H</p>
                    <p className="text-white/40 text-sm italic">Periode ke-{config?.periode ?? "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Peserta Terdata</p>
                    <p className="text-xl font-bold">{featuredProgram.jumlah_peserta.toLocaleString("id-ID")} Peserta</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Program</p>
                    <p className="text-xl font-bold">Pasaran {featuredProgram.label}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Administrasi</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Total wajib <span className="text-white font-bold">{formatCurrency(totalWajib)}</span>. Silakan daftar untuk melihat rincian lengkap biaya dan kitab.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center text-white shadow-2xl shadow-primary/20">
            <h4 className="text-2xl font-bold mb-4">Siap Bergabung?</h4>
            <p className="text-white/80 mb-8 leading-relaxed">Segera daftarkan diri Anda untuk mengamankan kuota pengajian.</p>
            <Button
              render={<Link href={`/diklat/${featuredProgram.slug}/daftar`} />}
              nativeButton={false}
              className="w-full bg-secondary hover:bg-white hover:text-secondary text-white px-8 py-5 rounded-2xl font-extrabold transition-all shadow-xl h-auto"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              DAFTAR SEKARANG
            </Button>
          </div>
        </motion.div>

        {/* Detail Kajian */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-secondary tracking-tight">KAJIAN KITAB</h3>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4" />
          </div>

          {/* Render based on diklat type */}
          {detail && "rooms" in detail && detail.rooms.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Info Ruang */}
                <div className="md:w-1/3">
                  <div className="bg-primary text-white rounded-2xl p-6 mb-4">
                    <h4 className="text-xl font-black uppercase tracking-wider">{room.name}</h4>
                    {"note" in room && room.note && <p className="text-white/70 text-xs mt-1 italic">{room.note}</p>}
                  </div>
                  <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/10">
                    <div className="flex items-center gap-2 text-primary font-bold mb-3">
                      <User className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">Mu'allim</span>
                    </div>
                    <ul className="space-y-2">
                      {room.mualim.map((m, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm font-bold text-secondary">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Daftar Kitab */}
                <div className="md:w-2/3">
                  <h5 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Kajian Kitab</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {room.kitab.map((k, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
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
              </div>
            </motion.div>
          ))}

          {/* Syaban & Dzulhijjah - Single Room */}
          {detail && "mualim" in detail && !("rooms" in detail) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-primary text-white rounded-2xl p-6 mb-4">
                    <h4 className="text-xl font-black uppercase tracking-wider">{featuredProgram.label}</h4>
                  </div>
                  <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/10">
                    <div className="flex items-center gap-2 text-primary font-bold mb-3">
                      <User className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">Mu'allim</span>
                    </div>
                    <ul className="space-y-2">
                      {detail.mualim.map((m, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm font-bold text-secondary">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  {"sections" in detail && detail.sections?.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h5 className="text-sm font-black uppercase tracking-widest text-primary mb-3">{section.title}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  {"kitab" in detail && !("sections" in detail) && detail.kitab && (
                    <div>
                      <h5 className="text-sm font-black uppercase tracking-widest text-primary mb-3">Kajian Kitab</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {detail.kitab.map((k, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
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
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Waktu Ngaji */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-secondary/5 rounded-[2rem] p-8 border border-secondary/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest">Waktu Ngaji</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { time: "Pagi", jam: "07:00 s/d Selesai" },
              { time: "Siang", jam: "13:30 s/d Selesai" },
              { time: "Malam", jam: "20:00 s/d Selesai" },
            ].map((item) => (
              <div key={item.time} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-primary/10">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase">{item.time}</p>
                  <p className="text-sm font-bold text-secondary">{item.jam}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
