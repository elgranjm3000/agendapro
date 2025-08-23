import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  Star
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-gray-900">
            Agenda<span className="text-blue-600">Pro</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Características</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Precios</a>
            <Link 
              href="/login"
              className="text-gray-600 hover:text-gray-900"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Comenzar gratis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Gestión de citas
          <span className="block text-blue-600">simple y elegante</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Todo lo que necesitas para organizar tu negocio. Sin complicaciones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 inline-flex items-center justify-center"
          >
            Prueba gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 inline-flex items-center justify-center"
          >
            Ver demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-gray-600">
              Una suite completa de herramientas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Agenda inteligente</h3>
              <p className="text-gray-600">Organiza citas con facilidad. Vista diaria, semanal y mensual.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex p-3 rounded-lg bg-green-100 text-green-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Recordatorios</h3>
              <p className="text-gray-600">WhatsApp y email automáticos. Reduce ausencias hasta 80%.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex p-3 rounded-lg bg-purple-100 text-purple-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Clientes</h3>
              <p className="text-gray-600">Historial completo, notas y preferencias en un lugar.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex p-3 rounded-lg bg-orange-100 text-orange-600 mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pagos</h3>
              <p className="text-gray-600">Cobra en línea, efectivo o tarjeta. Todo en un lugar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Más de 1,000 negocios confían en nosotros
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Desde que uso AgendaPro, mis ingresos aumentaron 40%. La facilidad para que los clientes reserven online es increíble."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Carmen Rodríguez</div>
                <div className="text-sm text-gray-500">Dueña de Salón Belleza</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Los recordatorios automáticos redujeron las ausencias casi a cero. Mi agenda siempre está completa ahora."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. Miguel Santos</div>
                <div className="text-sm text-gray-500">Dentista</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "La mejor inversión que he hecho. El tiempo que ahorro en administración lo dedico a mis clientes."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Laura Mendoza</div>
                <div className="text-sm text-gray-500">Spa Relajación Total</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comienza gratis, crece a tu ritmo
            </h2>
            <p className="text-xl text-gray-600">
              Sin contratos largos, sin letras pequeñas. Cancela cuando quieras.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">por mes</div>
                <div className="text-sm text-gray-500 mt-2">14 días gratis, luego $29/mes</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Citas ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Recordatorios WhatsApp y Email</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Sitio web de reservas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Terminal de pagos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Soporte 24/7</span>
                </li>
              </ul>
              
              <Link
                href="/register"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 flex items-center justify-center font-medium text-lg"
              >
                Comenzar prueba gratuita
              </Link>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Sin tarjeta de crédito requerida
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de profesionales que ya optimizaron su gestión de citas
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 text-lg font-medium"
          >
            Comenzar ahora - Es gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-bold text-xl text-gray-900 mb-4 md:mb-0">
              Agenda<span className="text-blue-600">Pro</span>
            </div>
            <div className="flex space-x-6 text-gray-600">
              <a href="#" className="hover:text-gray-900">Privacidad</a>
              <a href="#" className="hover:text-gray-900">Términos</a>
              <a href="#" className="hover:text-gray-900">Soporte</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 AgendaPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}