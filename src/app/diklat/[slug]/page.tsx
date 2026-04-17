import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import UpcomingDiklat from "@/components/diklat/UpcomingDiklat"
import OtherDiklat from "@/components/diklat/OtherDiklat"
import Leadership from "@/components/landing/Leadership"
import Footer from "@/components/layout/Footer"
import Image from "next/image"

export default async function DiklatDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 
        Untuk sementara Hero tetap menggunakan yang lama. 
        Di masa depan, konten Hero bisa disesuaikan berdasarkan slug.
      */}
      <Hero />
      
      {/* Tentang Section - Spesifik untuk Diklat ini jika diperlukan */}
      <section id="tentang" className="py-24 bg-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-video relative rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl group">
              <Image 
                src="/pasaran.jpg" 
                alt="Pesantren Al-Hasanah" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-secondary mb-6">Detail Program <span className="text-primary italic">Diklat: {slug.toUpperCase()}</span></h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
              <p className="text-secondary/70 text-lg leading-relaxed mb-8">
                Pesantren Al-Hasanah Cibeuti menyelenggarakan program Diklat {slug.replace(/-/g, ' ')} sebagai bagian dari upaya pelestarian tradisi kitab kuning secara intensif dan sistematis.
              </p>
              <ul className="space-y-4">
                {[
                  "Kurikulum Terstruktur",
                  "Sanad Ilmu yang Bersambung",
                  "Fasilitas Belajar Memadai",
                  "Lingkungan Pesantren yang Asri"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-secondary/80 font-semibold">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <UpcomingDiklat />
      <OtherDiklat />
      <Leadership />

      <Footer />
    </main>
  )
}
