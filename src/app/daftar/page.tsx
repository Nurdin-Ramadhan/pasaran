import RegistrationForm from "@/components/forms/RegistrationForm"
import Navbar from "@/components/landing/Navbar"

export default function DaftarPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto pt-32 pb-24 relative z-10">
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4">Mulai Perjalanan <span className="text-primary italic">Ilmiah Anda</span></h1>
          <p className="text-secondary/60 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Silakan lengkapi formulir di bawah ini. Pastikan nomor WhatsApp yang Anda masukkan aktif untuk keperluan koordinasi.
          </p>
        </div>
        
        <RegistrationForm />
      </div>

      <footer className="py-12 bg-white border-t border-secondary/10 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-secondary/50 font-medium">
            © {new Date().getFullYear()} Pesantren Pasaran. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </main>
  )
}
