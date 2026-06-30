/**
 * Generate a cryptographically secure random password.
 *
 * Characters are drawn uniformly from `a-z A-Z 0-9 !@#$%^&*()-_=+` with no
 * modulo bias.
 *
 * @param length Number of characters in the password (default `16`). Must be a
 *   positive integer.
 * @returns The generated password.
 * @throws {TypeError} If `length` is not an integer.
 * @throws {RangeError} If `length` is less than 1.
 *
 * @example
 * import newPassword, { generatePassword } from "secure-passgen"
 * const a = newPassword()        // 16-char password
 * const b = generatePassword(32) // 32-char password
 */
export function generatePassword(length?: number): string

/** Default password length used when no length is provided. */
export const DEFAULT_LENGTH: number

/** @deprecated Use {@link generatePassword}. Kept for backwards compatibility. */
export const generateSecurePassword: typeof generatePassword

export default generatePassword
