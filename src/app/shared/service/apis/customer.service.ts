import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices
  ) { }
  public createCustomer(data: any, isEdit?: boolean): Observable<any> {
    if (isEdit) {
      return this.httpServices
        .put(this.constants.CUSTOMER_ENDPOINT + '/' + data?.customerId, data)
        .pipe(map((response) => response));
    }
    return this.httpServices
      .post(this.constants.CUSTOMER_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public updateCustomer(data: Object, id: any): Observable<any> {
    return this.httpServices
      .put(this.constants.CUSTOMER_ENDPOINT + `/${id}`, data)
      .pipe(map((response) => response));
  }

  public getCustomers(): Observable<any> {
    const url = `${this.constants.CUSTOMER_ENDPOINT}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public getCustomerById(id: string): Observable<any> {
    let url = this.constants.CUSTOMER_ENDPOINT;
    return this.httpServices
      .get(url + `/${id}`)
      .pipe(map((response) => response));
  }

  public uploadInvoice(data: any): Observable<any> {
    return this.httpServices.post(
      this.constants.UPLOAD_JOURNAL_ENDPOINT + `/upload-base64?transactionCategory=CUSTOMER`, data)
      .pipe(map(response => response));
  }

  public updateDocumentInvoice(data: Object): Observable<any> {
    return this.httpServices.put(
      this.constants.UPLOAD_JOURNAL_ENDPOINT, data)
      .pipe(map(response => response));
  }

  public downloadDocumentInvoiceItem(id: any): Observable<any> {
    return this.httpServices.get(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/download` + `/${id}`, { observe: "response", responseType: "blob" })
      .pipe(map(response => response));
  }

  public deleteDocumentInvoiceItem(id: any): Observable<any> {
    return this.httpServices.delete(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/${id}`)
      .pipe(map(response => response));
  }
  // public createCustomer(data: Object): Observable<any> {
  //   return this.httpServices.post(
  //     this.constants.CUSTOMER_ENDPOINT, data)
  //     .pipe(map(response => response));
  // }

  // public updateCustomer(data: Object, id: any): Observable<any> {
  //   return this.httpServices.put(
  //     this.constants.CUSTOMER_ENDPOINT + `/${id}`, data)
  //     .pipe(map(response => response));
  // }

  // public getCustomers(obj: any): Observable<any> {
  //   let url = this.constants.CUSTOMER_ENDPOINT
  //   if (Object.values(obj)[0] !== '')
  //     url = url + `?searchParameters=${Object.keys(obj)}&searchValues=${Object.values(obj)}`
  //   return this.httpServices.get(url)
  //     .pipe(map(response => response));
  // }

  // public getCustomerById(id: string): Observable<any> {
  //   let url = this.constants.CUSTOMER_ENDPOINT
  //   return this.httpServices.get(url + `/${id}`)
  //     .pipe(map(response => response));
  // }

  public getCustomer(): Observable<any> {
    const url = `${this.constants.CUSTOMER_ENDPOINT + '/names'}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }
}
