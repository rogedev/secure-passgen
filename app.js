#!/usr/bin/env node

const readline = require("readline")
const { generateSecurePassword } = require("./libs/generateSecurePassword")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question("Enter the length of the password: ", (length) => {
  const password = generateSecurePassword(parseInt(length, 10))
  console.log(`Generated Password: ${password}`)
  rl.close()
})
