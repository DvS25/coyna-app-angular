import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Constants } from "../config/constants";

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    // @ts-ignore
    constructor(
        private constant: Constants
    ) { }

    secretKey: string = this.constant.CIPHER_KEY;
    _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    _iv = CryptoJS.enc.Utf8.parse(this.secretKey);

    encrypt(value: any) {
        return CryptoJS.AES.encrypt(
            JSON.stringify(value), this._key, {
            keySize: 16,
            iv: this._iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }
    decrypt(encryptValue:any) {
        let decrypted = CryptoJS.AES.decrypt(encryptValue, this._key, {
            keySize: 16,
            iv: this._iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }

}

