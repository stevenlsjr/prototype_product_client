import { AuthUser } from "../lib/models"


export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

export function state(): AuthState {
  return {
    user: null,
    isAuthenticated: false
  }
}
