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
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-12">
          {/* Hero Section */}
          <div className="bg-primary text-white py-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h1 className="display-4 fw-bold mb-4">
                    Gestiona tu negocio con AgendaPro
                  </h1>
                  <p className="lead mb-4">
                    La plataforma simple y elegante para gestionar citas, clientes y pagos en tu negocio de servicios.
                  </p>
                  <div className="d-flex gap-3">
                    <Link href="/auth/register" className="btn btn-light btn-lg">
                      Comenzar gratis
                    </Link>
                    <Link href="/auth/login" className="btn btn-outline-light btn-lg">
                      Iniciar sesión
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="text-center">
                    <Calendar size={120} className="text-white opacity-75" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-5">
            <div className="container">
              <div className="row text-center mb-5">
                <div className="col-12">
                  <h2 className="display-5 fw-bold mb-3">Todo lo que necesitas</h2>
                  <p className="lead text-muted">
                    Herramientas completas para gestionar tu negocio de servicios
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '60px', height: '60px'}}>
                        <Calendar className="text-primary" size={24} />
                      </div>
                      <h5 className="card-title">Gestión de Citas</h5>
                      <p className="card-text text-muted">
                        Programa y organiza citas de manera eficiente con calendario integrado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '60px', height: '60px'}}>
                        <Users className="text-success" size={24} />
                      </div>
                      <h5 className="card-title">Base de Clientes</h5>
                      <p className="card-text text-muted">
                        Mantén un registro completo de tus clientes y su historial
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '60px', height: '60px'}}>
                        <Clock className="text-warning" size={24} />
                      </div>
                      <h5 className="card-title">Control de Horarios</h5>
                      <p className="card-text text-muted">
                        Define horarios disponibles y gestiona tu tiempo de trabajo
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '60px', height: '60px'}}>
                        <CreditCard className="text-info" size={24} />
                      </div>
                      <h5 className="card-title">Pagos Integrados</h5>
                      <p className="card-text text-muted">
                        Procesa pagos y lleva control de ingresos de forma segura
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-light py-5">
            <div className="container text-center">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h3 className="display-6 fw-bold mb-4">
                    ¿Listo para comenzar?
                  </h3>
                  <p className="lead mb-4">
                    Únete a miles de profesionales que ya confían en AgendaPro
                  </p>
                  <Link href="/auth/register" 
                        className="btn btn-primary btn-lg px-5">
                    Crear cuenta gratuita
                    <ArrowRight className="ms-2" size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}