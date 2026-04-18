import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Pondok Pesantren Al-Hasanah Cibeuti',
    template: '%s | Pondok Pesantren Al-Hasanah',
  },
  description: 'Pondok Pesantren Al-Hasanah Cibeuti — Lembaga pendidikan Islam klasik & modern yang berkhidmat untuk mencetak generasi beradab dan berilmu.',
  openGraph: {
    title: 'Pondok Pesantren Al-Hasanah Cibeuti',
    description: 'Lembaga pendidikan Islam klasik & modern di Tasikmalaya.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Pondok Pesantren Al-Hasanah',
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
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
