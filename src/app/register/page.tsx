'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Eye, 
  EyeOff, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  User, 
  Mail, 
  Building2, 
  Phone,
  Sparkles,
  Star,
  TrendingUp
} from 'lucide-react'

export default function ModernRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
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

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name) newErrors.name = 'El nombre es requerido'
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return
    
    setIsLoading(true)
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aquí iría la lógica real usando tu ruta /api/auth/register
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // Por ahora, simular registro exitoso
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error en registro:', error)
      setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
    setErrors({})
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <>
      <div className="min-vh-100 d-flex" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
      }}>
        {/* Left Panel - Features */}
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center justify-content-center position-relative overflow-hidden">
          {/* Background Elements */}
          <div className="position-absolute w-100 h-100">
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   top: '15%', 
                   left: '20%', 
                   width: '200px', 
                   height: '200px', 
                   background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                   filter: 'blur(40px)'
                 }}></div>
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   top: '40%', 
                   right: '20%', 
                   width: '280px', 
                   height: '280px', 
                   background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                   filter: 'blur(40px)',
                   animationDelay: '1s'
                 }}></div>
            <div className="position-absolute rounded-circle opacity-25 pulse-soft" 
                 style={{
                   bottom: '15%', 
                   left: '15%', 
                   width: '220px', 
                   height: '220px', 
                   background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                   filter: 'blur(40px)',
                   animationDelay: '2s'
                 }}></div>
          </div>

          <div className="position-relative z-1 px-5" style={{maxWidth: '550px'}}>
            {/* Logo */}
            <div className="animate-on-load opacity-0 mb-5" style={{transform: 'translateY(30px)'}}>
              <div className="d-flex align-items-center mb-5">
                <div className="d-flex align-items-center justify-content-center rounded-3 me-3 shadow-soft" 
                     style={{
                       width: '50px', 
                       height: '50px',
                       background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                     }}>
                  <Calendar size={24} className="text-white" />
                </div>
                <h1 className="fs-2 fw-bold mb-0">
                  Agenda<span style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Pro</span>
                </h1>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="animate-on-load opacity-0" style={{transform: 'translateY(30px)', animationDelay: '0.2s'}}>
              <h2 className="display-5 fw-bold text-dark mb-4 lh-1">
                Comienza tu transformación{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>digital</span>
              </h2>
              <p className="fs-5 text-muted mb-5 lh-base">
                Únete a miles de profesionales que ya optimizaron su gestión con nuestra plataforma.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="animate-on-load opacity-0" style={{transform: 'translateY(30px)', animationDelay: '0.4s'}}>
              <div className="row g-3 mb-5">
                <div className="col-12">
                  <div className="d-flex align-items-center p-4 bg-glass rounded-3 border-soft">
                    <div className="bg-success d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{width: '45px', height: '45px'}}>
                      <CheckCircle size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Configuración en 5 minutos</div>
                      <div className="text-muted">Sin complicaciones técnicas</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="d-flex align-items-center p-4 bg-glass rounded-3 border-soft">
                    <div className="d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{
                           width: '45px', 
                           height: '45px',
                           background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                         }}>
                      <Star size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">14 días gratis</div>
                      <div className="text-muted">Sin tarjeta de crédito</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="d-flex align-items-center p-4 bg-glass rounded-3 border-soft">
                    <div className="d-flex align-items-center justify-content-center rounded-2 me-3" 
                         style={{
                           width: '45px', 
                           height: '45px',
                           background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                         }}>
                      <Sparkles size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Soporte 24/7</div>
                      <div className="text-muted">Te ayudamos en cada paso</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="bg-glass rounded-3 p-4 border-soft">
                <div className="fs-3 fw-bold text-dark mb-2">
                  +40% de ingresos promedio
                </div>
                <div className="text-muted">
                  reportado por nuestros usuarios después del primer mes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="col-12 col-lg-5 col-xl-4 bg-white d-flex align-items-center justify-content-center min-vh-100 position-relative">
          {/* Mobile Logo */}
          <div className="d-lg-none position-absolute top-0 start-0 w-100 text-center pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center rounded-2 me-2" 
                   style={{
                     width: '32px', 
                     height: '32px',
                     background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                   }}>
                <Calendar size={16} className="text-white" />
              </div>
              <span className="fw-bold fs-5">
                Agenda<span style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Pro</span>
              </span>
            </div>
          </div>

          <div className="w-100 px-4 px-lg-5" style={{maxWidth: '420px'}}>
            {/* Progress Indicator */}
            <div className="d-flex justify-content-center mb-4">
              <div className="d-flex align-items-center">
                <div className={`rounded-circle ${step >= 1 ? 'bg-primary' : 'bg-light'} me-2`} 
                     style={{width: '12px', height: '12px'}}></div>
                <div className={`${step >= 2 ? 'bg-primary' : 'bg-light'} me-2`} 
                     style={{width: '32px', height: '4px', borderRadius: '2px'}}></div>
                <div className={`rounded-circle ${step >= 2 ? 'bg-primary' : 'bg-light'}`} 
                     style={{width: '12px', height: '12px'}}></div>
              </div>
            </div>

            {/* Header */}
            <div className="animate-on-load opacity-0 text-center mb-4" style={{transform: 'translateY(20px)'}}>
              <h2 className="display-6 fw-bold text-dark mb-2">
                {step === 1 ? 'Crea tu cuenta' : 'Información de tu negocio'}
              </h2>
              <p className="text-muted">
                {step === 1 
                  ? 'Comienza tu prueba gratuita de 14 días'
                  : 'Personaliza tu experiencia (opcional)'
                }
              </p>
            </div>

            {errors.general && (
              <div className="alert alert-danger mb-4">
                {errors.general}
              </div>
            )}

            {step === 1 && (
              <div className="animate-on-load opacity-0" style={{transform: 'translateY(20px)', animationDelay: '0.1s'}}>
                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <User size={16} className="me-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <Mail size={16} className="me-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Contraseña *
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control form-control-lg pe-5 ${errors.password ? 'is-invalid' : ''}`}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Mínimo 6 caracteres"
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
                  {formData.password && formData.password.length < 6 && (
                    <div className="form-text text-danger">La contraseña debe tener al menos 6 caracteres</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Repite tu contraseña"
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="form-text text-danger">Las contraseñas no coinciden</div>
                  )}
                </div>

                <button
                  onClick={nextStep}
                  className="btn btn-primary btn-lg w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                >
                  Continuar
                  <ArrowRight size={18} className="ms-2" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-on-load opacity-0" style={{transform: 'translateY(20px)', animationDelay: '0.1s'}}>
                <div className="mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <Building2 size={16} className="me-2" />
                    Nombre de tu negocio
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Ej: Salón María, Dr. García, etc."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <Phone size={16} className="me-2" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="mb-4 p-4 rounded-3" style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <h6 className="fw-bold text-primary mb-3">¿Qué incluye tu prueba gratuita?</h6>
                  <div className="row g-2 small">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <CheckCircle size={16} className="text-success me-2 flex-shrink-0" />
                        14 días completamente gratis
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <CheckCircle size={16} className="text-success me-2 flex-shrink-0" />
                        Todas las funciones incluidas
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <CheckCircle size={16} className="text-success me-2 flex-shrink-0" />
                        Sin tarjeta de crédito requerida
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <CheckCircle size={16} className="text-success me-2 flex-shrink-0" />
                        Soporte personalizado
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    />
                    <label className="form-check-label small text-muted" htmlFor="acceptTerms">
                      Acepto los{' '}
                      <a href="#" className="text-primary text-decoration-none fw-medium">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-primary text-decoration-none fw-medium">
                        política de privacidad
                      </a>
                    </label>
                    {errors.acceptTerms && <div className="invalid-feedback d-block">{errors.acceptTerms}</div>}
                  </div>
                </div>

                <div className="row g-2 mb-4">
                  <div className="col">
                    <button
                      onClick={prevStep}
                      className="btn btn-outline-secondary btn-lg w-100 py-3 fw-semibold"
                    >
                      Atrás
                    </button>
                  </div>
                  <div className="col">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !formData.acceptTerms}
                      className="btn btn-primary btn-lg w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Creando...
                        </>
                      ) : (
                        <>
                          Crear cuenta
                          <ArrowRight size={18} className="ms-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="animate-on-load opacity-0 text-center" style={{transform: 'translateY(20px)', animationDelay: '0.3s'}}>
              <p className="text-muted mb-0">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-primary text-decoration-none fw-semibold">
                  Inicia sesión
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

        .btn:hover:not(:disabled) {
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