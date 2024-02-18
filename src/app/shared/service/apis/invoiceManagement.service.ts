import {Injectable} from "@angular/core";
import { map, Observable} from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";

@Injectable()
export class InvoiceManagementService {
    constructor(
        private constants: Constants,
        private httpServices: HttpServices,

    ) {
    }
    public addInvoice(data: Object):Observable<any> {
        const url = this.constants.TRANSACTION_ENDPOINT + `?transactionCategory=INVOICE`;
        return this.httpServices.post(
             url, data)
            .pipe(map(response => response));
    }
    public updateInvoice(id?: string, data?: Object,):Observable<any> {
        return this.httpServices.put(
            `${this.constants.ADD_INVOICE_ENDPOINT}/${id}` , data)
            .pipe(map(response => response));
    }
    public paymentProcessing(data: Object):Observable<any> {
        return this.httpServices.post(
            this.constants.ADD_PAYMENT_ENDPOINT , data)
            .pipe(map(response => response));
    }

    public upload(id: any, data?: any):Observable<any> {
        return this.httpServices.put(`${this.constants.ADD_VENDOR_DOC_ENDPOINT}/${id}`,data)
            .pipe(map(response => response))
    }
    // v1/ap-invoice?searchParameters=name&searchValues=pare&page=1&limit=1
    public filterInvoice( data?: any, dateFilters?: any):Observable<any> {
        
        let url = `${this.constants.FILTER_INVOICE_ENDPOINT}searchParameters=${Object.keys(data)}&searchValues=${Object.values(data)}`;
        
        if(dateFilters!=null && ((dateFilters['invoiceStartDate']!=='' && dateFilters['invoiceStartDate']!=='') && (dateFilters['invoiceStartDate']!== null && dateFilters['invoiceStartDate']!==null)))
        {
            url = url + `&invoiceStartDate=${dateFilters['invoiceStartDate']}T00:00:00&invoiceEndDate=${dateFilters['invoiceEndDate']}T00:00:00`
        }
       
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public getInvoice():Observable<any> {
        const url = this.constants.TRANSACTION_ENDPOINT + `?transactionCategory=INVOICE`;
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }
    public getInvoiceById(id:string):Observable<any> {
        const url = this.constants.GET_INVOICE_ENDPOINT+`/${id}`;
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public deleteItem(id:string):Observable<any> {
        const url = this.constants.GET_INVOICE_DTL_ENDPOINT+'/'+id;
        return this.httpServices.delete(url)
            .pipe(map(response => response))
    }

    public uploadInvoice(data: any): Observable<any> {
        return this.httpServices.post(
            this.constants.UPLOAD_JOURNAL_ENDPOINT + `/upload-base64?transactionCategory=INVOICE`, data)
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

    public docDownload(id?: any, reportProgress?: boolean):Observable<Blob> {
        let option = {}
        if (reportProgress) {
            option = {
                responseType: 'blob',
                reportProgress: reportProgress,
                observe: 'events',
            }
        } else {
            option = {
                responseType: 'blob',
                observe: 'response',
            }
        }
       return  this.httpServices.get(`${this.constants.DOC_DOWNLOAD_ENDPOINT}/${id}`,option)
           .pipe(map(response => response))
    }

    public downloadARAttachment(id?: any, reportProgress?: boolean):Observable<Blob> {
        let option = {}
        if (reportProgress) {
            option = {
                responseType: 'blob',
                reportProgress: reportProgress,
                observe: 'events',
            }
        } else {
            option = {
                responseType: 'blob',
                observe: 'response',
            }
        }
       return  this.httpServices.get(`${this.constants.ARDOCUMENT_DOWNLOAD_ENDPOINT}/${id}`,option)
           .pipe(map(response => response))
    }

}