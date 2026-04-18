"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  School, 
  Users, 
  History, 
  Target, 
  BookOpen, 
  Activity, 
  Trophy, 
  Calendar, 
  Archive, 
  UserPlus,
  ArrowRight,
  Globe,
  MessageSquare,
  Building2,
  Newspaper
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Menu Structure
const menuItems = [
  { label: "Beranda", href: "/" },
  { 
    label: "Tentang", 
    href: "/tentang",
    children: [
      { label: "Profil Pesantren", href: "/tentang", desc: "Mengenal Al-Hasanah lebih dekat", icon: School },
      { label: "Pengasuh", href: "/tentang", desc: "Pimpinan dan dewan kiyai", icon: Users },
      { label: "Sejarah", href: "/tentang", desc: "Perjalanan dan latar belakang", icon: History },
      { label: "Visi & Misi", href: "/tentang", desc: "Tujuan dan arah pendidikan", icon: Target },
    ]
  },
  { 
    label: "Program", 
    href: "/program",
    children: [
      { label: "Kurikulum", href: "/program", desc: "Sistem pendidikan terpadu", icon: BookOpen },
      { label: "Kegiatan Harian", href: "/program", desc: "Aktivitas harian santri", icon: Activity },
      { label: "Kajian Kitab", href: "/program", desc: "Daftar kitab yang dikaji", icon: Trophy },
    ]
  },
  { 
    label: "Diklat", 
    href: "/diklat",
    children: [
      { label: "Diklat Aktif", href: "/diklat", desc: "Program yang sedang berjalan", icon: Calendar },
      { label: "Arsip Diklat", href: "/diklat", desc: "Dokumentasi program lampau", icon: Archive },
      { label: "Daftar Sekarang", href: "/diklat", desc: "Gabung program diklat kami", icon: UserPlus },
    ]
  },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  if (!mounted) return null

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-lg py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={45} 
                height={45} 
                className="relative z-10 w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl tracking-tighter text-foreground leading-none">
                AL-HASANAH
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-primary tracking-[0.3em] uppercase leading-tight">
                Media Al-hasanah
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button 
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-primary/5",
                      pathname.startsWith(item.href) && item.href !== "/" 
                        ? "text-primary" 
                        : "text-foreground/80"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.label && "rotate-180"
                    )} />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold transition-all hover:text-primary overflow-hidden group",
                      pathname === item.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 bg-primary transform transition-transform duration-300 origin-left",
                      pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )} />
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]"
                    >
                      <div className="bg-card border border-primary/10 rounded-[2rem] shadow-2xl overflow-hidden p-4 grid grid-cols-1 gap-2">
                        {item.children.map((child) => (
                          <Link 
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-all group"
                          >
                            <div className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                              <child.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground text-sm leading-none mb-1 group-hover:text-primary transition-colors">
                                {child.label}
                              </div>
                              <div className="text-muted-foreground text-[10px] leading-tight">
                                {child.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/daftar" 
              className="hidden md:flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-secondary/20"
            >
              Daftar Santri
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button 
              className="lg:hidden p-2.5 rounded-xl bg-primary/10 text-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-card z-[70] shadow-2xl border-l border-primary/10 flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-primary/10">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Logo" width={40} height={40} />
                  <span className="font-black text-lg tracking-tighter">AL-HASANAH</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-primary/10 text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    {item.children ? (
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-xs font-black text-primary uppercase tracking-widest bg-primary/5 rounded-lg">
                          {item.label}
                        </div>
                        <div className="grid grid-cols-1 gap-1 pl-2">
                          {item.children.map((child) => (
                            <Link 
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all"
                            >
                              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <child.icon className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-xl font-bold transition-all",
                          pathname === item.href 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "hover:bg-primary/5 text-foreground/80"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-primary/10">
                <Link 
                  href="/daftar" 
                  className="flex items-center justify-center gap-3 bg-secondary text-secondary-foreground w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl"
                >
                  Daftar Santri
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
