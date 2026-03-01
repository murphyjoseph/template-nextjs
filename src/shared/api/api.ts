/**
 * An error thrown when a fetch response has a non-OK status code.
 *
 * @example
 * ```ts
 * try {
 *   await api<User>("/api/users/1")
 * } catch (err) {
 *   if (err instanceof HttpError) {
 *     console.log(err.status) // 404
 *   }
 * }
 * ```
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

/**
 * A thin, typed wrapper around `fetch` — keeps things lean while adding
 * just enough convenience to avoid repetitive boilerplate:
 *
 * - Sets `Content-Type: application/json` by default (override via `options.headers`)
 * - Throws {@link HttpError} on non-OK responses
 * - Returns `undefined` for 204 No Content
 * - Parses and returns typed JSON otherwise
 *
 * @example
 * ```ts
 * // GET
 * const users = await api<User[]>("/api/users")
 *
 * // POST
 * const created = await api<User>("/api/users", {
 *   method: "POST",
 *   body: JSON.stringify({ name: "Ada" }),
 * })
 *
 * // DELETE (204 No Content)
 * await api<void>("/api/users/1", { method: "DELETE" })
 * ```
 */
export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    throw new HttpError(res.status, `${res.status} ${res.statusText}`)
  }

  if (res.status === 204) return undefined as T

  try {
    return await res.json()
  } catch {
    throw new HttpError(res.status, "Response is not valid JSON")
  }
}
