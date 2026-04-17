import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Berita & Kegiatan",
  description: "Kumpulan berita, pengumuman, dan catatan kegiatan Pondok Pesantren Al-Hasanah.",
}

const news = [
  {
    title: "Pendaftaran Santri Baru Tahun Ajaran 2025/2026 Telah Dibuka",
    excerpt: "Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan Islam terbaik dengan kurikulum yang terintegrasi antara ilmu agama dan pengetahuan umum.",
    date: "12 April 2025",
    category: "Pengumuman",
    image: "/pasaran.jpg",
    slug: "pendaftaran-santri-baru-2025"
  },
  {
    title: "Kunjungan Ulama Internasional ke Pondok Pesantren Al-Hasanah",
    excerpt: "Syaikh dari Al-Azhar Mesir memberikan tausiyah dan motivasi bagi para santri dalam mendalami ilmu agama dan menjaga integritas akhlak.",
    date: "05 April 2025",
    category: "Kegiatan",
    image: "/pasaran.jpg",
    slug: "kunjungan-ulama-internasional"
  },
  {
    title: "Santri Al-Hasanah Meraih Juara 1 Lomba Musabaqah Qira'atil Kutub",
    excerpt: "Prestasi membanggakan kembali diukir oleh santri dalam ajang tingkat provinsi, menunjukkan kualitas pengajaran kitab kuning di Al-Hasanah.",
    date: "28 Maret 2025",
    category: "Prestasi",
    image: "/pasaran.jpg",
    slug: "prestasi-mqk-2025"
  },
  {
    title: "Peringatan Isra Mi'raj dan Tabligh Akbar di Kompleks Pesantren",
    excerpt: "Rangkaian acara religius untuk memperingati perjalanan suci Nabi Muhammad SAW yang dihadiri oleh santri, wali santri, dan masyarakat sekitar.",
    date: "20 Maret 2025",
    category: "Kegiatan",
    image: "/pasaran.jpg",
    slug: "peringatan-isra-miraj"
  },
  {
    title: "Workshop Literasi Digital dan Etika Media Sosial bagi Santri",
    excerpt: "Membekali santri dengan pemahaman teknologi informasi agar bijak dalam menggunakan media sosial untuk kepentingan dakwah.",
    date: "15 Maret 2025",
    category: "Kegiatan",
    image: "/pasaran.jpg",
    slug: "workshop-literasi-digital"
  },
  {
    title: "Lulusan Al-Hasanah Diterima di Universitas Al-Azhar Kairo",
    excerpt: "Kebahagiaan terpancar dari para alumni yang berhasil melanjutkan studi ke pusat keilmuan Islam tertua di dunia melalui jalur beasiswa.",
    date: "10 Maret 2025",
    category: "Prestasi",
    image: "/pasaran.jpg",
    slug: "alumni-al-azhar"
  }
]

export default function BeritaPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Berita & Kegiatan" 
        subtitle="Informasi terbaru seputar pengumuman, prestasi, dan ragam aktivitas santri di Al-Hasanah."
        breadcrumb={[{ label: "Berita", href: "/berita" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, i) => (
            <article 
              key={item.slug}
              className="bg-card rounded-[3rem] overflow-hidden shadow-xl border border-primary/5 flex flex-col group"
            >
              <div className="relative aspect-video">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </div>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-6">
                  <Calendar className="w-4 h-4 text-primary" />
                  {item.date}
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">
                  <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 font-medium line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={`/berita/${item.slug}`} 
                    className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
