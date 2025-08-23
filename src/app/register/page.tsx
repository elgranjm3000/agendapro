import React, { useState } from 'react';
import { Eye, EyeOff, Calendar, CheckCircle, ArrowRight, User, Mail, Building2, Phone } from 'lucide-react';

export default function ModernRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Cuenta creada exitosamente!');
    }, 2000);
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Panel - Features */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Agenda<span className="text-purple-400">Pro</span>
            </h1>
          </div>
          
          <div className="space-y-8 max-w-md">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Comienza tu transformación digital
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed">
                Únete a miles de profesionales que ya optimizaron su gestión con nuestra plataforma.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-semibold">Configuración en 5 minutos</div>
                  <div className="text-purple-200 text-sm">Sin complicaciones técnicas</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-semibold">14 días gratis</div>
                  <div className="text-purple-200 text-sm">Sin tarjeta de crédito</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-semibold">Soporte 24/7</div>
                  <div className="text-purple-200 text-sm">Te ayudamos en cada paso</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-2">
                +40% de ingresos promedio
              </div>
              <div className="text-purple-200 text-sm">
                reportado por nuestros usuarios después del primer mes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 lg:flex-none lg:w-96 xl:w-[32rem] bg-white flex flex-col justify-center px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Agenda<span className="text-purple-600">Pro</span>
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'Crea tu cuenta' : 'Información de tu negocio'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1 
                ? 'Comienza tu prueba gratuita de 14 días'
                : 'Personaliza tu experiencia (opcional)'
              }
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.password && formData.password.length < 6 && (
                  <p className="text-xs text-red-500 mt-1">La contraseña debe tener al menos 6 caracteres</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Repite tu contraseña"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                )}
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" />
                  Nombre de tu negocio
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Ej: Salón María, Dr. García, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">¿Qué incluye tu prueba gratuita?</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                    14 días completamente gratis
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                    Todas las funciones incluidas
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                    Sin tarjeta de crédito requerida
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                    Soporte personalizado
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                  Acepto los{' '}
                  <button className="text-purple-600 hover:text-purple-500 font-medium">
                    términos y condiciones
                  </button>{' '}
                  y la{' '}
                  <button className="text-purple-600 hover:text-purple-500 font-medium">
                    política de privacidad
                  </button>
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={prevStep}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 font-medium transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.acceptTerms}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Crear cuenta</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}