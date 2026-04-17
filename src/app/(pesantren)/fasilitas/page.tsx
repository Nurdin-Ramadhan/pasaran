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
    desc: "Pusat kegiatan ibadah dan kajian keislaman santri dengan arsitektur yang megah dan tenang.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Asrama Nyaman", 
    desc: "Hunian santri yang bersih dan teratur, didesain untuk mendukung istirahat dan kemandirian.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Ruang Kelas Modern", 
    desc: "Sarana belajar mengajar yang representatif dan dilengkapi dengan media pembelajaran digital.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Perpustakaan Digital", 
    desc: "Koleksi ribuan kitab kuning otentik dan buku pengetahuan umum dalam format fisik dan digital.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Laboratorium Komputer", 
    desc: "Fasilitas praktik teknologi informasi untuk membekali santri dengan keterampilan digital.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Kantin & Mart", 
    desc: "Unit usaha pesantren yang menyediakan kebutuhan harian santri dengan sistem ekonomi syariah.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Sarana Olahraga", 
    desc: "Lapangan serbaguna untuk menjaga kesehatan fisik santri melalui kegiatan olahraga rutin.",
    image: "/pasaran.jpg" 
  },
  { 
    name: "Area Pertanian", 
    desc: "Lahan praktik kewirausahaan santri dalam bidang agribisnis dan kemandirian pangan.",
    image: "/pasaran.jpg" 
  },
]

export default function FasilitasPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Fasilitas & Sarana" 
        subtitle="Menciptakan lingkungan belajar yang khidmat, nyaman, dan mendukung tumbuh kembang potensi santri."
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
