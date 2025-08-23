'use client'

import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Bell,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  BarChart3,
  Search,
  ChevronDown,
  Clock,
  Home,
  CreditCard,
  User,
  FileText,
  MessageSquare
} from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function ModernDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = {
    totalSales: "21,324",
    totalIncome: "$221,324.50",
    totalSessions: "16,703",
    conversionRate: "12.8%"
  }

  const recentAppointments = [
    { time: '09:00', client: 'María González', service: 'Corte de Cabello', status: 'confirmed', avatar: 'MG', color: 'bg-primary' },
    { time: '10:30', client: 'Carlos Ruiz', service: 'Consulta Médica', status: 'confirmed', avatar: 'CR', color: 'bg-success' },
    { time: '12:00', client: 'Ana López', service: 'Masaje Terapéutico', status: 'pending', avatar: 'AL', color: 'bg-warning' },
    { time: '14:30', client: 'Pedro Silva', service: 'Tratamiento Facial', status: 'confirmed', avatar: 'PS', color: 'bg-info' },
    { time: '16:00', client: 'Laura Martín', service: 'Manicure', status: 'confirmed', avatar: 'LM', color: 'bg-secondary' }
  ]

  const chartData = [
    { month: 'Ene', desktop: 180, mobile: 120 },
    { month: 'Feb', desktop: 240, mobile: 160 },
    { month: 'Mar', desktop: 190, mobile: 140 },
    { month: 'Abr', desktop: 280, mobile: 200 },
    { month: 'May', desktop: 320, mobile: 240 },
  ]

  const handleLogout = async () => {
  try {
    // Opcional: llamar a la API de logout si la tienes
    await fetch('/api/auth/logout', {
      method: 'POST'
    })
  } catch (error) {
    console.log('Error al cerrar sesión:', error)
  } finally {
    // Siempre redirigir a la página principal
    router.push('/')
  }
}

  return (
    <>
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <div className={`sidebar bg-dark text-white position-fixed top-0 start-0 vh-100 ${sidebarOpen ? 'show' : ''}`} 
             style={{
               width: '280px', 
               transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', 
               transition: 'transform 0.3s ease', 
               zIndex: 1050,
               display: 'flex',
               flexDirection: 'column'
             }}>
          
          {/* Sidebar Header */}
          <div className="p-3 border-bottom border-secondary flex-shrink-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" 
                     style={{width: '35px', height: '35px'}}>
                  <Calendar size={18} className="text-white" />
                </div>
                <span className="fw-bold fs-5">
                  Agenda<span className="text-primary">Pro</span>
                </span>
              </div>
              <button 
                className="btn btn-sm btn-outline-secondary d-lg-none"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-3 border-bottom border-secondary flex-shrink-0">
            <div className="d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                   style={{
                     width: '40px', 
                     height: '40px', 
                     background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'
                   }}>
                RM
              </div>
              <div className="flex-grow-1">
                <div className="fw-semibold small text-white">Renee McKelvey</div>
                <div className="text-light small d-flex align-items-center opacity-75">
                  <span className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></span>
                  Product Manager
                </div>
              </div>
              <ChevronDown size={16} className="text-muted" />
            </div>
          </div>

          {/* Navigation - Scrollable */}
          <div className="p-3 flex-grow-1" style={{overflowY: 'auto'}}>
            <div className="mb-4">
              <div className="text-muted small fw-semibold text-uppercase mb-2">Main</div>
              <nav className="nav flex-column">
                <a className="nav-link text-white bg-primary rounded py-2 px-3 mb-1 d-flex align-items-center" href="#">
                  <Home size={18} className="me-3" />
                  Dashboard
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <Calendar size={18} className="me-3" />
                  Citas
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <Users size={18} className="me-3" />
                  Clientes
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <BarChart3 size={18} className="me-3" />
                  Analytics
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <CreditCard size={18} className="me-3" />
                  Pagos
                </a>
              </nav>
            </div>

            <div className="mb-4">
              <div className="text-muted small fw-semibold text-uppercase mb-2">Admin</div>
              <nav className="nav flex-column">
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <User size={18} className="me-3" />
                  Usuarios
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <Settings size={18} className="me-3" />
                  Configuración
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <FileText size={18} className="me-3" />
                  Reportes
                </a>
                <a className="nav-link text-light py-2 px-3 mb-1 d-flex align-items-center hover-bg-secondary" href="#">
                  <MessageSquare size={18} className="me-3" />
                  Mensajes
                </a>
              </nav>
            </div>
          </div>

          {/* Upgrade Card - Fixed at bottom */}
          <div className="p-3 flex-shrink-0 mt-auto">
            <div className="card bg-primary border-0">
              <div className="card-body p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-white bg-opacity-25 rounded p-2 me-2">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white fw-semibold small">Upgrade Plan</div>
                    <div className="text-white-50 small">Unlock premium features</div>
                  </div>
                </div>
                <button className="btn btn-light btn-sm w-100 fw-semibold">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
            style={{zIndex: 1040}}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-grow-1 main-content">
          {/* Header */}
          <header className="bg-white border-bottom p-3 sticky-top">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary me-3 d-lg-none"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={20} />
                </button>
                
                <div>
                  <h4 className="mb-1 fw-bold">Dashboard</h4>
                  <p className="mb-0 text-muted small">
                    {currentTime.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                {/* Search - Solo en desktop */}
                <div className="position-relative me-3 d-none d-md-block">
                  <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Buscar..."
                    style={{width: '250px'}}
                  />
                </div>
                
                {/* Notifications */}
                <button className="btn btn-outline-secondary me-3 position-relative">
                  <Bell size={18} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                        style={{fontSize: '0.6rem'}}>
                    3
                  </span>
                </button>
                
                {/* User Dropdown */}
                <div className="dropdown me-3">
                  <button 
                    className="btn btn-outline-secondary d-flex align-items-center"
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-2" 
                         style={{
                           width: '32px', 
                           height: '32px', 
                           background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'
                         }}>
                      RM
                    </div>
                    <span className="d-none d-sm-inline me-2">Renee</span>
                    <ChevronDown size={16} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0" style={{minWidth: '200px'}}>
                    <li>
                      <div className="dropdown-header">
                        <div className="fw-semibold">Renee McKelvey</div>
                        <div className="text-muted small">renee@agenda.com</div>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item d-flex align-items-center py-2" href="#">
                        <User size={16} className="me-2" />
                        Mi Perfil
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item d-flex align-items-center py-2" href="#">
                        <Settings size={16} className="me-2" />
                        Configuración
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item d-flex align-items-center py-2" href="#">
                        <Bell size={16} className="me-2" />
                        Notificaciones
                      </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                       <button 
    className="dropdown-item d-flex align-items-center text-danger py-2 w-100 border-0 bg-transparent" 
    onClick={handleLogout}
  >
                      <a className="dropdown-item d-flex align-items-center text-danger py-2" href="#">
                        <svg width="16" height="16" className="me-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16,17 21,12 16,7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Cerrar Sesión
                      </a>
                      </button>
                    </li>
                  </ul>
                </div>
                
                {/* Add Button */}
                <button className="btn btn-primary d-flex align-items-center">
                  <Plus size={18} className="me-1" />
                  <span className="d-none d-sm-inline">Nueva Cita</span>
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-4">
            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-muted mb-1 small fw-medium">Total Sales</p>
                        <h4 className="mb-0 fw-bold">{stats.totalSales}</h4>
                        <span className="badge bg-success bg-opacity-10 text-success small">+12.5%</span>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <TrendingUp size={24} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-muted mb-1 small fw-medium">Total Income</p>
                        <h4 className="mb-0 fw-bold">{stats.totalIncome}</h4>
                        <span className="badge bg-success bg-opacity-10 text-success small">+8.2%</span>
                      </div>
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <DollarSign size={24} className="text-success" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-muted mb-1 small fw-medium">Total Sessions</p>
                        <h4 className="mb-0 fw-bold">{stats.totalSessions}</h4>
                        <span className="badge bg-primary bg-opacity-10 text-primary small">+23.1%</span>
                      </div>
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <Users size={24} className="text-warning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-muted mb-1 small fw-medium">Conversion Rate</p>
                        <h4 className="mb-0 fw-bold">{stats.conversionRate}</h4>
                        <span className="badge bg-info bg-opacity-10 text-info small">+4.3%</span>
                      </div>
                      <div className="bg-info bg-opacity-10 p-3 rounded">
                        <BarChart3 size={24} className="text-info" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Sales Performance Chart */}
              <div className="col-lg-8 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div>
                        <h5 className="card-title fw-bold mb-1">Sales Performance</h5>
                        <p className="text-muted small mb-0">Revenue overview for the last 6 months</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-3">
                          <span className="bg-primary rounded-circle me-2" style={{width: '12px', height: '12px'}}></span>
                          <span className="small text-muted">Desktop</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="bg-warning rounded-circle me-2" style={{width: '12px', height: '12px'}}></span>
                          <span className="small text-muted">Mobile</span>
                        </div>
                        <Settings size={16} className="text-muted ms-3" />
                      </div>
                    </div>
                    
                    {/* Simple Chart */}
                    <div className="position-relative" style={{height: '300px'}}>
                      <div className="d-flex align-items-end justify-content-between h-100 px-3">
                        {chartData.map((item, index) => (
                          <div key={index} className="d-flex flex-column align-items-center" style={{flex: 1}}>
                            <div className="d-flex align-items-end mb-2" style={{height: '240px'}}>
                              <div 
                                className="bg-primary rounded-top me-1" 
                                style={{
                                  width: '20px',
                                  height: `${(item.desktop / 320) * 200}px`,
                                  background: 'linear-gradient(180deg, #0d6efd 0%, #0a58ca 100%)'
                                }}
                              ></div>
                              <div 
                                className="bg-warning rounded-top" 
                                style={{
                                  width: '20px',
                                  height: `${(item.mobile / 320) * 200}px`,
                                  background: 'linear-gradient(180deg, #ffc107 0%, #ffca2c 100%)'
                                }}
                              ></div>
                            </div>
                            <span className="small text-muted fw-medium">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="col-lg-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h5 className="card-title fw-bold mb-0">Popular Categories</h5>
                      <Settings size={16} className="text-muted" />
                    </div>
                    
                    <div className="mb-4">
                      {[
                        { name: 'Electronics', value: 24, color: 'primary' },
                        { name: 'Furniture', value: 18, color: 'success' },
                        { name: 'Toys', value: 16, color: 'warning' },
                        { name: 'Books', value: 12, color: 'info' }
                      ].map((category, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                          <span className={`bg-${category.color} rounded-circle me-3`} style={{width: '12px', height: '12px'}}></span>
                          <div className="flex-grow-1">
                            <div className="small fw-medium">{category.name}</div>
                          </div>
                          <span className="small text-muted fw-medium">{category.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Donut Chart */}
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <svg width="120" height="120" viewBox="0 0 120 120" style={{transform: 'rotate(-90deg)'}}>
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke="#e9ecef"
                            strokeWidth="12"
                            fill="transparent"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke="#0d6efd"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="170 113"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <span className="fs-4 fw-bold">70</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Customers */}
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h5 className="card-title fw-bold mb-0">Recent Customers</h5>
                      <a href="#" className="btn btn-outline-primary btn-sm">Ver todos</a>
                    </div>
                    
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <tbody>
                          {recentAppointments.map((appointment, index) => (
                            <tr key={index}>
                              <td>
                                <div className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold ${appointment.color}`} 
                                     style={{width: '40px', height: '40px'}}>
                                  {appointment.avatar}
                                </div>
                              </td>
                              <td>
                                <div className="fw-medium">{appointment.client}</div>
                                <div className="text-muted small">{appointment.service}</div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center text-muted small">
                                  <Clock size={14} className="me-1" />
                                  {appointment.time}
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-success bg-opacity-10 text-success' 
                                    : 'bg-warning bg-opacity-10 text-warning'
                                }`}>
                                  {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <Settings size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          transition: transform 0.3s ease;
        }

        .sidebar.show {
          transform: translateX(0) !important;
        }

        .hover-bg-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.5rem;
        }

        .main-content {
          margin-left: 0;
        }

        @media (min-width: 992px) {
          .main-content {
            margin-left: 280px;
          }
          
          .sidebar {
            transform: translateX(0) !important;
          }
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .dropdown-menu {
          border-radius: 0.75rem;
          border: none;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .dropdown-item:hover {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .sticky-top {
          position: sticky;
          top: 0;
          z-index: 1020;
        }

        @media (max-width: 576px) {
          .dropdown-menu {
            right: 0 !important;
            left: auto !important;
            min-width: 180px;
          }
        }

        .sidebar .nav-link {
          transition: all 0.2s ease;
          border-radius: 0.5rem;
        }

        .sidebar .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateX(2px);
        }

        .sidebar .nav-link.bg-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          transform: translateX(0);
        }
      `}</style>

      {/* Bootstrap JS */}
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
        defer
      ></script>
    </>
  )
}