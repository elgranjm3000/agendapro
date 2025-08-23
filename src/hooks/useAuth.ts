import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { apiClient } from '@/lib/api-client'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; password: string; businessName?: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await apiClient.me()
      setUser(response.user)
    } catch (error) {
      console.log('No authenticated user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password })
    setUser(response.user)
  }

  const register = async (data: { name: string; email: string; password: string; businessName?: string }) => {
    const response = await apiClient.register(data)
    setUser(response.user)
  }

  const logout = async () => {
    await apiClient.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}