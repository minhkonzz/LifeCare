import * as aesjs from 'aes-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AuthStorage {
   private async _encrypt(key: string, value: string) {
      const secretKey = new Uint8Array(16)
      const cipher = new aesjs.ModeOfOperation.ctr(secretKey, new aesjs.Counter(1))
      const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value))
      await AsyncStorage.setItem(key, aesjs.utils.hex.fromBytes(secretKey))
      return aesjs.utils.hex.fromBytes(encryptedBytes)
   }

   private async _decrypt(key: string, value: string) {
      const secretKeyHex = await AsyncStorage.getItem(key)
      if (!secretKeyHex) return secretKeyHex
      const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(secretKeyHex), new aesjs.Counter(1))
      const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value))
      return aesjs.utils.utf8.fromBytes(decryptedBytes)
   }

   async getItem(key: string) {
      const encrypted = await AsyncStorage.getItem(key)
      if (!encrypted) { return encrypted }
      return await this._decrypt(key, encrypted)
   }

   async removeItem(key: string) {
      await AsyncStorage.removeItem(key)
   }

   async setItem(key: string, value: string) {
      const encrypted = await this._encrypt(key, value)
      await AsyncStorage.setItem(key, encrypted)
   }
}