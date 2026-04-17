"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatItemProps {
  label: string
  value: number
  suffix?: string
  index: number
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 30 })
  const displayValue = useTransform(spring, (current) => Math.floor(current).toLocaleString())

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, value, spring])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}

const stats = [
  { label: "Total Santri", value: 1250, suffix: "+" },
  { label: "Tahun Berdiri", value: 1995, suffix: "" },
  { label: "Alumni Tersebar", value: 5000, suffix: "+" },
  { label: "Tenaga Pengajar", value: 85, suffix: "+" },
]

export default function StatistikSection() {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-black text-primary mb-2 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs group-hover:text-white transition-colors">
                {stat.label}
              </div>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "24px" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="h-1 bg-primary mx-auto mt-4 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
