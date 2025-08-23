'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
  useEffect(() => {
    // Importar Bootstrap JS dinámicamente solo en el cliente
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return null
}