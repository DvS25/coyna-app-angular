import { HttpServices } from "../service";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Constants } from "../config/constants";

@Injectable()
export class AddressHelper {
    constructor(
        private http: HttpServices,
        private toastr: ToastrService,
        private constants: Constants
    ) {
    }

    getCountry = async (country: any) => {
        return new Promise((resolve, reject) => {
            this.http.get(this.constants.API_FETCH_COUNTRY)
                .subscribe(res => resolve(res.data)
                    , error => {
                        this.toastr.error(error, 'Country error')
                    })
        })
    }
    getState = async (country: any) => {
        return new Promise((resolve, reject) => {
            this.http.post(this.constants.API_FETCH_STATE, {country})
                .subscribe(res => resolve(res.data)
                    , error => {
                        this.toastr.error(error, 'State error')
                    })
        })
    }

    getCity = async (state: string, country: string) => {
        return new Promise((resolve, reject) => {
            this.http.post(this.constants.API_FETCH_CITY, {state, country})
                .subscribe(res => resolve(res.data)
                    , error => {
                        this.toastr.error(error, 'State error')
                    })
        })
    }
}