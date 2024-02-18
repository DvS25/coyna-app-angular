import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";

@Injectable()
export class VendorService {
    constructor(
        private constants: Constants,
        private httpServices: HttpServices
    ) { }

    public getVendor(): Observable<any> {
        const url = `${this.constants.VENDOR_ENDPOINT + '/names'}`;
        return this.httpServices.get(url).pipe(map((response) => response));
    }
}
