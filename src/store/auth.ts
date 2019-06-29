import { AuthUser, Jwt } from "../lib/models";
import { Module } from "vuex";

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  jwt: Jwt | null;
}

export function state(): AuthState {
  return {
    user: null,
    jwt: null,
    isAuthenticated: false
  };
}

export default function authModule(): Module<AuthState, AuthState> {
  return {
    state: state()
  };
}
