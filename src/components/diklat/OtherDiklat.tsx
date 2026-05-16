"use client"

import { motion } from "framer-motion"
import { BookOpen, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiklatProgram } from "@/lib/diklat-shared"

type OtherDiklatProps = {
  programs: DiklatProgram[]
}

const formatCurrency = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

export default function OtherDiklat({ programs }: OtherDiklatProps) {
  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4 uppercase tracking-widest">Informasi Diklat <span className="text-primary italic">Lainnya</span></h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12">
          {programs.map((prog, pIdx) => (
            <motion.div
              key={prog.jenis_diklat}
              initial={{ opacity: 0, x: pIdx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-primary/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h3 className="text-3xl font-black text-secondary tracking-tighter uppercase">{prog.label}</h3>
                  <p className="text-primary font-bold flex items-center gap-2 mt-2 tracking-widest uppercase text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {prog.kitab.length} kitab aktif
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="text-secondary/50 border-secondary/20">
                    <Users className="w-3 h-3" />
                    {prog.jumlah_peserta.toLocaleString("id-ID")} peserta
                  </Badge>
                  <Button
                    render={<Link href={`/diklat/${prog.slug}/daftar`} />}
                    variant="secondary"
                    className="rounded-2xl h-10 px-5 font-black"
                  >
                    Daftar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {prog.kitab.map((kitab) => (
                  <div key={kitab.id} className="space-y-4">
                    <h4 className="font-extrabold text-secondary flex items-start gap-2 border-b-2 border-primary/10 pb-2">
                      <div className="w-1.5 h-6 bg-primary rounded-full" />
                      {kitab.nama_kitab}
                    </h4>
                    <p className="text-secondary/60 text-sm flex items-center gap-2 italic">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Harga kitab {formatCurrency(kitab.harga)}
                    </p>
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
