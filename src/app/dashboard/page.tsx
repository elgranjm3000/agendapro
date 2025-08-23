'use client'

import React, { useState, useEffect } from 'react';
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
  MapPin,
  Phone,
  Home,
  Briefcase,
  CreditCard,
  User
} from 'lucide-react';

export default function ModernDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  const [stats, setStats] = useState({
    applicants: 3154,
    interviews: 1546,
    forwards: 912,
    todayAppointments: 382,
    todayInterviews: 37
  });

  const [todayAppointments] = useState([
    { time: '09:00', client: 'María González', service: 'Corte de Cabello', status: 'confirmed', avatar: 'MG' },
    { time: '10:30', client: 'Carlos Ruiz', service: 'Consulta Médica', status: 'confirmed', avatar: 'CR' },
    { time: '12:00', client: 'Ana López', service: 'Masaje Terapéutico', status: 'pending', avatar: 'AL' },
    { time: '14:30', client: 'Pedro Silva', service: 'Tratamiento Facial', status: 'confirmed', avatar: 'PS' },
    { time: '16:00', client: 'Laura Martín', service: 'Manicure', status: 'confirmed', avatar: 'LM' }
  ]);

  const chartData = [
    { day: 'L', value: 250 },
    { day: 'M', value: 300 },
    { day: 'M', value: 380 },
    { day: 'J', value: 180 },
    { day: 'V', value: 220 },
    { day: 'S', value: 400 },
    { day: 'D', value: 100 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="font-bold text-lg text-white">
              Agenda<span className="text-blue-400">Pro</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">NB</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Newton Barley</div>
              <div className="text-slate-400 text-xs flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Online
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main</div>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>HOME</span>
          </button>
          
          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'appointments' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>JOBS</span>
          </button>
          
          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'clients' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>RESUMES</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'tasks' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>TASKS</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>CALENDAR</span>
          </button>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-4">Admin</div>
          
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'users' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <User className="h-4 w-4" />
            <span>USERS</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'locations' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>LOCATIONS</span>
          </button>

          <button
            onClick={() => setActiveTab('workflows')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'workflows' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>WORKFLOWS</span>
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a job, task or resume"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <div className="w-6 h-6 bg-gray-300 rounded grid grid-cols-2 gap-0.5 p-1">
                  <div className="bg-gray-600 rounded-sm"></div>
                  <div className="bg-gray-600 rounded-sm"></div>
                  <div className="bg-gray-600 rounded-sm"></div>
                  <div className="bg-gray-600 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Customer Service Representative</h1>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      San Francisco, CA
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Preview this post</button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    OPEN
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stats.applicants.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm font-medium">APPLICANTS</div>
                  </div>
                  <div className="absolute -right-4 -bottom-4">
                    <div className="w-24 h-24 border-8 border-cyan-500 rounded-full opacity-20"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stats.interviews.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm font-medium">INTERVIEWS</div>
                  </div>
                  <div className="absolute -right-4 -bottom-4">
                    <div className="w-24 h-24 border-8 border-blue-500 rounded-full opacity-20"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stats.forwards}</div>
                    <div className="text-gray-500 text-sm font-medium">FORWARDS</div>
                  </div>
                  <div className="absolute -right-4 -bottom-4">
                    <div className="w-24 h-24 border-8 border-purple-500 rounded-full opacity-20"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Applicants Activity</h3>
                    <div className="text-sm text-gray-500">
                      Wednesday, December 3
                      <div className="text-blue-600 font-medium">{stats.todayAppointments} Applicants / {stats.todayInterviews} Interviews</div>
                    </div>
                  </div>
                  
                  <div className="relative h-64">
                    <div className="absolute inset-0 flex items-end justify-between space-x-2">
                      {chartData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg relative"
                            style={{ height: `${(item.value / 400) * 100}%` }}
                          >
                            {index === 5 && (
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs">
                                {stats.todayAppointments} Applicants / {stats.todayInterviews} Interviews
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span>0</span>
                    <span>100</span>
                    <span>200</span>
                    <span>300</span>
                    <span>400</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {todayAppointments.slice(0, 4).map((appointment, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {appointment.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">{appointment.client}</div>
                          <div className="text-gray-500 text-xs truncate">{appointment.service}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {appointment.time}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">New Appointment</div>
                      <div className="text-xs text-gray-500">Schedule a meeting</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Add Client</div>
                      <div className="text-xs text-gray-500">New customer</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Process Payment</div>
                      <div className="text-xs text-gray-500">Handle billing</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">View Reports</div>
                      <div className="text-xs text-gray-500">Analytics & insights</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Job</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Active Job Postings</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {todayAppointments.map((appointment, idx) => (
                    <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-medium">
                            {appointment.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{appointment.service}</div>
                            <div className="text-sm text-gray-600">Client: {appointment.client}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Scheduled for {appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Client</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todayAppointments.map((client, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {client.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{client.client}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          +56 9 1234 5678
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-500">Last Service:</span>
                        <span className="ml-2 text-gray-900">{client.service}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Total Visits:</span>
                        <span className="ml-2 text-gray-900">{Math.floor(Math.random() * 20) + 1}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Total Spent:</span>
                        <span className="ml-2 text-gray-900">{formatCurrency(Math.floor(Math.random() * 500000) + 50000)}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Tasks & Analytics</h1>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>This month</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Today's Revenue</span>
                      <span className="font-bold text-green-600">{formatCurrency(1250000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-bold text-blue-600">{formatCurrency(8750000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-bold text-purple-600">{formatCurrency(32500000)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
                  <div className="space-y-3">
                    {['Corte de Cabello', 'Consulta Médica', 'Masaje Terapéutico', 'Tratamiento Facial'].map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-600">{service}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{Math.floor(Math.random() * 50) + 10}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Calendar View</h1>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Month</button>
                  <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">Week</button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Day</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-7 gap-4 mb-6">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, idx) => (
                    <div key={idx} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 35 }, (_, idx) => (
                    <div key={idx} className="aspect-square border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer">
                      <div className="text-sm text-gray-600">{((idx % 30) + 1)}</div>
                      {idx % 7 === 2 && (
                        <div className="mt-1">
                          <div className="w-full h-1 bg-blue-500 rounded mb-1"></div>
                          <div className="text-xs text-blue-600">3 citas</div>
                        </div>
                      )}
                      {idx % 7 === 4 && (
                        <div className="mt-1">
                          <div className="w-full h-1 bg-green-500 rounded mb-1"></div>
                          <div className="text-xs text-green-600">2 citas</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'users' || activeTab === 'locations' || activeTab === 'workflows') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'users' && <User className="h-8 w-8 text-gray-400" />}
                  {activeTab === 'locations' && <MapPin className="h-8 w-8 text-gray-400" />}
                  {activeTab === 'workflows' && <Settings className="h-8 w-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'locations' && 'Location Management'}
                  {activeTab === 'workflows' && 'Workflow Configuration'}
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is under development. Configure your {activeTab} settings here.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}