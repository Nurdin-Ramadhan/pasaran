import { createClient } from "@/utils/supabase/server"
import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowRight, Newspaper } from "lucide-react"
import { BeritaItem } from "@/types/pesantren"

export const metadata = {
  title: "Berita & Kegiatan",
  description: "Kumpulan berita, pengumuman, dan catatan kegiatan Pondok Pesantren Al-Hasanah.",
}

export default async function BeritaPage() {
  const supabase = await createClient()

  // Ambil hanya yang PUBLISHED dan urutkan berdasarkan tanggal publish terbaru
  const { data: news, error } = await supabase
    .from('berita')
    .select('*')
    .eq('status', 'PUBLISHED')
    .order('tanggal_publish', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
  }

  const newsList = (news as BeritaItem[]) || []

  return (
    <>
      <Navbar />
      <PageHeader 
        title="Berita & Kegiatan" 
        subtitle="Informasi terbaru seputar pengumuman, prestasi, dan ragam aktivitas santri di Al-Hasanah."
        breadcrumb={[{ label: "Berita", href: "/berita" }]}
      />
      
      <main className="container mx-auto px-6 py-20">
        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsList.map((item, i) => (
              <article 
                key={item.id}
                className="bg-card rounded-[3rem] overflow-hidden shadow-xl border border-primary/5 flex flex-col group"
              >
                <div className="relative aspect-video">
                  <Image 
                    src={item.thumbnail_url || "/pasaran.jpg"} 
                    alt={item.judul} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      {item.kategori}
                    </div>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-6">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(item.tanggal_publish).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-4 leading-tight uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 font-medium line-clamp-3">
                    {item.ringkasan}
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
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <Newspaper className="w-20 h-20 text-muted-foreground mb-6 opacity-20" />
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Belum Ada Berita</h3>
            <p className="text-muted-foreground font-medium">Nantikan informasi terbaru dari Pondok Pesantren Al-Hasanah.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
