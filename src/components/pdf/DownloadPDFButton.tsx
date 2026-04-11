"use client"

import { useState, useEffect } from "react"
import { pdf } from "@react-pdf/renderer"
import QRCode from "qrcode"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import { RegistrationValues } from "@/lib/validations/registration"
import RegistrationReceipt from "./RegistrationReceipt"
import { FileDown, Loader2 } from "lucide-react"

interface Props {
  data: RegistrationValues;
  qrCodeId: string;
}

export default function DownloadPDFButton({ data, qrCodeId }: Props) {
  const [loading, setLoading] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")

  useEffect(() => {
    // Generate QR Code data URL based on qrCodeId
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(qrCodeId, {
          margin: 1,
          width: 200,
          color: {
            dark: '#1A3C34', // Dark green matching branding
            light: '#FFFFFF',
          },
        })
        setQrCodeDataUrl(url)
      } catch (err) {
        console.error("QR Error", err)
      }
    }
    generateQR()
  }, [qrCodeId])

  const handleDownload = async () => {
    if (!qrCodeDataUrl) return
    setLoading(true)
    
    try {
      const blob = await pdf(
        <RegistrationReceipt 
          data={data} 
          qrCodeId={qrCodeId} 
          qrCodeDataUrl={qrCodeDataUrl} 
        />
      ).toBlob()
      
      saveAs(blob, `Pendaftaran-${data.nama_lengkap.replace(/\s+/g, "-")}.pdf`)
    } catch (error) {
      console.error("PDF Download Error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleDownload} 
      disabled={loading || !qrCodeDataUrl}
      className="bg-primary hover:bg-primary/90 text-white rounded-2xl py-6 px-10 h-auto font-bold text-lg shadow-xl shadow-primary/30 flex items-center gap-3 transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Menyiapkan PDF...
        </>
      ) : (
        <>
          <FileDown className="w-6 h-6" />
          Unduh Bukti Pendaftaran (PDF)
        </>
      )}
    </Button>
  )
}
