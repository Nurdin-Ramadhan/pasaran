import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import UpcomingDiklat from "@/components/diklat/UpcomingDiklat"
import OtherDiklat from "@/components/diklat/OtherDiklat"
import { getDiklatOverview } from "@/lib/diklat"

export const metadata = {
  title: "Program Diklat",
  description: "Informasi lengkap program Diklat (Pasaran/Kilatan) di Pondok Pesantren Al-Hasanah.",
}

export default async function DiklatListPage() {
  const { config, programs } = await getDiklatOverview()

  return (
    <>
      <Navbar />
      <PageHeader 
        title="Program Diklat" 
        subtitle="Dalami ilmu agama melalui program kajian kitab kuning intensif (Pasaran) di bawah bimbingan para Mualim kompeten."
        breadcrumb={[{ label: "Diklat", href: "/diklat" }]}
      />
      
      <main className="bg-background">
        <UpcomingDiklat config={config} programs={programs} />
        <OtherDiklat programs={programs} />
      </main>

      <Footer />
    </>
  )
}
