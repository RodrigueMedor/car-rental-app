import { useRole } from '../context/RoleContext'

export default function RoleGuard({ children, roles, fallback = null, permission }) {
  const { hasRole, can } = useRole()

  if (permission && !can(permission)) return fallback
  if (roles && !hasRole(...roles)) return fallback

  return children
}
