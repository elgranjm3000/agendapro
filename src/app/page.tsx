import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  BarChart3,
  Bell,
  Shield,
  Zap,
  Star
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="font-bold text-2xl text-gray-900">
            Agenda<span className="text-blue-600">Pro</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Características</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Precios</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonios</a>
            <Link 
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Comenzar gratis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Gestión de citas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              simple y elegante
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            La plataforma todo-en-uno para gestionar tu negocio de servicios. 
            Programa citas, cobra pagos y haz crecer tu negocio sin complicaciones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Prueba gratuita por 14 días
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 transition-all duration-200 flex items-center justify-center text-lg font-medium hover:shadow-md"
            >
              Ver demo en vivo
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-500">AgendaPro Dashboard</div>
                </div>
              </div>
              <div className="p-8">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para gestionar tu negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una suite completa de herramientas diseñadas para simplificar tu día a día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Agenda inteligente"
              description="Organiza citas con facilidad. Vista diaria, semanal y mensual con sincronización automática."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8" />}
              title="Recordatorios automáticos"
              description="WhatsApp y email automáticos. Reduce las ausencias hasta un 80% y mejora la puntualidad."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Gestión de clientes"
              description="Historial completo, preferencias y notas. Conoce mejor a tus clientes y ofrece un servicio personalizado."
              gradient="from-purple-500 to-violet-500"
            />
            <FeatureCard
              icon={<CreditCard className="h-8 w-8" />}
              title="Pagos integrados"
              description="Cobra en línea, efectivo o tarjeta. Todas las transacciones en un solo lugar con reportes automáticos."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Reportes y métricas"
              description="Visualiza el crecimiento de tu negocio con gráficos claros y métricas que realmente importan."
              gradient="from-teal-500 to-blue-500"
            />
            <FeatureCard
              icon={<Smartphone className="h-8 w-8" />}
              title="Reservas 24/7"
              description="Tu sitio web de reservas siempre disponible. Tus clientes pueden agendar cuando les convenga."
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Diseñado para tu éxito
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                No importa si tienes una peluquería, spa, clínica dental o consultorio. 
                AgendaPro se adapta a tu forma de trabajar.
              </p>
              <div className="space-y-6">
                <BenefitItem 
                  icon={<Zap className="h-5 w-5" />}
                  text="Configuración en menos de 5 minutos" 
                />
                <BenefitItem 
                  icon={<Shield className="h-5 w-5" />}
                  text="Datos seguros con respaldo automático" 
                />
                <BenefitItem 
                  icon={<CheckCircle className="h-5 w-5" />}
                  text="Sin instalación, funciona desde cualquier dispositivo" 
                />
                <BenefitItem 
                  icon={<Users className="h-5 w-5" />}
                  text="Soporte personalizado incluido" 
                />
              </div>
              <div className="mt-8">
                <Link
                  href="/register"
                  className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                  <h3 className="text-xl font-bold mb-2">Hoy</h3>
                  <p className="opacity-90">8 citas programadas</p>
                </div>
                <div className="space-y-4">
                  {[
                    { time: "09:00", client: "María González", service: "Corte" },
                    { time: "10:30", client: "Carlos Ruiz", service: "Barba" },
                    { time: "12:00", client: "Ana López", service: "Tinte" },
                  ].map((appointment, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{appointment.client}</div>
                        <div className="text-xs text-gray-500">{appointment.service}</div>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform -rotate-2 -z-10 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Más de 1,000 negocios confían en nosotros
            </h2>
            <p className="text-xl text-gray-600">
              Descubre por qué eligen AgendaPro para hacer crecer su negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Carmen Rodríguez"
              role="Dueña de Salón Belleza"
              content="Desde que uso AgendaPro, mis ingresos aumentaron 40%. La facilidad para que los clientes reserven online es increíble."
              rating={5}
            />
            <TestimonialCard
              name="Dr. Miguel Santos"
              role="Dentista"
              content="Los recordatorios automáticos redujeron las ausencias casi a cero. Mi agenda siempre está completa ahora."
              rating={5}
            />
            <TestimonialCard
              name="Laura Mendoza"
              role="Spa Relajación Total"
              content="La mejor inversión que he hecho. El tiempo que ahorro en administración lo dedico a mis clientes."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comienza gratis, crece a tu ritmo
            </h2>
            <p className="text-xl text-gray-600">
              Sin contratos largos, sin letras pequeñas. Cancela cuando quieras.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">por mes</div>
                <div className="text-sm text-gray-500 mt-2">14 días gratis, luego $29/mes</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Citas ilimitadas" />
                <PricingFeature text="Recordatorios WhatsApp y Email" />
                <PricingFeature text="Sitio web de reservas personalizado" />
                <PricingFeature text="Terminal de pagos integrada" />
                <PricingFeature text="Reportes y analytics" />
                <PricingFeature text="Soporte 24/7 en español" />
                <PricingFeature text="Sin comisiones por transacción" />
              </ul>
              
              <Link
                href="/register"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center font-medium text-lg shadow-lg hover:shadow-xl"
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
      <section className="bg-gradient-to-r from-gray-900 to-black py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de profesionales que ya optimizaron su gestión de citas
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
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
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacidad</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Términos</a>
              <a href="/support" className="hover:text-gray-900 transition-colors">Soporte</a>
              <a href="/contact" className="hover:text-gray-900 transition-colors">Contacto</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 AgendaPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componentes auxiliares
const FeatureCard = ({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
      {icon}
    </div>
    <h3 className="font-bold text-xl text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const BenefitItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 p-1 bg-green-100 rounded-full text-green-600">
      {icon}
    </div>
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

const TestimonialCard = ({ name, role, content, rating }: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{content}"</p>
    <div>
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  </div>
);

const PricingFeature = ({ text }: { text: string }) => (
  <li className="flex items-center space-x-3">
    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

const DashboardPreview = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-500">En vivo</span>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">8</div>
        <div className="text-xs text-blue-600">Citas hoy</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">$450k</div>
        <div className="text-xs text-green-600">Este mes</div>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-600">124</div>
        <div className="text-xs text-purple-600">Clientes</div>
      </div>
    </div>
    
    <div className="space-y-2">
      {['María González - Corte', 'Carlos Ruiz - Barba', 'Ana López - Tinte'].map((appointment, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-700">{appointment}</span>
          <span className="text-xs text-gray-500">{9 + idx}:00</span>
        </div>
      ))}
    </div>
  </div>
);