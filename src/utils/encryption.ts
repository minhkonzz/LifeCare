import aesjs, { ByteSource } from 'aes-js'

export const encrypt = (secretKey: ByteSource, payload: any): string => {
   const textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(payload))
   const aesCtr = new aesjs.ModeOfOperation.ctr(secretKey)
   const encryptedBytes = aesCtr.encrypt(textBytes)
   const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
   return encryptedHex
}

export const decrypt = (secretKey: ByteSource, encryptedHex: string) => {
   const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
   const aesCtr = new aesjs.ModeOfOperation.ctr(secretKey)
   const decryptedBytes = aesCtr.decrypt(encryptedBytes)
   const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
   return JSON.parse(decryptedText)
}