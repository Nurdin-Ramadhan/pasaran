import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: 'Pondok Pesantren Al-Hasanah Cibeuti — Lembaga pendidikan Islam klasik & modern yang berkhidmat untuk mencetak generasi beradab dan berilmu.',
  openGraph: {
    title: SITE_NAME,
    description: 'Lembaga pendidikan Islam klasik & modern di Tasikmalaya.',
    url: SITE_URL,
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_SHORT_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
