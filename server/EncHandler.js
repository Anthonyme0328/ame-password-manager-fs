const crypto = require('crypto')
const secret = '********************************'

const encrypt = (password) => {

  const iv = Buffer.from(crypto.randomBytes(16))

  const cypher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv)

  const encrytedPassword = Buffer.concat([
    cypher.update(password),
    cypher.final()
  ]);

  return {
    iv: iv.toString('hex'), 
    password: encrytedPassword.toString('hex')
  }
}

const decrypt = (encryption) => {

  const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secret), Buffer.from(encryption.iv, 'hex'))

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, 'hex')),
    decipher.final()
  ])

  return decryptedPassword.toString()
}

module.exports = {encrypt, decrypt}