/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  distDir: 'build',
  experimental: {
    serverComponentsExternalPackages: []     
  },
  async rewrites() {
    return []
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Configuraciones adicionales para el proyecto
  typescript: {
    // Permitir builds aunque haya errores de TypeScript (opcional)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Permitir builds aunque haya errores de ESLint (opcional)
    ignoreDuringBuilds: true,
  },
  // Optimización de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.ALLOWED_ORIGIN || '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
    swcMinify: true,

}

module.exports = nextConfig