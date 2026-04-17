import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export const metadata = {
  title: "Kontak Kami",
  description: "Hubungi Pondok Pesantren Al-Hasanah Cibeuti untuk informasi lebih lanjut.",
}

export default function KontakPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Hubungi Kami" 
        subtitle="Kami siap melayani pertanyaan Anda seputar pendaftaran, program pendidikan, dan informasi lainnya."
        breadcrumb={[{ label: "Kontak", href: "/kontak" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card p-10 rounded-[3rem] border border-primary/5 shadow-xl">
              <h3 className="text-2xl font-black text-foreground mb-8 uppercase tracking-tight">Informasi <span className="text-primary italic">Kontak</span></h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1 uppercase text-xs tracking-widest">Alamat</div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      Jl. Cibeuti No. 123, Kel. Cibeuti, Kec. Kawalu, Kota Tasikmalaya, Jawa Barat 46182
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1 uppercase text-xs tracking-widest">Telepon</div>
                    <p className="text-muted-foreground text-sm font-medium">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1 uppercase text-xs tracking-widest">Email</div>
                    <p className="text-muted-foreground text-sm font-medium">info@alhasanah.sch.id</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1 uppercase text-xs tracking-widest">Jam Operasional</div>
                    <p className="text-muted-foreground text-sm font-medium">Setiap Hari: 08.00 - 17.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <h4 className="text-xl font-black mb-4 uppercase tracking-tight relative z-10">Layanan Cepat</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                Butuh respon cepat? Hubungi kami via WhatsApp untuk konsultasi pendaftaran santri baru.
              </p>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all relative z-10"
              >
                Chat via WhatsApp
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-[3rem] overflow-hidden border border-primary/5 shadow-xl aspect-[4/3] lg:aspect-auto lg:h-full relative min-h-[400px]">
              {/* TODO: Ganti dengan embed Google Maps asli */}
              <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-center p-12">
                <MapPin className="w-16 h-16 text-primary/20 mb-4" />
                <h4 className="text-xl font-black text-foreground mb-2 uppercase tracking-tight">Lokasi Pesantren</h4>
                <p className="text-muted-foreground font-medium max-w-sm">
                  Placeholder Google Maps. Hubungi admin untuk mendapatkan titik lokasi presisi via WhatsApp.
                </p>
                <div className="mt-8 w-full h-1 bg-primary/10 rounded-full" />
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.859664448557!2d108.2045!3d-7.3622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjEnNDQuMCJTIDEwOMKwMTInMTYuMiJF!5e0!3m2!1sen!2sid!4v1234567890123" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10 opacity-20 grayscale"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
