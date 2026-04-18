import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Tag, Newspaper } from "lucide-react"
import { BeritaItem } from "@/types/pesantren"

export default async function BeritaSection() {
  const supabase = await createClient()

  // Ambil 3 berita terbaru yang PUBLISHED
  const { data: news, error } = await supabase
    .from('berita')
    .select('*')
    .eq('status', 'PUBLISHED')
    .order('tanggal_publish', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching news for section:', error)
  }

  const newsList = (news as BeritaItem[]) || []

  return (
    <section className="py-24 bg-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Kabar Terbaru</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
              Berita & <span className="text-primary italic">Kegiatan</span>
            </h2>
          </div>
          {newsList.length > 0 && (
            <Link href="/berita" className="hidden md:flex items-center gap-2 text-primary font-bold group">
              Lihat Semua Berita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsList.map((item, index) => (
              <article
                key={item.id}
                className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-primary/5 flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={item.thumbnail_url || "/pasaran.jpg"} 
                    alt={item.judul} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      {item.kategori}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-4">
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
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
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
          <div className="text-center py-10 flex flex-col items-center">
            <Newspaper className="w-16 h-16 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Belum Ada Berita Terbaru</p>
          </div>
        )}

        {newsList.length > 0 && (
          <div className="mt-12 text-center md:hidden">
            <Link href="/berita" className="inline-flex items-center gap-2 text-primary font-bold group border-b-2 border-primary/20 pb-1">
              Lihat Semua Berita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
