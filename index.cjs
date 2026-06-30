const crypto = require("crypto")

const CHARACTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+"

const DEFAULT_LENGTH = 16

/**
 * Generate a cryptographically secure random password.
 *
 * Characters are drawn uniformly (via `crypto.randomInt`, which uses rejection
 * sampling) from the set `a-z A-Z 0-9 !@#$%^&*()-_=+`, so there is no modulo bias.
 *
 * @param {number} [length=16] Number of characters in the password. Must be a
 *   positive integer.
 * @returns {string} The generated password.
 * @throws {TypeError} If `length` is not an integer.
 * @throws {RangeError} If `length` is less than 1.
 *
 * @example
 * const password = generatePassword()    // 16-char password
 * const longer = generatePassword(32)    // 32-char password
 */
function generatePassword(length = DEFAULT_LENGTH) {
  if (!Number.isInteger(length)) {
    throw new TypeError(
      `length must be an integer, received ${typeof length === "number" ? length : typeof length}`
    )
  }
  if (length < 1) {
    throw new RangeError(`length must be at least 1, received ${length}`)
  }

  const pass = new Array(length)
  for (let i = 0; i < length; i++) {
    pass[i] = CHARACTERS[crypto.randomInt(CHARACTERS.length)]
  }
  return pass.join("")
}

module.exports = generatePassword
module.exports.generatePassword = generatePassword
// Backwards-compatible alias for the original function name.
module.exports.generateSecurePassword = generatePassword
module.exports.default = generatePassword
module.exports.DEFAULT_LENGTH = DEFAULT_LENGTH
