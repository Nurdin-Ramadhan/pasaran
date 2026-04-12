"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/20"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-secondary flex items-center gap-3 tracking-tighter">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
          Al-Hasanah 
        </Link>
        <div className="hidden md:flex gap-8 items-center font-medium text-secondary/80">
          <Link href="#tentang" className="hover:text-primary transition-colors">Tentang</Link>
          <Link href="#diklat" className="hover:text-primary transition-colors">Diklat</Link>
          <Link href="#pimpinan" className="hover:text-primary transition-colors">Pimpinan</Link>
          <Link 
            href="/daftar" 
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
