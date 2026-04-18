import { createClient } from "@/utils/supabase/server"
import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Tag, User } from "lucide-react"
import { BeritaItem } from "@/types/pesantren"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: news } = await supabase
    .from('berita')
    .select('judul, ringkasan')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .single()

  if (!news) return { title: 'Berita Tidak Ditemukan' }

  return {
    title: news.judul,
    description: news.ringkasan,
  }
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news, error } = await supabase
    .from('berita')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .single()

  if (error || !news) {
    notFound()
  }

  const item = news as BeritaItem

  return (
    <>
      <Navbar />
      <PageHeader 
        title={item.judul} 
        subtitle={item.ringkasan || ""}
        breadcrumb={[
          { label: "Berita", href: "/berita" },
          { label: "Detail Berita", href: `/berita/${item.slug}` }
        ]}
      />
      
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-primary/10">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(item.tanggal_publish).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold">
              <Tag className="w-4 h-4 text-primary" />
              {item.kategori}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold">
              <User className="w-4 h-4 text-primary" />
              Penulis: Admin
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-8 border-card">
            <Image 
              src={item.thumbnail_url || "/pasaran.jpg"} 
              alt={item.judul} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:font-medium prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.konten || "" }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
