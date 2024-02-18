import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Constants } from '../../config/constants';
import { HttpServices } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices,
    private http: HttpClient

  ) { }

  public getBillPayments(): Observable<any> {
    return this.httpServices.get(
      this.constants.PAYMENTSCONTROLCENTRE + `?transactionCategory=BILL`);
  }

  public addBill(data: any): Observable<any> {
    const url = this.constants.PAYMENTSCONTROLCENTRE + `?transactionCategory=BILL`;
    return this.httpServices.post(
      url, data)
      .pipe(map(response => response));
  }
  public updateBill(id: any, data: any): Observable<any> {
    return this.httpServices.put(
      `${this.constants.PAYMENTSCONTROLCENTRE}/${id}`, data)
      .pipe(map(response => response));
  }
  public paymentProcessing(data: Object): Observable<any> {
    return this.httpServices.post(
      this.constants.ADD_PAYMENT_ENDPOINT, data)
      .pipe(map(response => response));
  }

  public upload(id: any, data?: any): Observable<any> {
    return this.httpServices.put(`${this.constants.ADD_VENDOR_DOC_ENDPOINT}/${id}`, data)
      .pipe(map(response => response))
  }
  // v1/ap-invoice?searchParameters=name&searchValues=pare&page=1&limit=1
  public filterBill(data?: any, dateFilters?: any): Observable<any> {

    let url = `${this.constants.FILTER_INVOICE_ENDPOINT}searchParameters=${Object.keys(data)}&searchValues=${Object.values(data)}`;

    if (dateFilters != null && ((dateFilters['invoiceStartDate'] !== '' && dateFilters['invoiceStartDate'] !== '') && (dateFilters['invoiceStartDate'] !== null && dateFilters['invoiceStartDate'] !== null))) {
      url = url + `&invoiceStartDate=${dateFilters['invoiceStartDate']}T00:00:00&invoiceEndDate=${dateFilters['invoiceEndDate']}T00:00:00`
    }

    return this.httpServices.get(url)
      .pipe(map(response => response))
  }

  public updateDocumentBill(data: Object): Observable<any> {
    return this.httpServices.put(
      this.constants.UPLOAD_JOURNAL_ENDPOINT, data)
      .pipe(map(response => response));
  }

  public downloadDocumentBillItem(id: any): Observable<any> {
    return this.httpServices.get(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/download` + `/${id}`, { observe: "response", responseType: "blob" })
      .pipe(map(response => response));
  }

  public deleteDocumentBillItem(id: any): Observable<any> {
    return this.httpServices.delete(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/${id}`)
      .pipe(map(response => response));
  }
}
