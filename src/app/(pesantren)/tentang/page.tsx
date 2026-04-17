import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import Image from "next/image"
import { Target, Eye, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Tentang Kami",
  description: "Sejarah, visi, dan misi Pondok Pesantren Al-Hasanah Cibeuti.",
}

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Tentang Al-Hasanah" 
        subtitle="Mengenal lebih dekat sejarah, visi, dan komitmen kami dalam dunia pendidikan Islam."
        breadcrumb={[{ label: "Tentang Kami", href: "/tentang" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        {/* Sejarah Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase">
              Sejarah <span className="text-primary italic">Pesantren</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full" />
            <p className="text-muted-foreground leading-relaxed text-lg font-medium">
              Pondok Pesantren Al-Hasanah Cibeuti didirikan dengan semangat untuk melestarikan tradisi keilmuan Islam klasik di tengah arus modernisasi. Berawal dari sebuah majelis taklim sederhana, kini Al-Hasanah telah berkembang menjadi pusat pendidikan yang diakui luas.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg font-medium">
              Dibawah bimbingan para ulama yang mumpuni, kami terus berinovasi dalam metode pengajaran tanpa meninggalkan esensi dari kitab kuning (Turats) yang menjadi fondasi utama keilmuan kami.
            </p>
          </div>
          <div className="flex-1 relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card">
            <Image 
              src="/pasaran.jpg" 
              alt="Sejarah Al-Hasanah" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Visi Misi Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="bg-card p-10 rounded-[3rem] border border-primary/5 shadow-xl">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">Visi</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Menjadi lembaga pendidikan Islam unggulan yang mencetak generasi rabbani, berakhlakul karimah, dan menguasai ilmu agama serta pengetahuan umum secara seimbang.
            </p>
          </div>
          <div className="bg-card p-10 rounded-[3rem] border border-primary/5 shadow-xl">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">Misi</h3>
            <ul className="space-y-4">
              {[
                "Menyelenggarakan pendidikan berbasis kitab kuning secara intensif.",
                "Membina karakter santri melalui pembiasaan akhlakul karimah.",
                "Mengembangkan potensi minat dan bakat santri.",
                "Menciptakan lingkungan belajar yang kondusif dan islami."
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {misi}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
