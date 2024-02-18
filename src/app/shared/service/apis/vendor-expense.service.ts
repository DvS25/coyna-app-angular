import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Constants } from '../../config/constants';
import { HttpServices } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class VendorExpenseService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices,
    private http: HttpClient

  ) { }

  public getVendorList(): Observable<any> {

    return this.httpServices.get(
      this.constants.API_VENROT_LIST + `vendor`);
  }
  public deleteExpense(transactionId:any): Observable<any> {
    return this.httpServices.delete(
      this.constants.DELETE_Expense + transactionId + `?transactionCategory=EXPENSE`)
      .pipe(map(response => response));
  }
  public getTransactionExpenses(): Observable<any> {

    return this.httpServices.get(
      this.constants.PAYMENTSCONTROLCENTRE + `?transactionCategory=EXPENSE`);
  }
  public downloadTransactions(category: string): Observable<any> {
    const url = this.constants.REPORTPAYMENTSCONTROLCENTRE + `?transactionCategory=${category}`

    // const params = new HttpParams().set('transactionCategory', 'EXPENSE');
    const headers = new HttpHeaders().set('Content-Type', 'application/octet-stream');

    return this.http.get(url, { headers, responseType: 'arraybuffer' });
  }
  public getReportTransactionExpenses(): Observable<any> {
    console.log("data  ");
    this.httpServices.get(
      this.constants.REPORTPAYMENTSCONTROLCENTRE + `?transactionCategory=EXPENSE`).subscribe((data) => {
        console.log("Data  = ", data);
      })
    return this.httpServices.get(
      this.constants.REPORTPAYMENTSCONTROLCENTRE + `?transactionCategory=EXPENSE`);
  }
  public getVendorExpenses(): Observable<any> {
    return this.httpServices.get(
      this.constants.GET_VEN_DORDROPDOWN + `/vendor`);
  }
  public deleteDocumentJournalEntryItem(id: any): Observable<any> {
    return this.httpServices.delete(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/${id}`)
      .pipe(map(response => response));
  }
  public getPaymentAccountExpenses(): Observable<any> {
    return this.httpServices.get(
      this.constants.PAYMENT_ACCOUNT + `/coa-company`);
  }
  public getDepartmentExpenses(): Observable<any> {
    return this.httpServices.get(
      this.constants.DEPARTMENT + `/department`);
  }
  public getitemsExpenses(): Observable<any> {
    return this.httpServices.get(
      this.constants.ITEMS + `/items`);
  }
  public downloadDocumentJournalEntryItem(id: any): Observable<any> {
    return this.httpServices.get(
      this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/download` + `/${id}`, { observe: "response", responseType: "blob" })
      .pipe(map(response => response));
  }
  public uploadJournalEntry(data: any): Observable<any> {
    return this.httpServices.post(
      this.constants.UPLOAD_JOURNAL_ENDPOINT + `/upload-base64?transactionCategoryEnum=JOURNAL_ENTRY`, data)
      .pipe(map(response => response));
  }
  public saveExpense(data: any): Observable<any> {
    return this.httpServices.post(
      this.constants.API_SAVE_EXPENSE + `?transactionCategory=EXPENSE`, data)
      .pipe(map(response => response));
  }
  public updateExpense(transactionId: any, data: any): Observable<any> {
    return this.httpServices.put(
      this.constants.API_SAVE_EXPENSE + `/${transactionId}?transactionCategory=EXPENSE`, data)
      .pipe(map(response => response));
  }
  public getExpense(transactionId: any): Observable<any> {
    return this.httpServices.get(
      this.constants.API_SAVE_EDIT + `${transactionId}?transactionCategory=EXPENSE`)
      .pipe(map(response => response));
  }
}
