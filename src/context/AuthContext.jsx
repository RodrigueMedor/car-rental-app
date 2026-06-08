import { createContext, useContext, useState, useCallback } from 'react'
import { users } from '../data/users'
import { ROLES } from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const login = useCallback((email, password, role) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (found) {
      setCurrentUser(found)
      return { success: true, user: found }
    }
    return { success: false, error: 'No account found with that email.' }
  }, [])

  const signup = useCallback((name, email, role = ROLES.CUSTOMER) => {
    const newUser = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      phone: '',
      role,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      driverScore: 5.0,
      badges: [],
    }
    users.push(newUser)
    setCurrentUser(newUser)
    return { success: true, user: newUser, role }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const hasRole = useCallback(
    (...roles) => {
      if (!currentUser) return false
      return roles.some((r) => currentUser.role === r)
    },
    [currentUser]
  )

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
