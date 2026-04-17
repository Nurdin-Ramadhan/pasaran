import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import { Book, Heart, Users, Star, GraduationCap, Laptop, Sparkles } from "lucide-react"

export const metadata = {
  title: "Program Pendidikan",
  description: "Kurikulum dan program unggulan di Pondok Pesantren Al-Hasanah.",
}

const programs = [
  {
    title: "Tahfidzul Qur'an",
    desc: "Program menghafal Al-Qur'an 30 juz dengan bimbingan makhraj dan tajwid yang fasih. Santri dibimbing secara privat oleh ustadz yang bersanad.",
    icon: Star,
    features: ["Setoran Harian", "Murojaah Terpimpin", "Ujian Kenaikan Juz"]
  },
  {
    title: "Kajian Kitab Kuning",
    desc: "Pendalaman literatur Islam klasik (Turats) dalam bidang Fiqih, Nahwu, Sharaf, Balaghah, Manthiq, dan Tauhid menggunakan metode sorogan dan bandongan.",
    icon: Book,
    features: ["Metode Sorogan", "Bandongan", "Bahstul Masa'il"]
  },
  {
    title: "Pendidikan Madrasah",
    desc: "Kurikulum formal yang terintegrasi dengan nilai-nilai kepesantrenan, membekali santri dengan pengetahuan umum yang luas.",
    icon: GraduationCap,
    features: ["Ijazah Negara", "Kurikulum Terintegrasi", "Fasilitas Modern"]
  },
  {
    title: "Bahasa Arab & Inggris",
    desc: "Program pengembangan kemampuan komunikasi internasional santri melalui bi'ah lughowiyyah (lingkungan berbahasa) yang konsisten.",
    icon: Sparkles,
    features: ["Daily Conversation", "Muhadharah", "Language Club"]
  },
  {
    title: "Teknologi & Informasi",
    desc: "Membekali santri dengan literasi digital dan keterampilan teknologi informasi untuk menghadapi tantangan zaman.",
    icon: Laptop,
    features: ["Web Dev Dasar", "Desain Grafis", "Literasi Digital"]
  },
  {
    title: "Kewirausahaan Santri",
    desc: "Pelatihan kemandirian ekonomi melalui praktik langsung di unit-unit usaha pesantren seperti pertanian dan retail.",
    icon: Users,
    features: ["Praktik Lapangan", "Manajemen Bisnis", "Kemandirian"]
  }
]

export default function ProgramPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Program Pendidikan" 
        subtitle="Sistem pendidikan terpadu yang menyelaraskan ilmu agama, pengetahuan umum, dan karakter."
        breadcrumb={[{ label: "Program", href: "/program" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <div 
              key={prog.title}
              className="bg-card border border-primary/5 p-10 rounded-[3rem] shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <prog.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                {prog.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                {prog.desc}
              </p>
              <div className="space-y-3">
                {prog.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-sm font-bold text-foreground/70">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
