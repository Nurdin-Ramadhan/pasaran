import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { RegistrationValues } from "@/lib/validations/registration"

// Registrasi Font (Opsional jika ingin lebih premium, namun Helvetica adalah safe default)
// Kita gunakan styling yang kuat pada Helvetica untuk hasil profesional

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    color: "#2D3436",
  },
  // Background Decorator
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "#1A3C34",
  },
  
  // Header section
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#E0E0E0",
  },
  logo: {
    width: 65,
    height: 65,
  },
  headerInfo: {
    marginLeft: 20,
    flex: 1,
  },
  orgTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3C34",
    letterSpacing: 1,
  },
  orgSubtitle: {
    fontSize: 11,
    color: "#B8860B",
    marginTop: 2,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  orgContact: {
    fontSize: 8,
    color: "#636E72",
    marginTop: 4,
    lineHeight: 1.4,
  },
  
  // Title & ID Section
  docHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 30,
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 10,
  },
  titleWrapper: {
    flex: 1,
  },
  docTitle: {
    fontSize: 22,
    fontWeight: "heavy",
    color: "#1A3C34",
    textTransform: "uppercase",
  },
  docSubtitle: {
    fontSize: 9,
    color: "#B8860B",
    fontWeight: "bold",
    marginTop: 4,
    letterSpacing: 1,
  },
  regIdBox: {
    textAlign: "right",
  },
  regLabel: {
    fontSize: 7,
    color: "#B2BEC3",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  regValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D3436",
  },

  // Content Layout
  contentGrid: {
    flexDirection: "row",
    gap: 25,
  },
  leftCol: {
    flex: 1.4,
  },
  rightCol: {
    flex: 1,
  },

  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    backgroundColor: "#1A3C34",
    padding: 6,
    paddingLeft: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  
  // Personal Data Table
  infoRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F2F6",
  },
  infoLabel: {
    width: 100,
    fontSize: 8,
    color: "#636E72",
    fontWeight: "bold",
  },
  infoValue: {
    flex: 1,
    fontSize: 9,
    color: "#2D3436",
    fontWeight: "medium",
  },

  // Financial Table
  table: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    border: 1,
    borderColor: "#E0E0E0",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F1F2F6",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottom: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1A3C34",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottom: 0.5,
    borderBottomColor: "#F1F2F6",
  },
  tableCellLabel: {
    flex: 1,
    fontSize: 8,
    color: "#636E72",
  },
  tableCellValue: {
    width: 80,
    fontSize: 8,
    textAlign: "right",
    fontWeight: "bold",
    color: "#2D3436",
  },
  tableTotal: {
    flexDirection: "row",
    backgroundColor: "#1A3C34",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  tableTotalLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tableTotalValue: {
    width: 100,
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "right",
  },

  // Status & Note
  statusBox: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FFF9EB",
    borderLeftWidth: 4,
    borderLeftColor: "#F39C12",
    borderRadius: 4,
  },
  statusTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#7D5D06",
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 7,
    color: "#996B00",
    lineHeight: 1.4,
  },

  // Verification Area
  footerSection: {
    marginTop: "auto",
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 10,
    borderRadius: 8,
    width: 280,
  },
  qrImg: {
    width: 60,
    height: 60,
  },
  qrInfo: {
    marginLeft: 12,
    flex: 1,
  },
  qrTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1A3C34",
  },
  qrText: {
    fontSize: 7,
    color: "#636E72",
    marginTop: 2,
    lineHeight: 1.3,
  },
  signatureBox: {
    width: 150,
    textAlign: "center",
  },
  sigLabel: {
    fontSize: 8,
    color: "#636E72",
    marginBottom: 40,
  },
  sigName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1A3C34",
    borderBottom: 1,
    borderBottomColor: "#1A3C34",
    paddingBottom: 2,
  },
  sigTitle: {
    fontSize: 7,
    color: "#B2BEC3",
    marginTop: 2,
  },

  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 7,
    color: "#B2BEC3",
    textTransform: "uppercase",
    letterSpacing: 1,
  }
})

interface PDFProps {
  data: RegistrationValues;
  qrCodeId: string;
  qrCodeDataUrl: string;
}

export default function RegistrationReceipt({ data, qrCodeId, qrCodeDataUrl }: PDFProps) {
  const printDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const logoPath = "/logo.png";

  return (
    <Document title={`Pendaftaran_${data.nama_lengkap}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.topAccent} />
        
        {/* Header Institution */}
        <View style={styles.headerContainer}>
          <Image src={logoPath} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.orgTitle}>PONDOK PESANTREN AL-HASANAH</Text>
            <Text style={styles.orgSubtitle}>Kp. Cibeuti RT.01 RW.01 Kel. Cibeuti Kec. Kawalu Kota Tasikmalaya</Text>
            <Text style={styles.orgContact}>
              Jawa Barat 46182 | WhatsApp: +62 8xx-xxxx-xxxx | Website: alhasanah.org
            </Text>
          </View>
        </View>

        {/* Document Header */}
        <View style={styles.docHeader}>
          <View style={styles.titleWrapper}>
            <Text style={styles.docTitle}>Bukti Pendaftaran</Text>
            <Text style={styles.docSubtitle}>DIKLAT PASARAN {data.jenis_diklat} {data.tahun_diklat} HIJRIAH</Text>
          </View>
          <View style={styles.regIdBox}>
            <Text style={styles.regLabel}>Registration Number</Text>
            <Text style={styles.regValue}>#{qrCodeId.split('-')[0].toUpperCase()}</Text>
          </View>
        </View>

        {/* Main Grid */}
        <View style={styles.contentGrid}>
          {/* Left Column: Identities */}
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Data Identitas Peserta</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nama Lengkap</Text>
                <Text style={styles.infoValue}>{data.nama_lengkap}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tempat, Tgl Lahir</Text>
                <Text style={styles.infoValue}>{data.tempat_lahir}, {data.tanggal_lahir}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>WhatsApp</Text>
                <Text style={styles.infoValue}>{data.no_telepon}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Asal Pesantren</Text>
                <Text style={styles.infoValue}>{data.pesantren_asal}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nama Wali</Text>
                <Text style={styles.infoValue}>{data.nama_wali}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Alamat Lengkap</Text>
                <Text style={styles.infoValue}>{data.alamat_lengkap}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Informasi Penting</Text>
              </View>
              <View style={styles.statusBox}>
                <Text style={styles.statusTitle}>STATUS: TERDAFTAR (UNPAID)</Text>
                <Text style={styles.statusDesc}>
                  Silakan lakukan pembayaran administrasi di kantor sekretariat Pondok Pesantren 
                  Al-Hasanah pada saat kedatangan atau melalui panitia yang bertugas.
                </Text>
              </View>
              <Text style={{fontSize: 7, color: '#999', marginTop: 10, lineHeight: 1.4}}>
                * Harap membawa bukti cetak atau tunjukkan file digital ini kepada petugas pendaftaran di lokasi untuk proses verifikasi data dan pengambilan kitab.
              </Text>
            </View>
          </View>

          {/* Right Column: Billing */}
          <View style={styles.rightCol}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Rincian Biaya</Text>
              </View>
              
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={{...styles.tableHeaderText, flex: 1}}>Keterangan</Text>
                  <Text style={styles.tableHeaderText}>Jumlah</Text>
                </View>
                
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Infaq Miftah</Text>
                  <Text style={styles.tableCellValue}>{(data.uang_miftah || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Biaya Listrik</Text>
                  <Text style={styles.tableCellValue}>{(data.biaya_listrik || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Kos Makan</Text>
                  <Text style={styles.tableCellValue}>{(data.kos_makan || 0).toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Tafaruqon</Text>
                  <Text style={styles.tableCellValue}>{(data.tafaruqon || 0).toLocaleString('id-ID')}</Text>
                </View>
                
                {data.belanja_kitab_nominal > 0 && (
                  <View style={styles.tableRow}>
                    <Text style={{...styles.tableCellLabel, color: '#B8860B', fontWeight: 'bold'}}>Total Kitab</Text>
                    <Text style={styles.tableCellValue}>{data.belanja_kitab_nominal.toLocaleString('id-ID')}</Text>
                  </View>
                )}
                
                <View style={styles.tableTotal}>
                  <Text style={styles.tableTotalLabel}>GRAND TOTAL</Text>
                  <Text style={styles.tableTotalValue}>
                    Rp {(data.biaya_pendaftaran + data.belanja_kitab_nominal).toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>

              {data.rincian_belanja && (
                <View style={{marginTop: 10, padding: 8, backgroundColor: '#F8F9FA', borderRadius: 4}}>
                  <Text style={{fontSize: 7, color: '#1A3C34', fontWeight: 'bold', textTransform: 'uppercase'}}>Rincian Kitab:</Text>
                  <Text style={{fontSize: 7, color: '#636E72', marginTop: 3, fontStyle: 'italic', lineHeight: 1.2}}>
                    {data.rincian_belanja}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Footer: QR & Verification */}
        <View style={styles.footerSection}>
          <View style={styles.qrWrapper}>
            <Image src={qrCodeDataUrl} style={styles.qrImg} />
            <View style={styles.qrInfo}>
              <Text style={styles.qrTitle}>VERIFIKASI DIGITAL</Text>
              <Text style={styles.qrText}>
                QR-Code ini bisa digunakan untuk memverifikasi data pendaftaran pada database pusat Al-Hasanah.
              </Text>
              <Text style={{fontSize: 6, color: '#B2BEC3', marginTop: 4}}>VERIFIED ID: {qrCodeId}</Text>
            </View>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.sigLabel}>Petunjuk Sekretariat,</Text>
            <Text style={styles.sigName}>Panitia Diklat</Text>
            <Text style={styles.sigTitle}>Sistem Pasaran Digital</Text>
          </View>
        </View>

        <Text style={styles.pageNumber}>
          Dokumen Sah diterbitkan oleh Sistem Informasi Al-Hasanah | {printDate}
        </Text>
      </Page>
    </Document>
  )
}
