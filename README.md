# secure passgen

A simple command-line tool that allows you to generate random and secure passwords.
this app is used as an example about how to publish packages in npm.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

```console
npm install -g secure-passgen
```

## Usage

Run it interactively (press Enter to use the default length of 16):

```console
npx secure-passgen
```

Or pass the length directly with the `--length` flag (alias `-l`):

```console
npx secure-passgen --length 20
```

## example

```console
npx secure-passgen --length 50
Generated Password: s_RU0w2aPx*SzAs3Q%5EbFLL0XyGb%UkoixBL^g5XlBjkSesEv
```

```console
npx secure-passgen
Enter the length of the password (default 16):
Generated Password: (pw0XFiS3nHjzI(r
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
