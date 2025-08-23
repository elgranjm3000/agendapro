'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Bell,
  Menu,
  X,
  TrendingUp,
  DollarSign
} from 'lucide-react'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    todayAppointments: 8,
    todayRevenue: 450000,
    totalClients: 124,
    weeklyAppointments: 45
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const todayAppointments = [
    { time: '09:00', client: 'María González', service: 'Corte', status: 'confirmed' },
    { time: '10:30', client: 'Carlos Ruiz', service: 'Barba', status: 'confirmed' },
    { time: '12:00', client: 'Ana López', service: 'Tinte', status: 'pending' },
    { time: '14:30', client: 'Pedro Silva', service: 'Corte', status: 'confirmed' },
    { time: '16:00', client: 'Laura Martín', service: 'Peinado', status: 'confirmed' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada'
      case 'pending': return 'Pendiente'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="font-bold text-xl text-gray-900">
            Agenda<span className="text-blue-600">Pro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-6 py-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
              activeTab === 'overview' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">Resumen</span>
          </button>
          
          <button
            onClick={() => setActiveTab('agenda')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
              activeTab === 'agenda' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Agenda</span>
          </button>
          
          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
              activeTab === 'clients' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Clientes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
              activeTab === 'settings' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Configuración</span>
          </button>
        </nav>
        
        {/* User Profile */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">DU</span>
            </div>
            <div>
              <div className="font-medium text-sm text-gray-900">Demo User</div>
              <div className="text-xs text-gray-500">Salón Demo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab === 'overview' && 'Dashboard'}
                  {activeTab === 'agenda' && 'Agenda'}
                  {activeTab === 'clients' && 'Clientes'}
                  {activeTab === 'settings' && 'Configuración'}
                </h1>
                <p className="text-gray-500 mt-1">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-400" />
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Nueva cita
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Citas de hoy</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
                      <p className="text-xs text-green-600 mt-1">+12% vs ayer</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ingresos hoy</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.todayRevenue)}</p>
                      <p className="text-xs text-green-600 mt-1">+8% vs ayer</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Esta semana</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.weeklyAppointments}</p>
                      <p className="text-xs text-green-600 mt-1">+15% vs anterior</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total clientes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
                      <p className="text-xs text-green-600 mt-1">+3 este mes</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Today's Appointments */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Citas de hoy</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {todayAppointments.map((appointment, idx) => (
                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{appointment.time}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{appointment.client}</div>
                          <div className="text-sm text-gray-600">{appointment.service}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Agenda de hoy</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {todayAppointments.map((appointment, idx) => (
                  <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{appointment.time}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{appointment.client}</div>
                        <div className="text-sm text-gray-600">{appointment.service}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Clientes</h3>
              </div>
              <div className="p-12 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aquí aparecerán tus clientes</p>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Añadir cliente
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Información del negocio</div>
                    <div className="text-sm text-gray-500">Nombre, dirección y datos de contacto</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Horarios de trabajo</div>
                    <div className="text-sm text-gray-500">Configura tus días y horas</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Servicios</div>
                    <div className="text-sm text-gray-500">Añade y configura servicios</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Notificaciones</div>
                    <div className="text-sm text-gray-500">WhatsApp y recordatorios</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}