import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class JournalEntryService {

    constructor(
        private constants: Constants,
        private httpServices: HttpServices
    ) {
    }
    public createJournalEntry(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.TRANSACTION_ENDPOINT + `?transactionCategory=JOURNAL_ENTRY`, data)
            .pipe(map(response => response));
    }

    public updateJournalEntry(data: Object, id: any): Observable<any> {
        return this.httpServices.put(
            this.constants.ADD_JOURNAL_ENDPOINT + `/${id}` + `?transactionCategory=JOURNAL_ENTRY`, data)
            .pipe(map(response => response));
    }

    public getJournalEntry(): Observable<any> {
        return this.httpServices.get(
            this.constants.TRANSACTION_ENDPOINT + `?transactionCategory=JOURNAL_ENTRY`)
            .pipe(map(response => response));
    }

    public getJournalEntryById(id: string): Observable<any> {
        let url = this.constants.TRANSACTION_ENDPOINT
        return this.httpServices.get(url + `/${id}` + `?transactionCategory=JOURNAL_ENTRY`)
            .pipe(map(response => response));
    }

    public deleteJournalEntryItem(id: any): Observable<any> {
        return this.httpServices.delete(
            this.constants.DELETE_JOURNAL_ENDPOINT + `/${id}` + `?transactionCategory=JOURNAL_ENTRY`)
            .pipe(map(response => response));
    }

    public uploadJournalEntry(data: any): Observable<any> {
        return this.httpServices.post(
            this.constants.UPLOAD_JOURNAL_ENDPOINT + `/upload-base64?transactionCategory=JOURNAL_ENTRY`, data)
            .pipe(map(response => response));
    }

    public downloadDocumentJournalEntryItem(id: any): Observable<any> {
        return this.httpServices.get(
            this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/download` + `/${id}`, { observe: "response", responseType: "blob" })
            .pipe(map(response => response));
    }

    public updateDocumentJournalEntry(data: Object): Observable<any> {
        return this.httpServices.put(
            this.constants.UPLOAD_JOURNAL_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public deleteDocumentJournalEntryItem(id: any): Observable<any> {
        return this.httpServices.delete(
            this.constants.DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT + `/${id}`)
            .pipe(map(response => response));
    }

}
