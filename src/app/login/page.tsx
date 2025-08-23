'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Eye, 
  EyeOff, 
  Calendar, 
  ArrowRight, 
  Mail, 
  Lock,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Star
} from 'lucide-react'

export default function ModernLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const router = useRouter()

  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.animate-on-load')
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in')
      }, index * 100)
    })
  }, [])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aquí iría la lógica real de autenticación usando tus rutas API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

       if (response.ok) {
        const data = await response.json()
        // Login exitoso
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        setErrors({ 
          general: errorData.error || 'Credenciales inválidas. Verifica tu email y contraseña.' 
        })
      }
      
      // Por ahora, simular login exitoso
      //router.push('/dashboard')
      
    } catch (error) {
      console.error('Error en login:', error)
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@agenda.com',
      password: 'demo123'
    })
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <>
      <div className="min-vh-100 d-flex" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
      }}>
        {/* Left Panel - Branding & Features */}
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center justify-content-center position-relative overflow-hidden">
          {/* Background Elements */}
          <div className="position-absolute w-100 h-100">
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   top: '20%', 
                   left: '15%', 
                   width: '250px', 
                   height: '250px', 
                   background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                   filter: 'blur(40px)'
                 }}></div>
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   top: '50%', 
                   right: '15%', 
                   width: '200px', 
                   height: '200px', 
                   background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                   filter: 'blur(40px)',
                   animationDelay: '1s'
                 }}></div>
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   bottom: '20%', 
                   left: '25%', 
                   width: '180px', 
                   height: '180px', 
                   background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                   filter: 'blur(40px)',
                   animationDelay: '2s'
                 }}></div>
          </div>

          <div className="position-relative z-1 px-5" style={{maxWidth: '500px'}}>
            {/* Logo */}
            <div className="animate-on-load opacity-0 mb-5" style={{transform: 'translateY(30px)'}}>
              <div className="d-flex align-items-center mb-5">
                <div className="bg-gradient d-flex align-items-center justify-content-center rounded-3 me-3 shadow-soft" 
                     style={{width: '50px', height: '50px'}}>
                  <Calendar size={24} className="text-white" />
                </div>
                <h1 className="fs-2 fw-bold mb-0">
                  Agenda<span className="text-gradient-primary">Pro</span>
                </h1>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="animate-on-load opacity-0" style={{transform: 'translateY(30px)', animationDelay: '0.2s'}}>
              <h2 className="display-5 fw-bold text-dark mb-4 lh-1">
                Transforma tu negocio con{' '}
                <span className="text-gradient-primary">inteligencia</span>
              </h2>
              <p className="fs-5 text-muted mb-5 lh-base">
                Únete a más de 2,500 profesionales que ya optimizaron su gestión 
                y aumentaron sus ingresos un 40% promedio.
              </p>
            </div>
            
            {/* Features */}
            <div className="animate-on-load opacity-0" style={{transform: 'translateY(30px)', animationDelay: '0.4s'}}>
              <div className="row g-3 mb-5">
                <div className="col-12">
                  <div className="d-flex align-items-center p-3 bg-glass rounded-3 border-soft">
                    <div className="bg-success d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{width: '40px', height: '40px'}}>
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Configuración instantánea</div>
                      <div className="small text-muted">Lista en menos de 5 minutos</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="d-flex align-items-center p-3 bg-glass rounded-3 border-soft">
                    <div className="d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{
                           width: '40px', 
                           height: '40px',
                           background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
                         }}>
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">IA integrada</div>
                      <div className="small text-muted">Optimización automática de horarios</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="d-flex align-items-center p-3 bg-glass rounded-3 border-soft">
                    <div className="d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{
                           width: '40px', 
                           height: '40px',
                           background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                         }}>
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Resultados comprobados</div>
                      <div className="small text-muted">+40% de ingresos promedio</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="d-flex align-items-center">
                <div className="d-flex me-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="rounded-circle border border-white me-n2" style={{
                      width: '40px',
                      height: '40px',
                      background: `linear-gradient(135deg, hsl(${200 + i * 40}, 70%, 60%) 0%, hsl(${240 + i * 40}, 70%, 60%) 100%)`
                    }}></div>
                  ))}
                </div>
                <div className="small text-muted">
                  <div className="fw-semibold text-dark">+2,500 profesionales</div>
                  <div className="d-flex align-items-center">
                    <Star size={14} className="text-warning me-1" fill="currentColor" />
                    4.9/5 confianza
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="col-12 col-lg-5 col-xl-4 bg-white d-flex align-items-center justify-content-center min-vh-100 position-relative">
          {/* Mobile Logo */}
          <div className="d-lg-none position-absolute top-0 start-0 w-100 text-center pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-primary d-flex align-items-center justify-content-center rounded-2 me-2" 
                   style={{width: '32px', height: '32px'}}>
                <Calendar size={16} className="text-white" />
              </div>
              <span className="fw-bold fs-5">
                Agenda<span className="text-gradient-primary">Pro</span>
              </span>
            </div>
          </div>

          <div className="w-100 px-4 px-lg-5" style={{maxWidth: '400px'}}>
            {/* Header */}
            <div className="animate-on-load opacity-0 text-center mb-5" style={{transform: 'translateY(20px)'}}>
              <h2 className="display-6 fw-bold text-dark mb-2">
                Bienvenido de vuelta
              </h2>
              <p className="text-muted">
                Ingresa a tu cuenta para continuar gestionando tu negocio
              </p>
            </div>

            {/* Demo Access */}
            <div className="animate-on-load opacity-0 mb-4" style={{transform: 'translateY(20px)', animationDelay: '0.1s'}}>
              <button
                onClick={handleDemoLogin}
                className="btn w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none'
                }}
              >
                <Sparkles size={18} className="me-2" />
                Probar con cuenta demo
              </button>
              <div className="text-center mt-2">
                <small className="text-muted bg-light rounded px-3 py-2 d-inline-block">
                  <strong>Email:</strong> demo@agenda.com • <strong>Pass:</strong> demo123
                </small>
              </div>
            </div>

            <div className="animate-on-load opacity-0 mb-4" style={{transform: 'translateY(20px)', animationDelay: '0.2s'}}>
              <div className="position-relative text-center">
                <hr className="my-4" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                  o continúa con email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="animate-on-load opacity-0" style={{transform: 'translateY(20px)', animationDelay: '0.3s'}}>
              {errors.general && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <div>{errors.general}</div>
                </div>
              )}

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold d-flex align-items-center">
                  <Mail size={16} className="me-2" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold d-flex align-items-center">
                  <Lock size={16} className="me-2" />
                  Contraseña
                </label>
                <div className="position-relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`form-control form-control-lg pe-5 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                    style={{border: 'none', background: 'none'}}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              {/* Options */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label small text-muted" htmlFor="remember">
                    Recordarme
                  </label>
                </div>
                <Link href="/forgot-password" className="small text-primary text-decoration-none fw-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-100 py-3 fw-semibold d-flex align-items-center justify-content-center mb-4"
              >
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight size={18} className="ms-2" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="animate-on-load opacity-0 text-center" style={{transform: 'translateY(20px)', animationDelay: '0.4s'}}>
              <p className="text-muted mb-0">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-primary text-decoration-none fw-semibold">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-on-load {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-on-load.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .form-control:focus {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        @media (max-width: 991px) {
          .min-vh-100 {
            padding-top: 80px;
            padding-bottom: 40px;
          }
        }
      `}</style>
    </>
  )
}