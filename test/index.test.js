const test = require("node:test")
const assert = require("node:assert/strict")

const generatePassword = require("../index.cjs")
const { generateSecurePassword, DEFAULT_LENGTH } = require("../index.cjs")

const CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+"

test("default export is callable and uses the default length", () => {
  const pw = generatePassword()
  assert.equal(typeof pw, "string")
  assert.equal(pw.length, DEFAULT_LENGTH)
})

test("respects a requested length", () => {
  assert.equal(generatePassword(1).length, 1)
  assert.equal(generatePassword(64).length, 64)
})

test("only emits characters from the allowed set", () => {
  const pw = generatePassword(500)
  for (const ch of pw) {
    assert.ok(CHARSET.includes(ch), `unexpected character: ${JSON.stringify(ch)}`)
  }
})

test("produces different passwords across calls", () => {
  assert.notEqual(generatePassword(32), generatePassword(32))
})

test("named and alias exports point at the same function", () => {
  const { generatePassword: named } = require("../index.cjs")
  assert.equal(named, generatePassword)
  assert.equal(generateSecurePassword, generatePassword)
})

test("rejects non-integer lengths", () => {
  assert.throws(() => generatePassword(1.5), TypeError)
  assert.throws(() => generatePassword("8"), TypeError)
})

test("rejects lengths below 1", () => {
  assert.throws(() => generatePassword(0), RangeError)
  assert.throws(() => generatePassword(-4), RangeError)
})

test("distribution is roughly uniform (no modulo bias)", () => {
  const counts = new Map()
  const n = 60000
  const pw = generatePassword(n)
  for (const ch of pw) counts.set(ch, (counts.get(ch) || 0) + 1)

  const expected = n / CHARSET.length
  for (const ch of CHARSET) {
    const c = counts.get(ch) || 0
    // Allow a generous +/-40% band; biased modulo would skew far beyond this.
    assert.ok(
      c > expected * 0.6 && c < expected * 1.4,
      `char ${JSON.stringify(ch)} count ${c} outside expected band around ${expected}`
    )
  }
})

test("ESM entry exposes default and named exports", async () => {
  const mod = await import("../index.mjs")
  assert.equal(typeof mod.default, "function")
  assert.equal(mod.generatePassword, mod.default)
  assert.equal(mod.default(12).length, 12)
})
