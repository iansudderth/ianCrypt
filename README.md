# suddzzCrypt

## A high level encryption toolbox for NodeJs and MongooseJs

suddzzCrypt is a collection of high level tools for common encryption uses.  It is built on libsodium, and is mostly designed to abstract away common configurations to make for quick, simple, and secure encryption.

Currently the library includes some basic password storage, hash generation, and secure information storage utilities, but I plan to include a collection of MongooseJs schema for easy use with mongodb.


## Hash Generation


### generateHexHash( length ) 

### generateAlphaHash(length, [filter] ) 


## Password Storage


### generateSalt()

### generatePasswordHash( password, salt, [length], [speed] )

### validatePassword( password, salt, hash, [speed] )



## Secret Box Encryption


### generateBox( message, password )

### unlockBox( boxHash, password )

### updateBox( boxHash, password, updaterFunction )