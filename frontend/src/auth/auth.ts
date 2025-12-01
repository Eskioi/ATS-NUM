export type Role = keyof typeof ROLES

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export function isAdmin(): boolean {
  const role = localStorage.getItem('role')
  return role === ROLES.ADMIN
}