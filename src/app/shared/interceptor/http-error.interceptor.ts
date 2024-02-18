import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse

} from '@angular/common/http';
import {Observable, throwError, window} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
constructor(
    private toastr: ToastrService
) {
}
    // @ts-ignore
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(request)
            .pipe(
                // retry(1),
                // @ts-ignore
                catchError((error: HttpErrorResponse) => {
                    let errorMessage: any;
                    if (error.error === null) {
                        this.toastr.error( 'Unauthorized' , error.status.toString());
                    }
                    if (error.error instanceof ErrorEvent) {
                        // @ts-ignore
                        errorMessage = error.error.message;
                    } else {
                        if(error.error.total == 0){
                            errorMessage =  'Contact server admin';
                        } else {
                            if (typeof error.error.message == "object") errorMessage =  error.error.message;
                            else errorMessage =  error.status +' '+  error.error.message;
                        }
                    }
                    console.log()
                    if (error.error.detail !== undefined){
                        // @ts-ignore
                        this.toastr.error(error.error.detail, error.status);
                    }if (error.error.code == '0'){
                        // @ts-ignore
                        this.toastr.error(error.error.message, error.status);
                    }

                    // window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}
