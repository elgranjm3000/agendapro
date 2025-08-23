import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeding...')
  
  try {
    // Limpiar datos existentes
    await prisma.payment.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.appointment.deleteMany()
    await prisma.client.deleteMany()
    await prisma.service.deleteMany()
    await prisma.workSchedule.deleteMany()
    await prisma.businessSetting.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()
    
    console.log('🧹 Datos anteriores eliminados')
    
    // Usuario de demo
    const hashedPassword = await bcrypt.hash('demo123', 12)
    
    const user = await prisma.user.create({
      data: {
        email: 'demo@agenda.com',
        password: hashedPassword,
        name: 'Demo User',
        businessName: 'Salón Demo',
        businessAddress: 'Av. Principal 123, Santiago, Chile',
        businessPhone: '+56912345678',
        phone: '+56987654321'
      }
    })
    
    console.log('👤 Usuario demo creado')
    
    // Servicios de demo
    const services = await prisma.service.createMany({
      data: [
        { 
          userId: user.id, 
          name: 'Corte Clásico', 
          description: 'Corte tradicional de cabello',
          duration: 30, 
          price: 15000, 
          color: '#3B82F6' 
        },
        { 
          userId: user.id, 
          name: 'Peinado', 
          description: 'Peinado para eventos especiales',
          duration: 45, 
          price: 25000, 
          color: '#10B981' 
        },
        { 
          userId: user.id, 
          name: 'Tinte Completo', 
          description: 'Tinte de cabello completo',
          duration: 90, 
          price: 45000, 
          color: '#F59E0B' 
        },
        { 
          userId: user.id, 
          name: 'Manicure', 
          description: 'Manicure completo con esmaltado',
          duration: 60, 
          price: 18000, 
          color: '#EF4444' 
        },
        { 
          userId: user.id, 
          name: 'Masaje Facial', 
          description: 'Tratamiento facial relajante',
          duration: 50, 
          price: 35000, 
          color: '#8B5CF6' 
        }
      ]
    })
    
    console.log('💄 Servicios creados')
    
    // Clientes de demo
    const clientsData = [
      { userId: user.id, name: 'María González', email: 'maria@email.com', phone: '+56987654321', gender: 'FEMALE' },
      { userId: user.id, name: 'Carlos Ruiz', email: 'carlos@email.com', phone: '+56987654322', gender: 'MALE' },
      { userId: user.id, name: 'Ana López', email: 'ana@email.com', phone: '+56987654323', gender: 'FEMALE' },
      { userId: user.id, name: 'Pedro Silva', phone: '+56987654324', gender: 'MALE' },
      { userId: user.id, name: 'Laura Martín', email: 'laura@email.com', phone: '+56987654325', gender: 'FEMALE' },
      { userId: user.id, name: 'José Pérez', email: 'jose@email.com', phone: '+56987654326', gender: 'MALE' },
      { userId: user.id, name: 'Carmen Díaz', phone: '+56987654327', gender: 'FEMALE' },
      { userId: user.id, name: 'Roberto Soto', email: 'roberto@email.com', phone: '+56987654328', gender: 'MALE' }
    ]
    
    const clients = []
    for (const clientData of clientsData) {
      const client = await prisma.client.create({
        data: clientData
      })
      clients.push(client)
    }
    
    console.log('👥 Clientes creados')
    
    // Horarios de trabajo (Lunes a Sábado)
    await prisma.workSchedule.createMany({
      data: [
        { userId: user.id, dayOfWeek: 1, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') }, // Lunes
        { userId: user.id, dayOfWeek: 2, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') }, // Martes
        { userId: user.id, dayOfWeek: 3, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') }, // Miércoles
        { userId: user.id, dayOfWeek: 4, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') }, // Jueves
        { userId: user.id, dayOfWeek: 5, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') }, // Viernes
        { userId: user.id, dayOfWeek: 6, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T15:00:00') }  // Sábado
      ]
    })
    
    console.log('⏰ Horarios de trabajo creados')
    
    // Obtener servicios creados para las citas
    const createdServices = await prisma.service.findMany({
      where: { userId: user.id }
    })
    
    // Citas de demo (próximos días)
    const today = new Date()
    const appointmentsData = []
    
    // Crear citas para los próximos 7 días
    for (let i = 0; i < 7; i++) {
      const appointmentDate = new Date(today)
      appointmentDate.setDate(today.getDate() + i)
      
      // Solo crear citas para días laborales (lunes a sábado)
      const dayOfWeek = appointmentDate.getDay()
      if (dayOfWeek === 0) continue // Skip domingo
      
      // 2-4 citas por día
      const appointmentsPerDay = Math.floor(Math.random() * 3) + 2
      
      for (let j = 0; j < appointmentsPerDay; j++) {
        const randomClient = clients[Math.floor(Math.random() * clients.length)]
        const randomService = createdServices[Math.floor(Math.random() * createdServices.length)]
        
        const startHour = 9 + Math.floor(Math.random() * 8) // 9:00 - 16:00
        const startTime = new Date(`2000-01-01T${startHour.toString().padStart(2, '0')}:00:00`)
        const endTime = new Date(startTime.getTime() + randomService.duration * 60000)
        
        appointmentsData.push({
          userId: user.id,
          clientId: randomClient.id,
          serviceId: randomService.id,
          appointmentDate,
          startTime,
          endTime,
          price: randomService.price,
          status: i === 0 ? 'CONFIRMED' : 'SCHEDULED', // Hoy confirmadas, futuras programadas
          notes: j === 0 ? 'Cliente regular, prefiere estilo clásico' : undefined
        })
      }
    }
    
    // Crear algunas citas pasadas (completadas)
    for (let i = 1; i <= 10; i++) {
      const appointmentDate = new Date(today)
      appointmentDate.setDate(today.getDate() - i)
      
      const dayOfWeek = appointmentDate.getDay()
      if (dayOfWeek === 0) continue // Skip domingo
      
      const randomClient = clients[Math.floor(Math.random() * clients.length)]
      const randomService = createdServices[Math.floor(Math.random() * createdServices.length)]
      
      const startHour = 9 + Math.floor(Math.random() * 7)
      const startTime = new Date(`2000-01-01T${startHour.toString().padStart(2, '0')}:00:00`)
      const endTime = new Date(startTime.getTime() + randomService.duration * 60000)
      
      appointmentsData.push({
        userId: user.id,
        clientId: randomClient.id,
        serviceId: randomService.id,
        appointmentDate,
        startTime,
        endTime,
        price: randomService.price,
        status: 'COMPLETED',
        paymentStatus: 'PAID'
      })
    }
    
    // Crear citas
    const createdAppointments = []
    for (const appointmentData of appointmentsData) {
      const appointment = await prisma.appointment.create({
        data: appointmentData
      })
      createdAppointments.push(appointment)
    }
    
    console.log('📅 Citas creadas')
    
    // Pagos para citas completadas
    const completedAppointments = createdAppointments.filter(apt => apt.status === 'COMPLETED')
    
    for (const appointment of completedAppointments) {
      await prisma.payment.create({
        data: {
          appointmentId: appointment.id,
          userId: user.id,
          clientId: appointment.clientId,
          amount: appointment.price || 0,
          paymentMethod: Math.random() > 0.5 ? 'CASH' : 'CARD',
          status: 'COMPLETED',
          paidAt: appointment.appointmentDate
        }
      })
    }
    
    console.log('💳 Pagos creados')
    
    // Configuraciones del negocio
    await prisma.businessSetting.createMany({
      data: [
        { userId: user.id, settingKey: 'whatsappEnabled', settingValue: 'true' },
        { userId: user.id, settingKey: 'whatsappNumber', settingValue: '+56912345678' },
        { userId: user.id, settingKey: 'emailEnabled', settingValue: 'true' },
        { userId: user.id, settingKey: 'reminderHours', settingValue: '24' },
        { userId: user.id, settingKey: 'confirmationEnabled', settingValue: 'true' },
        { userId: user.id, settingKey: 'currency', settingValue: 'CLP' },
        { userId: user.id, settingKey: 'timeZone', settingValue: 'America/Santiago' },
        { 
          userId: user.id, 
          settingKey: 'emailTemplate', 
          settingValue: 'Hola {clientName}, te recordamos tu cita para {appointmentDate} a las {appointmentTime} para {serviceName}. ¡Te esperamos!'
        },
        { 
          userId: user.id, 
          settingKey: 'whatsappTemplate', 
          settingValue: 'Hola {clientName}! 👋\n\nTe recordamos tu cita:\n📅 {appointmentDate}\n🕐 {appointmentTime}\n💄 {serviceName}\n\n¡Te esperamos en {businessName}!'
        }
      ]
    })
    
    console.log('⚙️ Configuraciones creadas')
    
    console.log('✅ Seeding completado exitosamente!')
    console.log('')
    console.log('🎉 Datos de acceso:')
    console.log('📧 Email: demo@agenda.com')
    console.log('🔑 Password: demo123')
    console.log('🏪 Negocio: Salón Demo')
    console.log(`👥 Clientes: ${clients.length}`)
    console.log(`💄 Servicios: ${createdServices.length}`)
    console.log(`📅 Citas: ${createdAppointments.length}`)
    console.log('')
    console.log('🚀 Inicia el servidor con: npm run dev')
    console.log('🌐 Accede a: http://localhost:3000')
    
  } catch (error) {
    console.error('❌ Error durante el seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })