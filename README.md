# secure passgen

A simple command-line tool that allows you to generate random and secure passwords.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

```console
npm install -g secure-passgen
```

## Usage

```console
npx secure-passgen
```

## example

```console
npx secure-passgen
Enter the length of the password: 50
Generated Password: s_RU0w2aPx*SzAs3Q%5EbFLL0XyGb%UkoixBL^g5XlBjkSesEv
```

### implementation

```js
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
```
