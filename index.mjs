import mod from "./index.cjs"

const generatePassword = mod

export default generatePassword
export { generatePassword }
export const DEFAULT_LENGTH = mod.DEFAULT_LENGTH
// Backwards-compatible alias for the original function name.
export const generateSecurePassword = mod
