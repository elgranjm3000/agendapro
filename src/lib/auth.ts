import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number }
  } catch {
    return null
  }
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = generateToken(userId)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
  
  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt
    }
  })
  
  return sessionId
}

export async function validateSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session
}
