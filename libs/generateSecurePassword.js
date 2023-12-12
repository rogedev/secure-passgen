const crypto = require("crypto")

function generateSecurePassword(n) {
  const CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+"

  const randomBytes = crypto.randomBytes(n)
  const pass = new Array(n)

  for (let i = 0; i < n; i++) {
    pass[i] = CHARACTERS[randomBytes[i] % CHARACTERS.length]
  }

  return pass.join("")
}

module.exports = { generateSecurePassword }
