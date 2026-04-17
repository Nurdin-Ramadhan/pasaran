import Navbar from "@/components/landing/Navbar"
import PageHeader from "@/components/layout/PageHeader"
import Footer from "@/components/layout/Footer"
import UpcomingDiklat from "@/components/diklat/UpcomingDiklat"
import OtherDiklat from "@/components/diklat/OtherDiklat"

export const metadata = {
  title: "Program Diklat",
  description: "Informasi lengkap program Diklat (Pasaran/Kilatan) di Pondok Pesantren Al-Hasanah.",
}

export default function DiklatListPage() {
  return (
    <>
      <Navbar />
      <PageHeader 
        title="Program Diklat" 
        subtitle="Dalami ilmu agama melalui program kajian kitab kuning intensif (Pasaran) di bawah bimbingan para Mualim kompeten."
        breadcrumb={[{ label: "Diklat", href: "/diklat" }]}
      />
      
      <main className="bg-background">
        <UpcomingDiklat />
        <OtherDiklat />
      </main>

      <Footer />
    </>
  )
}
