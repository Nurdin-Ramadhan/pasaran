"use client"

import { motion } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Breadcrumb {
  label: string
  href: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: Breadcrumb[]
  className?: string
}

export default function PageHeader({ title, subtitle, breadcrumb, className }: PageHeaderProps) {
  return (
    <section className={cn("relative pt-40 pb-20 overflow-hidden bg-background", className)}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mb-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </Link>
            {breadcrumb?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary/40" />
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-primary transition-colors",
                    index === breadcrumb.length - 1 ? "text-primary font-bold" : ""
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tighter uppercase">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              {subtitle}
            </p>
          )}

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
