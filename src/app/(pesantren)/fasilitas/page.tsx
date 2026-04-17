import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import Image from "next/image"

export const metadata = {
  title: "Fasilitas Pesantren",
  description: "Lingkungan dan sarana prasarana pendukung pendidikan di Pondok Pesantren Al-Hasanah.",
}

const facilities = [
  { 
    name: "Masjid Utama", 
    desc: "Pusat kegiatan ibadah, pengajian rutin, dan kegiatan spiritual utama seluruh santri.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Asrama Santri", 
    desc: "Hunian santri yang didesain untuk mendukung kedisiplinan, kemandirian, dan kebersamaan dalam menuntut ilmu.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Ruang Kelas", 
    desc: "Sarana belajar mengajar yang tenang dan khidmat untuk mendukung konsentrasi dalam kajian kitab kuning.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Kantin Santri", 
    desc: "Dikelola secara mandiri oleh santri sebagai sarana belajar berwirausaha dan memenuhi kebutuhan harian di lingkungan pesantren.",
    image: "/pasaran.jpg" 
  },
]

export default function FasilitasPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Fasilitas & Sarana" 
        subtitle="Sarana pendukung yang tersedia untuk menunjang kenyamanan dan kekhusyukan santri dalam menimba ilmu agama."
        breadcrumb={[{ label: "Fasilitas", href: "/fasilitas" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {facilities.map((fasi, i) => (
            <div 
              key={fasi.name}
              className="group bg-card rounded-[3rem] overflow-hidden border border-primary/5 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-video">
                <Image 
                  src={fasi.image} 
                  alt={fasi.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {fasi.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {fasi.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
