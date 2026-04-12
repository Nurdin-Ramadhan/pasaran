import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { RegistrationValues } from "@/lib/validations/registration"

// Professional styling for enterprise look
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
  },
  // Header section
  headerContainer: {
    flexDirection: "row",
    borderBottom: 2,
    borderBottomColor: "#1A3C34",
    paddingBottom: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  orgTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A3C34",
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  orgSubtitle: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  orgContact: {
    fontSize: 8,
    color: "#888",
    fontStyle: "italic",
  },
  
  // Document title
  docTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: "black",
    color: "#1A3C34",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  docId: {
    textAlign: "right",
  },
  docIdLabel: {
    fontSize: 7,
    color: "#B8860B",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  docIdValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },

  // Main content layout (Two columns)
  mainContent: {
    flexDirection: "row",
    gap: 30,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    width: 200,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#B8860B",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottom: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 5,
    marginBottom: 10,
  },
  
  dataRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  dataLabel: {
    width: 90,
    fontSize: 8,
    color: "#999",
    fontWeight: "bold",
  },
  dataValue: {
    flex: 1,
    fontSize: 9,
    color: "#333",
    fontWeight: "medium",
  },

  // Finance table
  financeBox: {
    backgroundColor: "#fcfcfc",
    border: 1,
    borderColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
  },
  financeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingBottom: 4,
    borderBottom: 0.5,
    borderBottomColor: "#eee",
  },
  financeLabel: {
    fontSize: 8,
    color: "#666",
  },
  financeValue: {
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "Courier",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTop: 1.5,
    borderTopColor: "#1A3C34",
  },
  totalLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1A3C34",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A3C34",
    fontFamily: "Courier",
  },

  // Footer / Status
  statusBadge: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff9eb",
    border: 1,
    borderColor: "#ffeeba",
    borderRadius: 6,
    textAlign: "center",
  },
  statusText: {
    fontSize: 8,
    color: "#856404",
    fontWeight: "bold",
  },

  qrContainer: {
    marginTop: 40,
    padding: 15,
    border: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  qrCode: {
    width: 70,
    height: 70,
  },
  qrInfo: {
    flex: 1,
    marginLeft: 15,
  },
  qrTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1A3C34",
    marginBottom: 3,
  },
  qrDesc: {
    fontSize: 7,
    color: "#888",
    lineHeight: 1.4,
  },

  legalNote: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  legalTitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  legalText: {
    fontSize: 7,
    color: "#999",
    lineHeight: 1.5,
  },

  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 7,
    color: "#ccc",
  }
})

interface PDFProps {
  data: RegistrationValues;
  qrCodeId: string;
  qrCodeDataUrl: string;
}

export default function RegistrationReceipt({ data, qrCodeId, qrCodeDataUrl }: PDFProps) {
  // Logic to determine formatted date
  const printDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Use base64 or absolute path for local images in react-pdf
  // For this environment, we'll try to use the path from public
  const logoPath = "/home/arch-din1/Desktop/pasaran/public/logo.png";

  return (
    <Document title={`Pendaftaran_${data.nama_lengkap}`}>
      <Page size="A4" style={styles.page}>
        
        {/* Institutional Header */}
        <View style={styles.headerContainer}>
          <Image src={logoPath} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.orgTitle}>PONDOK PESANTREN AL-HASANAH CIBEUTI</Text>
            <Text style={styles.orgSubtitle}>KH. LILI SYAMSUL ROMLI - TASIKMALAYA</Text>
            <Text style={styles.orgContact}>
              Jl. Raya Cibeuti, Kawalu, Kota Tasikmalaya, Jawa Barat 46182 | WA: +62 8xx-xxxx-xxxx
            </Text>
          </View>
        </View>

        {/* Title & Document ID */}
        <View style={styles.docTitleContainer}>
          <View>
            <Text style={styles.docTitle}>Bukti Pendaftaran</Text>
            <Text style={{ fontSize: 9, color: '#B8860B', fontWeight: 'bold', marginTop: 5 }}>
              DIKLAT PASARAN {data.jenis_diklat} {data.tahun_diklat} H
            </Text>
          </View>
          <View style={styles.docId}>
            <Text style={styles.docIdLabel}>Nomor Registrasi</Text>
            <Text style={styles.docIdValue}>{qrCodeId.split('-')[0].toUpperCase()}</Text>
          </View>
        </View>

        {/* Main Content Areas */}
        <View style={styles.mainContent}>
          {/* Left: Participant Data */}
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Data Identitas Peserta</Text>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Nama Lengkap</Text>
                <Text style={styles.dataValue}>: {data.nama_lengkap}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Tempat, Tgl Lahir</Text>
                <Text style={styles.dataValue}>: {data.tempat_lahir}, {data.tanggal_lahir}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Nomor WhatsApp</Text>
                <Text style={styles.dataValue}>: {data.no_telepon}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Asal Pesantren</Text>
                <Text style={styles.dataValue}>: {data.pesantren_asal}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Nama Wali</Text>
                <Text style={styles.dataValue}>: {data.nama_wali}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Alamat Rumah</Text>
                <Text style={styles.dataValue}>: {data.alamat_lengkap}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status & Ketentuan</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>STATUS PENDAFTARAN: MENUNGGU PEMBAYARAN (PENDING)</Text>
              </View>
              
              <View style={styles.legalNote}>
                <Text style={styles.legalTitle}>INSTRUKSI LANJUTAN:</Text>
                <Text style={styles.legalText}>
                  1. Simpan bukti ini (Digital/Cetak) untuk ditunjukkan saat registrasi ulang di lokasi.{"\n"}
                  2. Pembayaran infaq pendaftaran dan kitab dilakukan secara tunai di Kantor Sekretariat Pesantren.{"\n"}
                  3. Perlengkapan alat tulis bisa bawa sendiri atau beli di kantor sekretariat.
                </Text>
              </View>
            </View>
          </View>

          {/* Right: Financial Summary */}
          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rincian Administrasi</Text>
              <View style={styles.financeBox}>
                <View style={styles.financeRow}>
                  <Text style={styles.financeLabel}>Infaq Miftah</Text>
                  <Text style={styles.financeValue}>Rp {(data.uang_miftah || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.financeRow}>
                  <Text style={styles.financeLabel}>Biaya Listrik</Text>
                  <Text style={styles.financeValue}>Rp {(data.biaya_listrik || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.financeRow}>
                  <Text style={styles.financeLabel}>Kos Makan</Text>
                  <Text style={styles.financeValue}>Rp {(data.kos_makan || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.financeRow}>
                  <Text style={styles.financeLabel}>Tafaruqon</Text>
                  <Text style={styles.financeValue}>Rp {(data.tafaruqon || 0).toLocaleString('id-ID')}</Text>
                </View>
                
                {data.belanja_kitab_nominal > 0 && (
                  <View style={{...styles.financeRow, marginTop: 8}}>
                    <Text style={{...styles.financeLabel, fontWeight: 'bold'}}>Belanja Kitab</Text>
                    <Text style={styles.financeValue}>Rp {data.belanja_kitab_nominal.toLocaleString('id-ID')}</Text>
                  </View>
                )}
                
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>TOTAL TAGIHAN</Text>
                  <Text style={styles.totalValue}>Rp {(data.biaya_pendaftaran + data.belanja_kitab_nominal).toLocaleString('id-ID')}</Text>
                </View>
              </View>
              
              {data.rincian_belanja && (
                <View style={{marginTop: 10, padding: 8}}>
                  <Text style={{fontSize: 7, color: '#999', fontWeight: 'bold', textTransform: 'uppercase'}}>Daftar Kitab:</Text>
                  <Text style={{fontSize: 7, color: '#666', marginTop: 3, fontStyle: 'italic'}}>{data.rincian_belanja}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* QR Code Verification Footer Area */}
        <View style={styles.qrContainer}>
          <Image src={qrCodeDataUrl} style={styles.qrCode} />
          <View style={styles.qrInfo}>
            <Text style={styles.qrTitle}>Digital Verification Signature</Text>
            <Text style={styles.qrDesc}>
              Dokumen ini diterbitkan secara otomatis oleh sistem Al-Hasanah. 
              Keaslian data dapat diverifikasi oleh pengurus melalui pemindaian kode unik di atas 
              pada sistem manajemen pusat.
            </Text>
            <Text style={{ fontSize: 7, color: '#1A3C34', fontWeight: 'bold', marginTop: 5 }}>
              Generated ID: {qrCodeId}
            </Text>
          </View>
        </View>

        {/* Footer Page Branding */}
        <Text style={styles.pageNumber}>
          Dicetak pada {printDate} | Sistem Informasi Pendaftaran Pesantren Al-Hasanah Cibeuti
        </Text>
      </Page>
    </Document>
  )
}
