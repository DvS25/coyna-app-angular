import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from "../config/constants";
import { BrowserDB } from "../helper/browserDB";

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
    constructor(
        public constant: Constants,
        public browser: BrowserDB
    ) { }
    authenticatedRequest: any;
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
        // @ts-ignore
    ): Observable<HttpEvent<any>> {
        const endPoint = request.url.split('/');
        // @ts-ignore
        const accessToken: string = this.browser.getLocalStorage(this.constant.SET_TOKEN);
        // Set headers for requests that require authorization.
        if (accessToken) {
            const url = endPoint.some(item => this.constant.END_POINT_FOR_MULTIPART.some(point => point == item));
            if (url) {
                this.authenticatedRequest = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            }
            if (!url) {
                this.authenticatedRequest = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            }
            // Request with authorization headers
            return next.handle(this.authenticatedRequest);
        } else {
            // Request without authorization header
            return next.handle(request);
        }
    }
}