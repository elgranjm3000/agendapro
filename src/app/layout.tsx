import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgendaPro - Gestión de Citas Simple y Elegante',
  description: 'La plataforma todo-en-uno para gestionar tu negocio de servicios. Programa citas, cobra pagos y haz crecer tu negocio sin complicaciones.',
  keywords: 'agenda, citas, reservas, negocio, servicios, peluquería, spa, clínica',
  authors: [{ name: 'AgendaPro Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AgendaPro - Gestión de Citas Simple y Elegante',
    description: 'Transforma la gestión de tu negocio con nuestra plataforma intuitiva y poderosa.',
    url: 'https://agendapro.com',
    siteName: 'AgendaPro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgendaPro Dashboard'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgendaPro - Gestión de Citas Simple y Elegante',
    description: 'Transforma la gestión de tu negocio con nuestra plataforma intuitiva y poderosa.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3b82f6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        
        {/* Toast Container */}
        <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
          {/* Los toasts se insertarán aquí dinámicamente */}
        </div>
        
        {/* Modal Container */}
        <div id="modal-container">
          {/* Los modales se insertarán aquí dinámicamente */}
        </div>
      </body>
    </html>
  )
}