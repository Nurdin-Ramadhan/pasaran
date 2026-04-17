import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import { Languages, Quote, Brain, Compass, Scale, History, ScrollText, GraduationCap, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Kajian Kitab Kuning",
  description: "Kurikulum dan daftar kajian kitab (Fan) di Pondok Pesantren Al-Hasanah.",
}

const fanKitabs = [
  {
    fan: "Fan Nahwu & Shorof",
    icon: Languages,
    desc: "Ilmu tata bahasa Arab dasar dan perubahan kata untuk memahami teks kitab suci dan literatur klasik.",
    kitabs: ["Jurumia 'Asymawi", "Nadzom Imrity", "Sorof Zanzani", "Nadzmul Maqshud"],
    color: "bg-amber-500/10 text-amber-600"
  },
  {
    fan: "Fan Bilaghah",
    icon: Quote,
    desc: "Kajian tentang keindahan bahasa, retorika, dan sastra Arab untuk memahami mukjizat Al-Qur'an.",
    kitabs: ["Jauharul Maknun", "Uqudul Juman", "Samarqondy & Nadzomnya"],
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    fan: "Fan Mantiq",
    icon: Brain,
    desc: "Ilmu logika dan kaidah berpikir sistematis untuk menjaga akal dari kesalahan dalam berargumen.",
    kitabs: ["Sullamul Munawraq", "Syamsiyyah"],
    color: "bg-indigo-500/10 text-indigo-600"
  },
  {
    fan: "Fan Falak",
    icon: Compass,
    desc: "Ilmu astronomi Islam untuk menentukan waktu shalat, arah kiblat, dan penanggalan hijriyah.",
    kitabs: ["Sulamul Munairain", "Fathul Rouful Mannan", "Taqribul Maqshod", "Durusul Falakiyah", "Badi'atul Mitsal", "Hisab Ephemeris", "Hisab Waktu Sholat", "Arah Qiblat", "Ru'yatul Hilal"],
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    fan: "Fan Fiqih",
    icon: Scale,
    desc: "Kajian hukum Islam praktis terkait ibadah, muamalah, hingga urusan rumah tangga dan sosial.",
    kitabs: ["Safinatun Najah", "I'anatu Thalibin", "Sarqawi"],
    color: "bg-rose-500/10 text-rose-600"
  },
  {
    fan: "Fan Ushul Fiqih",
    icon: GraduationCap,
    desc: "Ilmu tentang dasar-dasar dan metodologi pengambilan hukum Islam dari sumber aslinya.",
    kitabs: ["Waraqat", "Lathoiful Isyarah", "Jam'ul Jawami"],
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    fan: "Fan Hadis",
    icon: History,
    desc: "Kajian mendalam tentang sabda, perbuatan, dan ketetapan Nabi Muhammad SAW serta ilmu sanadnya.",
    kitabs: ["Sohih Bukhari", "Musthalat Hadis (Baiquniyyah)"],
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    fan: "Fan Lainnya",
    icon: ScrollText,
    desc: "Berbagai cabang ilmu pendukung seperti ilmu waris, perbandingan argumen, dan pengukuran syar'i.",
    kitabs: ["Munadzarah (Al-Waladiyah)", "Faroid (Ar-Rohbiyah)", "Maqodir (Fathul Qodir)"],
    color: "bg-cyan-500/10 text-cyan-600"
  }
]

export default function ProgramPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Kajian Kitab Kuning" 
        subtitle="Kurikulum pendidikan salafiyah yang menjaga sanad keilmuan melalui kajian mendalam berbagai cabang ilmu Islam klasik."
        breadcrumb={[{ label: "Kajian Kitab", href: "/program" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {fanKitabs.map((item, i) => (
            <div 
              key={item.fan}
              className="bg-card border border-primary/5 p-10 rounded-[3rem] shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group flex flex-col"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                {item.fan}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                {item.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-primary/10">
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-4">Daftar Kitab Utama:</div>
                <div className="grid grid-cols-1 gap-3">
                  {item.kitabs.map((kitab) => (
                    <div key={kitab} className="flex items-start gap-3 text-sm font-bold text-foreground/80 italic">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {kitab}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
