#!/usr/bin/env node

const readline = require("readline")
const { generateSecurePassword } = require("./libs/generateSecurePassword")

const DEFAULT_LENGTH = 16

function parseLengthArg(argv) {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]

    // --length=20
    const match = arg.match(/^(?:--length|--lenght|-l)=(.+)$/)
    if (match) return match[1]

    // --length 20
    if (arg === "--length" || arg === "--lenght" || arg === "-l") {
      return argv[i + 1]
    }
  }
  return undefined
}

function resolveLength(raw, fallback) {
  const length = parseInt(raw, 10)
  if (Number.isNaN(length) || length <= 0) return fallback
  return length
}

const rawLength = parseLengthArg(process.argv.slice(2))

if (rawLength !== undefined) {
  // Length provided via CLI flag — generate directly.
  const length = resolveLength(rawLength, DEFAULT_LENGTH)
  const password = generateSecurePassword(length)
  console.log(`Generated Password: ${password}`)
} else {
  // Interactive mode — prompt the user (defaults if left blank).
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(
    `Enter the length of the password (default ${DEFAULT_LENGTH}): `,
    (input) => {
      const length = resolveLength(input, DEFAULT_LENGTH)
      const password = generateSecurePassword(length)
      console.log(`Generated Password: ${password}`)
      rl.close()
    }
  )
}
