"use client"

import { createContext, useContext } from "react"

/**
 * Creates a context/hook pair that throws if the hook is called
 * outside its provider. Eliminates the repetitive null-check
 * boilerplate that every context consumer would otherwise need.
 *
 * @example
 * type AuthContext = { user: User; logout: () => void }
 * const [AuthProvider, useAuth] = createSafeContext<AuthContext>("Auth")
 *
 * // In a parent component:
 * <AuthProvider value={{ user, logout }}>
 *   <Dashboard />
 * </AuthProvider>
 *
 * // In a child component:
 * const { user, logout } = useAuth()
 *
 * // If called outside AuthProvider:
 * // throws "useAuth must be used within a AuthProvider"
 */
export function createSafeContext<T>(name: string) {
  const Context = createContext<T | null>(null)

  function useSafeContext(): T {
    const value = useContext(Context)
    if (value === null) {
      throw new Error(`use${name} must be used within a ${name}Provider`)
    }
    return value
  }

  return [Context.Provider, useSafeContext] as const
}
