import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import StatistikSection from "@/components/pesantren/StatistikSection"
import AboutSection from "@/components/pesantren/AboutSection"
import ProgramSection from "@/components/pesantren/ProgramSection"
import Leadership from "@/components/landing/Leadership"
import FasilitasSection from "@/components/pesantren/FasilitasSection"
import UpcomingDiklat from "@/components/diklat/UpcomingDiklat"
import BeritaSection from "@/components/pesantren/BeritaSection"
import CTASection from "@/components/pesantren/CTASection"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. Hero Section (Pertahankan Persis) */}
      <Hero />
      
      {/* 2. Statistik Section (Baru) */}
      <StatistikSection />
      
      {/* 3. About Section (Baru - Ringkasan) */}
      <AboutSection />
      
      {/* 4. Program Section (Baru - Highlight Unggulan) */}
      <ProgramSection />
      
      {/* 5. Leadership Section (Pertahankan Persis) */}
      <Leadership />
      
      {/* 6. Fasilitas Section (Baru - Preview) */}
      <FasilitasSection />
      
      {/* 7. Upcoming Diklat (Pindahan) */}
      <UpcomingDiklat />
      
      {/* 8. Berita Section (Baru - 3 Berita Terbaru) */}
      <BeritaSection />
      
      {/* 9. CTA Section (Baru) */}
      <CTASection />
      
      {/* 10. Footer (Baru) */}
      <Footer />
    </main>
  )
}
