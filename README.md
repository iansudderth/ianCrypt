# suddzzCrypt

## A high level encryption toolbox for NodeJs and MongooseJs

suddzzCrypt is a collection of high level tools for common encryption applications.  It is built on libsodium, and is mostly designed to abstract away common configurations to make for quick, simple, and secure encryption.

Currently the library includes some basic password storage, hash generation, and secure information storage utilities, but I plan to include a collection of MongooseJs schema for easy use with mongodb.


## Basic Usage

Install this package using npm or yarn and the github link

```bash
yarn add https://github.com/iansudderth/suddzzCrypt.git
```

Then, import any of the functions from the package

```javascript
const { generatePasswordHash } = require('suddzzCrypt);
```

## Random String Generation

suddzzCrypt includes utilites for creating randomized strings, useful for randomized keys or token codes.

### randomHexString( length ) 
Creates a random string of hexadecimal characters of the given `length`. `length` defaults to 16.

### randomAlphaString(length, [filter] ) 
Creates a random string of alphanumeric characters of the given `length`. The optional `filter` argument accepts a filter function, so it only uses certain characters.  `filter` also accepts a regular expression.

## Password Storage
suddzzCrypt includes utilities for storing passwords.

### generateSalt()
Generates a salt used for password storage.

### generatePasswordHash( password, salt, [length], [speed] )
Generates a hash from a password and a salt.  The `length` defaults to 16.
The `speed` argument controls how time intensive the password algorithm is, as longer times make dictionary attacks more difficult. `speed` defaults to `'fast'`, and accepts `'medium'`, and `'slow'` as arguments.  Be warned that `'slow'` is extremely slow, taking more than a second on most machines.


## Secret Box Encryption
A set of utilities for creating, unlocking, and updating "secret box" strings that can only be unlocked with the correct password.  These only accept strings as messages, so JSON's must be stringified before encrypting.

### generateBox( message, password )
Creates a box from `message` and `password`. Outputs a string.

### unlockBox( boxHash, password )
Decrypts a boxHash generated by `generateBox()`. If the password is correct, it will return the original encrypted string. If the password is incorrect, or the box invalid, the function will return `null`.

### updateBox( boxHash, password, updaterFunction )
Takes in a `boxHash` generated by `generateBox()` and updates its contents, returning a new `boxHash` string. The `updaterFunction` is only called if the password is correct and takes in the original message as an argument and returns the new message to be encrypted.  `updateBox()` automatically generates new salts and password hashes each time the box is updated.

If the password is incorrect, or `boxHash` is invalid, the function will return `null`.
