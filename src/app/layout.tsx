import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapClient from '@/components/BootstrapClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AgendaPro - Gestión Profesional de Citas',
    template: '%s | AgendaPro'
  },
  description: 'La plataforma más completa para administrar citas, clientes y pagos en tu negocio de servicios. Optimiza tu tiempo y aumenta tus ingresos.',
  keywords: ['agenda', 'citas', 'gestión', 'negocio', 'servicios', 'clientes', 'pagos'],
  authors: [{ name: 'AgendaPro Team' }],
  creator: 'AgendaPro',
  publisher: 'AgendaPro',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://agendapro.com',
    title: 'AgendaPro - Gestión Profesional de Citas',
    description: 'La plataforma más completa para administrar citas, clientes y pagos en tu negocio de servicios.',
    siteName: 'AgendaPro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgendaPro - Gestión Profesional de Citas',
    description: 'La plataforma más completa para administrar citas, clientes y pagos en tu negocio de servicios.',
    creator: '@agendapro',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' }
  ]
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 overflow-x-hidden`}
        suppressHydrationWarning={true}>


          <div className="min-h-screen">
              {children}
          </div>

          <div 
          id="toast-container" 
          className="fixed top-4 right-4 z-50 space-y-4 pointer-events-none"
          role="region" 
          aria-live="polite" 
          aria-label="Notificaciones"
        />

   

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Theme detection and system preferences
              (function() {
                function getInitialTheme() {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    const storedTheme = window.localStorage.getItem('theme');
                    if (storedTheme) {
                      return storedTheme;
                    }
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                const theme = getInitialTheme();
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();

              // Smooth page transitions
              window.addEventListener('beforeunload', function() {
                document.body.classList.add('fade-out');
              });

              // Enhanced focus management
              document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                  document.body.classList.add('keyboard-navigation');
                }
              });

              document.addEventListener('mousedown', function() {
                document.body.classList.remove('keyboard-navigation');
              });

              // Performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                  if (loadTime > 3000) {
                    console.warn('Page load time is high:', loadTime + 'ms');
                  }
                }
              });

              // Accessibility enhancements
              document.addEventListener('DOMContentLoaded', function() {
                // Add skip navigation link
                const skipLink = document.createElement('a');
                skipLink.href = '#main-content';
                skipLink.textContent = 'Saltar al contenido principal';
                skipLink.className = 'visually-hidden-focusable btn btn-primary position-fixed top-0 start-0 z-3 m-3';
                document.body.insertBefore(skipLink, document.body.firstChild);

                // Enhance form accessibility
                const inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                  if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                    const label = document.querySelector('label[for="' + input.id + '"]');
                    if (label) {
                      input.setAttribute('aria-labelledby', label.id || 'label-' + input.id);
                      if (!label.id) {
                        label.id = 'label-' + input.id;
                      }
                    }
                  }
                });
              });

              // Error boundary for client-side errors
              window.addEventListener('error', function(e) {
                console.error('Global error caught:', e.error);
              });

              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
              });
            `,
          }}
        />
        
        {/* Bootstrap JS */}
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
          defer
        ></script>


      </body>
    </html>
  )
}