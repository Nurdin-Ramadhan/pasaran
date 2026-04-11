export type JenisDiklat = 'MULUD' | 'SYABAN' | 'RAMADHAN' | 'DZULHIJJAH';

export interface IPesertaDiklat {
  id: number;
  created_at: string;
  nama_lengkap: string;
  nama_wali: string;
  pekerjaan_wali: string;
  alamat_pesantren: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat_lengkap: string;
  no_telepon: string;
  pesantren_asal: string;
  jenis_diklat: JenisDiklat;
  tahun_diklat: number;
  biaya_pendaftaran: number;
  belanja_kitab_nominal: number;
  rincian_belanja: string;
  status_pembayaran: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  qr_code_id: string;
  dicatat_oleh: string;
}
