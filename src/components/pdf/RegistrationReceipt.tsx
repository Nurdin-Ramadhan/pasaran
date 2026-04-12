import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { RegistrationValues } from "@/lib/validations/registration"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    borderBottom: 2,
    borderBottomColor: "#B8860B", // Gold color
    paddingBottom: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A3C34", // Dark Green
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B8860B",
    marginBottom: 10,
    borderLeft: 3,
    borderLeftColor: "#B8860B",
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 4,
  },
  label: {
    width: 150,
    fontSize: 10,
    color: "#888888",
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: "#333333",
  },
  qrSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  qrInfo: {
    width: "60%",
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: 1,
    borderTopColor: "#eeeeee",
    paddingTop: 15,
  },
  footerText: {
    fontSize: 9,
    color: "#aaaaaa",
  }
})

interface PDFProps {
  data: RegistrationValues;
  qrCodeId: string;
  qrCodeDataUrl: string;
}

export default function RegistrationReceipt({ data, qrCodeId, qrCodeDataUrl }: PDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BUKTI PENDAFTARAN DIKLAT</Text>
          <Text style={styles.subtitle}>PESANTREN PASARAN - GELOMBANG {data.jenis_diklat}</Text>
        </View>

        {/* ID Pendaftaran */}
        <View style={{ marginBottom: 20, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 10, color: '#888' }}>ID PENDAFTARAN</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1A3C34' }}>{qrCodeId}</Text>
        </View>

        {/* Data Diri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IDENTITAS PESERTA</Text>
          <View style={styles.row}><Text style={styles.label}>Nama Lengkap</Text><Text style={styles.value}>{data.nama_lengkap}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Tempat, Tgl Lahir</Text><Text style={styles.value}>{data.tempat_lahir}, {data.tanggal_lahir}</Text></View>
          <View style={styles.row}><Text style={styles.label}>No. Telepon</Text><Text style={styles.value}>{data.no_telepon}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Alamat Lengkap</Text><Text style={styles.value}>{data.alamat_lengkap}</Text></View>
        </View>

        {/* Data Wali */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA WALI & ASAL</Text>
          <View style={styles.row}><Text style={styles.label}>Nama Wali</Text><Text style={styles.value}>{data.nama_wali}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Pesantren Asal</Text><Text style={styles.value}>{data.pesantren_asal}</Text></View>
        </View>

        {/* Rincian Diklat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RINCIAN PROGRAM & BIAYA</Text>
          <View style={styles.row}><Text style={styles.label}>Jenis Diklat</Text><Text style={styles.value}>{data.jenis_diklat} {data.tahun_diklat}</Text></View>
          
          <View style={{ marginTop: 10, paddingLeft: 10, borderLeft: 2, borderLeftColor: '#eeeeee' }}>
            <View style={styles.row}><Text style={styles.label}>Uang Miftah</Text><Text style={styles.value}>Rp {(data.uang_miftah || 0).toLocaleString('id-ID')}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Biaya Listrik</Text><Text style={styles.value}>Rp {(data.biaya_listrik || 0).toLocaleString('id-ID')}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Kos Makan</Text><Text style={styles.value}>Rp {(data.kos_makan || 0).toLocaleString('id-ID')}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Tafaruqon</Text><Text style={styles.value}>Rp {(data.tafaruqon || 0).toLocaleString('id-ID')}</Text></View>
          </View>
          
          <View style={{ ...styles.row, borderBottom: 2, borderBottomColor: '#B8860B', marginTop: 5 }}>
            <Text style={{ ...styles.label, color: '#1A3C34', fontWeight: 'bold' }}>TOTAL PENDAFTARAN</Text>
            <Text style={{ ...styles.value, fontWeight: 'bold', fontSize: 13, color: '#1A3C34' }}>
              Rp {data.biaya_pendaftaran.toLocaleString('id-ID')}
            </Text>
          </View>
          
          {data.belanja_kitab_nominal > 0 && (
            <View style={{ ...styles.row, marginTop: 10 }}>
              <Text style={styles.label}>Belanja Kitab</Text>
              <Text style={styles.value}>Rp {data.belanja_kitab_nominal.toLocaleString('id-ID')}</Text>
            </View>
          )}
          <View style={styles.row}><Text style={styles.label}>Rincian Kitab</Text><Text style={styles.value}>{data.rincian_belanja || "-"}</Text></View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <View style={styles.qrInfo}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Verifikasi Pendaftaran</Text>
            <Text style={{ fontSize: 9, color: '#666', lineHeight: 1.4 }}>
              Tunjukkan QR Code ini kepada pengurus pesantren saat kedatangan untuk proses konfirmasi manual dan aktivasi status kepesertaan.
            </Text>
          </View>
          <Image src={qrCodeDataUrl} style={styles.qrCode} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dicetak secara otomatis oleh Sistem Pendaftaran Pasaran pada {new Date().toLocaleDateString('id-ID')}</Text>
          <Text style={{ ...styles.footerText, marginTop: 5 }}>Simpan dokumen ini baik-baik sebagai syarat mengikuti diklat.</Text>
        </View>
      </Page>
    </Document>
  )
}
