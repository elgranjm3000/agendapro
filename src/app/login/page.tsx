'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Calendar, Users, ChevronRight } from 'lucide-react';

export default function ModernLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simular login
    setTimeout(() => {
      setLoading(false);
      alert('Login exitoso!');
    }, 2000);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@agendapro.com',
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Agenda<span className="text-blue-400">Pro</span>
            </h1>
          </div>
          
          <div className="space-y-8 max-w-md">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Gestiona tu negocio de forma inteligente
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                La plataforma más completa para administrar citas, clientes y pagos en un solo lugar.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">1,000+</div>
                <div className="text-blue-200 text-sm">Negocios activos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-blue-200 text-sm">Citas gestionadas</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-blue-200">
                <div className="text-sm font-medium">Únete a miles de profesionales</div>
                <div className="text-xs opacity-80">que ya confían en nosotros</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 lg:flex-none lg:w-96 xl:w-[28rem] bg-white flex flex-col justify-center px-6 lg:px-8">
        <div className="w-full max-w-sm mx-auto space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Agenda<span className="text-blue-600">Pro</span>
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
              Bienvenido de vuelta
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center lg:text-left">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {/* Demo Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Probar con cuenta demo
          </button>
          
          <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg py-2 px-3">
            Email: demo@agendapro.com • Password: demo123
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o continúa con email</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Iniciar sesión</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Regístrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}