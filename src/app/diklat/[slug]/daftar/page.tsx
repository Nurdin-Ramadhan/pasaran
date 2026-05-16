import RegistrationForm from "@/components/forms/RegistrationForm"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/layout/Footer"
import { DIKLAT_LABELS, jenisFromSlug } from "@/lib/diklat-shared"

export default async function DiklatDaftarPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const diklatLabel = DIKLAT_LABELS[jenisFromSlug(slug) ?? "DZULHIJJAH"]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto pt-48 pb-24 relative z-10">
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 uppercase tracking-tighter">
            Pendaftaran <span className="text-primary italic">Diklat {diklatLabel}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Silakan lengkapi formulir di bawah ini untuk mendaftar pada program diklat pilihan Anda. 
            Pastikan data yang dimasukkan valid dan dapat dipertanggungjawabkan.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-card rounded-[3rem] p-8 md:p-12 shadow-2xl border border-border">
          <RegistrationForm initialJenisDiklat="DZULHIJJAH" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
