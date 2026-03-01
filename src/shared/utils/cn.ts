/**
 * Joins class names, filtering out falsy values.
 * Lightweight alternative to clsx for conditional Tailwind classes.
 *
 * @example
 * cn("p-4", isActive && "bg-blue-500", disabled && "opacity-50")
 * // => "p-4 bg-blue-500" (when isActive is true, disabled is false)
 */
export function cn(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ")
}
