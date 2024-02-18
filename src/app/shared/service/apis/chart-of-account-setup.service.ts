import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountSetupService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices
  ) {}

  public getChartOfAccount(): Observable<any> {
    const url = `${this.constants.API_GET_CHART_OF_ACCOUNT_ENDPOINT}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public getAccountType(): Observable<any> {
    const url = `${this.constants.API_GET_ACCOUNT_TYPE_ENDPOINT}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public getDetailType(coaTypeId: any): Observable<any> {
    const url = `${this.constants.API_GET_DETAIL_TYPE_ENDPOINT}/` + coaTypeId;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public addCoa(data?: any, isEdit?: boolean): Observable<any> {
    if (isEdit) {
      return this.httpServices
        .put(this.constants.API_ADD_CHART_OF_ACCOUNT_ENDPOINT, data)
        .pipe(map((response) => response));
    }
    return this.httpServices
      .post(this.constants.API_ADD_CHART_OF_ACCOUNT_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public getChartOfAccountById(id: String): Observable<any> {
    const url = `${this.constants.API_GET_CHART_OF_ACCOUNT_ENDPOINT}/` + id;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public deleteChartOfAccount(id: String): Observable<any> {
    const url = `${this.constants.API_GET_CHART_OF_ACCOUNT_ENDPOINT}/` + id;
    return this.httpServices.delete(url).pipe(map((response) => response));
  }

}
