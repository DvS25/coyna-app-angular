import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import {Constants} from "../../config/constants";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private baseUrl = 'http://localhost:4000/api/client/add-client';

    constructor(
        private http: HttpClient,
        private toastr : ToastrService,
        private constant: Constants
    ) { }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);
        formData.append('type', 'file');

        const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }


    uploadWithProgress(formData: FormData): Observable<any> {
        return this.http.post(this.constant.API_USER_PROFILE_IMAGE, formData, { observe: 'events',  reportProgress: true })
            .pipe(
                catchError(err => this.handleError(err))
            );
    }
    getProfileImage(): Observable<any> {
        return this.http.get(this.constant.API_USER_PROFILE_IMAGE, { observe: 'events', responseType: 'blob' })
            .pipe(
                catchError(err => this.handleError(err))
            );
    }
    getProfileData(): Observable<any> {
        return this.http.get(this.constant.API_USER_PROFILE_Data, { observe: 'events' })
            .pipe(
                catchError(err => this.handleError(err))
            );
    }
    private handleError(error: any) {
        return throwError(error);
    }
}