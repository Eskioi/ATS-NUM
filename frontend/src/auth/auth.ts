export type Role = keyof typeof ROLES

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export function isAdmin(): boolean {
  const role = localStorage.getItem('role')
  return role === ROLES.ADMIN
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('jwtToken')
}

export function getRole(): Role | null {
  const role = localStorage.getItem('role')
  return role as Role | null
}

export function clearAuth(): void {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('role')
}