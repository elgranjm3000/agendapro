'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Search,
  Bell,
  MoreHorizontal,
  Clock,
  Phone,
  Mail,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    today: {
      appointments: [],
      appointmentCount: 0,
      revenue: 0
    },
    weekly: { appointmentCount: 0 },
    monthly: { revenue: 0 },
    totalClients: 0,
    upcomingAppointments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      SCHEDULED: 'bg-blue-100 text-blue-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800',
      NO_SHOW: 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      SCHEDULED: 'Programada',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELLED: 'Cancelada',
      NO_SHOW: 'No asistió'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
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
          <NavItem 
            icon={<Activity className="h-5 w-5" />} 
            label="Resumen" 
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <NavItem 
            icon={<Calendar className="h-5 w-5" />} 
            label="Agenda" 
            active={activeTab === 'agenda'}
            onClick={() => setActiveTab('agenda')}
          />
          <NavItem 
            icon={<Users className="h-5 w-5" />} 
            label="Clientes" 
            active={activeTab === 'clients'}
            onClick={() => setActiveTab('clients')}
          />
          <NavItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Configuración" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>
        
        {/* User Profile */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">Demo User</div>
              <div className="text-xs text-gray-500 truncate">Salón Demo</div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
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
                  {activeTab === 'overview' && 'Resumen'}
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
              <div className="relative hidden md:block">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Nueva cita
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewContent stats={dashboardStats} formatCurrency={formatCurrency} />}
              {activeTab === 'agenda' && <AgendaContent appointments={dashboardStats.today.appointments} formatTime={formatTime} getStatusColor={getStatusColor} getStatusText={getStatusText} />}
              {activeTab === 'clients' && <ClientsContent />}
              {activeTab === 'settings' && <SettingsContent />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// Componentes auxiliares
const NavItem = ({ icon, label, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    <span className={active ? 'text-blue-600' : ''}>{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

const OverviewContent = ({ stats, formatCurrency }: {
  stats: any;
  formatCurrency: (amount: number) => string;
}) => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Citas de hoy"
        value={stats.today.appointmentCount.toString()}
        icon={<Calendar className="h-6 w-6 text-blue-600" />}
        trend="+12% vs ayer"
        trendUp={true}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Ingresos de hoy"
        value={formatCurrency(stats.today.revenue)}
        icon={<DollarSign className="h-6 w-6 text-green-600" />}
        trend="+8% vs ayer"
        trendUp={true}
        bgColor="bg-green-50"
      />
      <StatsCard
        title="Esta semana"
        value={stats.weekly.appointmentCount.toString()}
        icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
        trend="+15% vs anterior"
        trendUp={true}
        bgColor="bg-purple-50"
      />
      <StatsCard
        title="Total clientes"
        value={stats.totalClients.toString()}
        icon={<Users className="h-6 w-6 text-orange-600" />}
        trend="+3 este mes"
        trendUp={true}
        bgColor="bg-orange-50"
      />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Agenda de hoy</h3>
              <Link href="/dashboard/agenda" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Ver todo
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.today.appointments.slice(0, 5).map((appointment: any, idx: number) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-center min-w-0">
                    <div className="font-semibold text-gray-900">{formatTime(appointment.startTime)}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.service?.duration}m
                    </div>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">{appointment.client?.name}</div>
                    <div className="text-sm text-gray-600">{appointment.service?.name}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {stats.today.appointments.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No tienes citas programadas para hoy</p>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Programar cita
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & Upcoming */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Acciones rápidas</h3>
          <div className="space-y-3">
            <QuickActionButton
              icon={<Plus className="h-4 w-4" />}
              label="Nueva cita"
              onClick={() => {}}
            />
            <QuickActionButton
              icon={<Users className="h-4 w-4" />}
              label="Añadir cliente"
              onClick={() => {}}
            />
            <QuickActionButton
              icon={<Bell className="h-4 w-4" />}
              label="Enviar recordatorio"
              onClick={() => {}}
            />
            <QuickActionButton
              icon={<Settings className="h-4 w-4" />}
              label="Configurar horarios"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Próximas citas</h3>
          <div className="space-y-3">
            {stats.upcomingAppointments.slice(0, 3).map((appointment: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {appointment.client?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(appointment.appointmentDate).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {formatTime(appointment.startTime)}
                  </div>
                </div>
              </div>
            ))}
            {stats.upcomingAppointments.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                No hay citas próximas
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AgendaContent = ({ appointments, formatTime, getStatusColor, getStatusText }: {
  appointments: any[];
  formatTime: (time: string) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Citas de hoy</h3>
        <span className="text-sm text-gray-500">{appointments.length} citas</span>
      </div>
    </div>
    <div className="divide-y divide-gray-200">
      {appointments.map((appointment: any, idx: number) => (
        <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="font-semibold text-gray-900">{formatTime(appointment.startTime)}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {appointment.service?.duration}m
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div>
              <div className="font-medium text-gray-900">{appointment.client?.name}</div>
              <div className="text-sm text-gray-600">{appointment.service?.name}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </span>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Mail className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClientsContent = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <h3 className="font-semibold text-gray-900">Lista de clientes</h3>
    </div>
    <div className="p-6">
      <div className="text-gray-500 text-center py-8">
        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Aquí aparecerán tus clientes</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Añadir primer cliente
        </button>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>
      <div className="space-y-4">
        <SettingItem 
          title="Información del negocio"
          description="Nombre, dirección y datos de contacto"
          icon={<User className="h-5 w-5" />}
        />
        <SettingItem 
          title="Horarios de atención"
          description="Configura tus días y horas de trabajo"
          icon={<Clock className="h-5 w-5" />}
        />
        <SettingItem 
          title="Servicios"
          description="Añade y configura tus servicios"
          icon={<Settings className="h-5 w-5" />}
        />
        <SettingItem 
          title="Notificaciones"
          description="WhatsApp y recordatorios por email"
          icon={<Bell className="h-5 w-5" />}
        />
      </div>
    </div>
  </div>
);

const StatsCard = ({ title, value, icon, trend, trendUp, bgColor }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  bgColor: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className={`flex items-center mt-2 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className={`h-3 w-3 mr-1 ${!trendUp && 'rotate-180'}`} />
          {trend}
        </div>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
    </div>
  </div>
);

const QuickActionButton = ({ icon, label, onClick }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="flex-shrink-0">{icon}</div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

const SettingItem = ({ title, description, icon }: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 text-gray-400">{icon}</div>
      <div>
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
    <MoreHorizontal className="h-5 w-5 text-gray-400" />
  </div>
);

// Helper functions
function getStatusColor(status: string): string {
  const colors = {
    SCHEDULED: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
    NO_SHOW: 'bg-orange-100 text-orange-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

function getStatusText(status: string): string {
  const texts = {
    SCHEDULED: 'Programada',
    CONFIRMED: 'Confirmada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
    NO_SHOW: 'No asistió'
  };
  return texts[status as keyof typeof texts] || status;
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}