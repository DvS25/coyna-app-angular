import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from "../../config/constants";
import { BrowserDB } from "../../helper/browserDB";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService,
                public constant : Constants,
                private browser: BrowserDB,
                private router: Router
                ) {}
    // ...
    public isAuthenticated(): boolean {
        const token = this.browser.getLocalStorage(this.constant.SET_TOKEN)
        // Check whether the token is expired and return
        if (!this.jwtHelper.isTokenExpired(token)) {
            return !this.jwtHelper.isTokenExpired(token);
        } else {
            this.router.navigate(['/'])
            this.browser.removeLocalStorage(this.constant.SET_PERMISSION_RESPONSE)
            this.browser.removeLocalStorage(this.constant.SET_USER_RESPONSE)
            this.browser.removeLocalStorage(this.constant.SET_TOKEN)
            return   true
        }
    }
}