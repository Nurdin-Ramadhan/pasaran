import Image from "next/image"
import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import UpcomingDiklat from "@/components/landing/UpcomingDiklat"
import Leadership from "@/components/landing/Leadership"
import OtherDiklat from "@/components/landing/OtherDiklat"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Tentang Section */}
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
              <h2 className="text-4xl font-bold text-secondary mb-6">Tentang <span className="text-primary italic">Pesantren Al-Hasanah</span></h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
              <p className="text-secondary/70 text-lg leading-relaxed mb-8">
                Pesantren Al-Hasanah Cibeuti adalah pusat pendidikan Islam klasik yang berfokus pada pelestarian tradisi kitab kuning dengan metode intensif. Kami menyelenggarakan program Diklat Pasaran berkala untuk mendalami ilmu agama bagi santri dan masyarakat umum.
              </p>
              <ul className="space-y-4">
                {[
                  "Pengajaran Kitab Kuning Otentik",
                  "Dibimbing Langsung oleh Dewan Kiyai",
                  "Lingkungan Belajar Khidmat di Al-Hasanah",
                  "Sertifikasi Diklat Resmi Pesantren"
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

      {/* Footer / Kontak */}
      <footer className="py-24 bg-secondary text-white border-t border-primary/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
            <div>
              <h4 className="text-2xl font-black text-primary mb-8 uppercase tracking-widest">AL-HASANAH</h4>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Pondok Pesantren Al-Hasanah Cibeuti, KH. Lili Syamsul Romli. Berkhidmat untuk mencetak generasi berilmu dan beradab melalui tradisi kitab kuning.
              </p>
            </div>
            <div className="space-y-6">
              <h5 className="text-lg font-bold uppercase tracking-widest mb-4">Lokasi & Alamat</h5>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white/60 text-sm leading-relaxed">
                  Jl. Raya Cibeuti Rt. 001 / Rw. 006 Kel. Cibeuti Kec. Kawalu Kota. Tasikmalaya Jawa Barat (46182)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p className="text-white/60 text-sm">+62 8xx-xxxx-xxxx</p>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-lg font-bold uppercase tracking-widest mb-4">Sekretariat</h5>
              <p className="text-white/60 text-sm leading-relaxed">
                Kitab takriran, alat tulis, dan pendaftaran offline tersedia di Kantor Sekretariat Putra & Putri Pesantren Al-Hasanah.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">FB</div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">IG</div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">WA</div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Pesantren Al-Hasanah Cibeuti. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
