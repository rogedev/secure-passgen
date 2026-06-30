# secure passgen

A simple tool to generate random and secure passwords. Use it from the
command line or import it as a library in your own JavaScript/TypeScript app.
This app is used as an example about how to publish packages in npm.

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

## Use as a library

Install it as a dependency:

```console
npm install secure-passgen
```

The package ships both ESM and CommonJS builds plus TypeScript types, so you
can `import` or `require` it.

### ESM / TypeScript

```js
import newPassword, { generatePassword } from "secure-passgen"

const password = newPassword()       // 16 characters by default
const longer = generatePassword(32)  // pass a custom length
```

### CommonJS

```js
const newPassword = require("secure-passgen")

const password = newPassword()
const longer = newPassword(32)
```

### API

`generatePassword(length?: number): string`

- `length` — number of characters (default `16`). Must be a positive integer;
  otherwise a `TypeError` (non-integer) or `RangeError` (less than 1) is thrown.
- The default export is the same function, so `import newPassword from "secure-passgen"`
  and `import { generatePassword } from "secure-passgen"` are interchangeable.

Characters are drawn uniformly from `a-z A-Z 0-9 !@#$%^&*()-_=+` using
`crypto.randomInt`, which uses rejection sampling to avoid modulo bias.
