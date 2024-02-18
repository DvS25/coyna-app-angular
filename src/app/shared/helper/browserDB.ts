import { Injectable } from '@angular/core';
import { CryptoService } from './cryptoJs';

@Injectable({
    providedIn: 'root'
})
export class BrowserDB {
    constructor(
        private crypto: CryptoService
    ) { }

    public getCookie(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return (this.crypto.decrypt(c.substring(cookieName.length, c.length)));
            }
        }
        return null;
    }

    public deleteCookie(name: string) {
        this.setCookie(name, '', -1);
    }

    public setCookie(name: string, value: string, expireDays: number, path: string = '') {
        const d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        const cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${this.crypto.encrypt((value))}; ${expires}${cpath}`;
    }

    /************** Local Storage
     *@params: localstorage SET
     *@params: localstorage GET
     *@params: localstorage delete
     *@params: localstorage bulk delete in array

     *****************************/

    public setLocalStorage(key: string, val: any) {
        localStorage.setItem(key, `${this.crypto.encrypt(JSON.stringify(val))}`);
    }
    public getLocalStorage(key: string) {
        if (localStorage.getItem(key) === null) {
            return null;
        } else {
            return JSON.parse(this.crypto.decrypt(localStorage.getItem(key)));
        }
    }
    public removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }
    public localStorageBulkDelete(name: any) { // exmp ['1','2w']
        for (const key of name) {
            localStorage.removeItem(key);
        }
    }



}
