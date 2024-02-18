import {Injectable} from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';
import {AuthService} from '../service/apis/auth.service';
import {BrowserDB} from "../helper/browserDB";
import {Constants} from "../config/constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: Router,
        public browserDb: BrowserDB
    ) {
    }

    canActivate(): boolean {
        // console.log('is AuthGuard', this.auth.isAuthenticated())
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}

@Injectable()
export class ManageShiftSheetAuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public browserDb: BrowserDB,
        public constant: Constants
    ) {
    }

    canActivate(): any {
        const user = this.browserDb.getLocalStorage(this.constant.SET_USER_RESPONSE)
        if (user.userType == "SUPER_ADMIN" || user.userType == "SHIFT_MANAGER") {
            return true;
        } else {
            this.router.navigate(['shift-sheet/employee'])
        }

    }
}
@Injectable()
export class EmployeeShiftSheetAuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public browserDb: BrowserDB,
        public constant: Constants
    ) {
    }

    canActivate():any {
        const user = this.browserDb.getLocalStorage(this.constant.SET_USER_RESPONSE)
        if (user.userType == "OPERATION" || user.userType=="SHIFT_EMPLOYEE") {
            return true;
        } else {
            this.router.navigate(['shift-sheet/manager'])
        }

    }
}