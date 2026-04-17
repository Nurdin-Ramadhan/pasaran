import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Globe, Share2 } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-primary/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={50} height={50} className="drop-shadow-lg" />
              <span className="font-black text-xl tracking-tighter text-foreground uppercase">
                Al-Hasanah
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Membentuk generasi Qur'ani yang berilmu amaliyah dan beramal ilmiyah. 
              Pondok Pesantren Al-Hasanah Cibeuti berdedikasi tinggi dalam pendidikan Islam klasik dan modern.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <Share2 className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Main Navigation */}
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-primary">Navigasi</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Beranda</Link>
              </li>
              <li>
                <Link href="/tentang" className="text-muted-foreground hover:text-primary transition-colors font-medium">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/program" className="text-muted-foreground hover:text-primary transition-colors font-medium">Program Pendidikan</Link>
              </li>
              <li>
                <Link href="/fasilitas" className="text-muted-foreground hover:text-primary transition-colors font-medium">Fasilitas</Link>
              </li>
              <li>
                <Link href="/berita" className="text-muted-foreground hover:text-primary transition-colors font-medium">Berita & Artikel</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs & Diklat */}
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-primary">Program & Diklat</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/diklat" className="text-muted-foreground hover:text-primary transition-colors font-medium">Informasi Diklat</Link>
              </li>
              <li>
                <Link href="/diklat/pasaran-1447" className="text-muted-foreground hover:text-primary transition-colors font-medium">Diklat Pasaran 1447 H</Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="text-muted-foreground hover:text-primary transition-colors font-medium">Pendaftaran Santri</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Alumni</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-primary">Kontak</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <span className="text-muted-foreground font-medium">
                  Jl. Cibeuti No. 123, Kel. Cibeuti, Kec. Kawalu, Kota Tasikmalaya, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <span className="text-muted-foreground font-medium">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <span className="text-muted-foreground font-medium">info@alhasanah.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} Pondok Pesantren Al-Hasanah. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
