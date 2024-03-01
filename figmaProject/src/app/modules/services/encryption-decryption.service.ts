import * as CryptoJS from 'crypto-js'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

/**
 * This is used to encrypt and decrypt request and response data
 */
@Injectable({
  providedIn: 'root',
})
export class EncryptionDecryptionService {
  constructor() {}

  /*
  Method to get encrypted data of passed decrypted data
  */
  getEncryptedData(data: any) {
    if (data === undefined || data === null) {
      return data
    }
    let token = environment.token

    if (token) {
      if (!token.startsWith('Bearer ')) {
        token = 'Bearer ' + token
      }
      const encryptionSecret = token.substring(30, 50) + token.substring(55, 75)
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        encryptionSecret
      ).toString()
    } else {
      let eid = environment.eid
      if (!eid) {
        return data
      }
      const encryptionSecret =
        eid.substr(0, 9) +
        eid.substr(13, 16) +
        eid.substr(33, 9) +
        eid.substr(46, 6) +
        eid.substr(52, 6) +
        eid.substr(62, 8) +
        eid.substr(74)

      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        encryptionSecret
      ).toString()
    }
  }

  /*
  Method to get decrypted data of passed encrypted data
  */
  getDecryptedData(encryptedData: any) {
    if (encryptedData === undefined || encryptedData === null) {
      return encryptedData
    }
    let token = environment.token

    if (token) {
      if (!token.startsWith('Bearer ')) {
        token = 'Bearer ' + token
      }
      const encryptionSecret = token.substring(30, 50) + token.substring(55, 75)
      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionSecret)
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } else {
      let eid = environment.eid
      if (!eid) {
        return encryptedData
      }
      const encryptionSecret =
        eid.substr(0, 9) +
        eid.substr(13, 16) +
        eid.substr(33, 9) +
        eid.substr(46, 6) +
        eid.substr(52, 6) +
        eid.substr(62, 8) +
        eid.substr(74)

      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionSecret)
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }
}
