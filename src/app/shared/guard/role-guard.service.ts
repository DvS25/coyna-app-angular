import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../service/apis/auth.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        // @ts-ignore
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        // @ts-ignore
        const tokenPayload = decode(token);
        if (
            // @ts-ignore
        !this.auth.isAuthenticated() || tokenPayload.role !== expectedRole
        ) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}