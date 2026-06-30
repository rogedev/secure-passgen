// Backwards-compatible re-export. The implementation now lives in ../index.cjs.
const generatePassword = require("../index.cjs")

module.exports = { generateSecurePassword: generatePassword }
