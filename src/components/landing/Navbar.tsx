"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-foreground flex items-center gap-3 tracking-tighter hover:scale-105 transition-transform">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain dark:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          PASARAN
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 items-center font-medium text-foreground/80">
            <Link href="#tentang" className="hover:text-primary transition-colors">Tentang</Link>
            <Link href="#diklat" className="hover:text-primary transition-colors">Diklat</Link>
            <Link href="#pimpinan" className="hover:text-primary transition-colors">Pimpinan</Link>
            <Link 
              href="/daftar" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] dark:hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-all font-bold"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
