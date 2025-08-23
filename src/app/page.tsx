'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

export default function HomePage() {
  useEffect(() => {
    // Animaciones con Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
        }
      })
    }, observerOptions)

    // Observar todos los elementos con la clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <div className="bg-primary rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
              <Calendar size={20} className="text-white" />
            </div>
            <span className="fw-bold fs-4">
              Agenda<span style={{background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Pro</span>
            </span>
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <a className="nav-link fw-medium text-secondary" href="#features">Características</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link fw-medium text-secondary" href="#testimonials">Testimonios</a>
              </li>
              <li className="nav-item me-3">
                <Link href="/login" className="nav-link fw-medium text-secondary">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register" className="btn btn-primary rounded-pill px-4 fw-medium">
                  Empezar Gratis
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden" style={{paddingTop: '120px', minHeight: '100vh'}}>
        {/* Background with gradient and shapes */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
          zIndex: -2
        }}></div>
        
        {/* Animated background shapes */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: -1}}>
          <div className="position-absolute rounded-circle opacity-25" 
               style={{
                 top: '20%', 
                 left: '10%', 
                 width: '300px', 
                 height: '300px', 
                 background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                 filter: 'blur(60px)',
                 animation: 'float 6s ease-in-out infinite'
               }}></div>
          <div className="position-absolute rounded-circle opacity-25" 
               style={{
                 top: '60%', 
                 right: '10%', 
                 width: '250px', 
                 height: '250px', 
                 background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                 filter: 'blur(60px)',
                 animation: 'float 6s ease-in-out infinite 2s'
               }}></div>
        </div>

        <div className="container">
          <div className="row min-vh-100 align-items-center">
            <div className="col-12 text-center animate-on-scroll opacity-0">
              {/* Badge */}
            

              {/* Main Heading */}
              <h1 className="display-1 fw-bold mb-4 lh-1" style={{fontSize: 'clamp(3rem, 8vw, 6rem)'}}>
                Gestiona tu{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  negocio
                </span>
                <br />
                de forma inteligente
              </h1>

              {/* Subtitle */}
              <p className="lead fs-3 text-muted mb-5 mx-auto" style={{maxWidth: '800px'}}>
                La plataforma todo-en-uno para profesionales que buscan{' '}
                <strong className="text-dark">optimizar su tiempo</strong>,{' '}
                <strong className="text-dark">aumentar ingresos</strong> y{' '}
                <strong className="text-dark">deleitar clientes</strong>
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
                <Link href="/register" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-semibold d-flex align-items-center justify-content-center position-relative overflow-hidden">
                  <span className="me-2">Comenzar gratis</span>
                  <ArrowRight size={20} />
                </Link>
                <Link href="/login" className="btn btn-outline-dark btn-lg px-5 py-3 rounded-pill fw-semibold">
                  Ver demo
                </Link>
              </div>

              {/* Social Proof */}
              <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 text-muted small">
                <div className="d-flex align-items-center">
                  <div className="d-flex me-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="rounded-circle border border-white me-n2" style={{
                        width: '32px',
                        height: '32px',
                        background: `linear-gradient(135deg, hsl(${200 + i * 40}, 70%, 60%) 0%, hsl(${240 + i * 40}, 70%, 60%) 100%)`
                      }}></div>
                    ))}
                  </div>
                  <span>+2,500 profesionales activos</span>
                </div>
                <div className="d-flex align-items-center">
                  <Star size={16} className="text-warning me-1" fill="currentColor" />
                  <span>4.9/5 valoración</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-6" style={{paddingTop: '100px', paddingBottom: '100px'}}>
        <div className="container">
          {/* Section Header */}
          <div className="row mb-6">
            <div className="col-12 text-center animate-on-scroll opacity-0">
              <h2 className="display-3 fw-bold mb-4">
                Todo lo que necesitas para{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  crecer
                </span>
              </h2>
              <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
                Herramientas profesionales diseñadas para maximizar tu productividad 
                y la satisfacción de tus clientes
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(59, 130, 246, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                       }}>
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Agenda Inteligente</h5>
                  <p className="card-text text-muted mb-3">
                    Gestión automática de citas con IA que optimiza tu calendario y reduce conflictos
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Reservas online 24/7
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Recordatorios automáticos
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Sincronización multicCalendar
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(139, 92, 246, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                       }}>
                    <Users size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">CRM Avanzado</h5>
                  <p className="card-text text-muted mb-3">
                    Base de datos completa con historial, preferencias y análisis de comportamiento
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Perfiles detallados
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Segmentación inteligente
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Comunicación personalizada
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(16, 185, 129, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                       }}>
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Analytics Pro</h5>
                  <p className="card-text text-muted mb-3">
                    Insights detallados sobre tu negocio con reportes en tiempo real
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Métricas de rendimiento
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Predicciones de ingresos
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Reportes personalizados
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(245, 158, 11, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                       }}>
                    <Zap size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Pagos Integrados</h5>
                  <p className="card-text text-muted mb-3">
                    Procesa pagos de forma segura con múltiples métodos de pago
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Pagos online seguros
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Facturación automática
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Control de ingresos
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(239, 68, 68, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                       }}>
                    <Clock size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Automatización</h5>
                  <p className="card-text text-muted mb-3">
                    Workflows automáticos que ahorran tiempo y reducen errores
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Recordatorios inteligentes
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Follow-ups automáticos
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Tareas programadas
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm animate-on-scroll opacity-0 hover-lift" 
                   style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(99, 102, 241, 0.05) 100%)'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                       }}>
                    <Shield size={24} className="text-white" />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Seguridad Total</h5>
                  <p className="card-text text-muted mb-3">
                    Protección de datos con los más altos estándares de seguridad
                  </p>
                  <ul className="list-unstyled small">
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Encriptación end-to-end
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      Backups automáticos
                    </li>
                    <li className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      Cumplimiento GDPR
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6" style={{
        paddingTop: '100px', 
        paddingBottom: '100px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center text-white animate-on-scroll opacity-0">
              <h2 className="display-3 fw-bold mb-4">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="lead fs-4 mb-5 opacity-90">
                Únete a miles de profesionales que ya aumentaron sus ingresos un 40% 
                promedio con AgendaPro
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link href="/register" className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold text-primary">
                  Empezar gratis por 14 días
                </Link>
                <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-semibold">
                  Hablar con un experto
                </button>
              </div>

              <p className="small mt-4 opacity-75">
                Sin tarjeta de crédito • Configuración en 5 minutos • Soporte 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div className="bg-primary rounded-3 p-2 me-3 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                  <Calendar size={20} className="text-white" />
                </div>
                <span className="fw-bold fs-3">
                  Agenda<span style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Pro</span>
                </span>
              </div>
              
              <div className="text-muted">
                <p>&copy; 2024 AgendaPro. Todos los derechos reservados.</p>
                <p>Hecho con ❤️ para profesionales como tú</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-on-scroll {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-on-scroll.fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .animate-on-scroll:not(.fade-in) {
          transform: translateY(50px);
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .btn-primary {
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </>
  )
}