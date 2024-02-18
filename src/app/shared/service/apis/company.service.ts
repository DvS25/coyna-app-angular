import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class CompanyService {
    // headers = new HttpHeaders();

    constructor(
        private constants: Constants,
        private httpServices: HttpServices
    ) {
    }

    public companyRegister(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.API_ADD_COMPANY_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public addVendor(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.VENDOR_ENDPOINT, data)
            .pipe(map(response => response));
    }
    public updateVendor(data: Object, id: string): Observable<any> {
        return this.httpServices.put(
            this.constants.VENDOR_ENDPOINT + '/' + id, data)
            .pipe(map(response => response));
    }

    public addFinance(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.API_FINANCE_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public addUsers(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.OPERATION_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public addOperation(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.API_OPERATION_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public getCompany(): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public isCompany(value?: string): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}/search?companyName=${value}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }
    public isStore(value?: string, companyId?: string): Observable<any> {
        const url = `${this.constants.STORE_ENDPOINT}/search?storeName=${value}&companyId=${companyId}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getCompanyDetails(id?: any): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}/${id}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public updateCompanyDetails(id?: any, data?: any): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}/${id}`;
        return this.httpServices.put(url, data)
            .pipe(map(response => response));
    }


    public searchCompany(data?: any, currentPage?: number, limit?: number): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}?searchParameters=name&searchValues=${data}&page=${currentPage}&limit=${limit}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public searchStores(data?: any): Observable<any> {
        const url = `${this.constants.STORE_ENDPOINT}?searchParameters=name&searchValues=${data}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public deleteVendorAssociation(id?: string): Observable<any> {
        const url = `${this.constants.COMPANY_VENDOR_ASSOCIATION}/${id}`;
        return this.httpServices.delete(url)
            .pipe(map(response => response));
    }

    public getDepartment(): Observable<any> {
        return this.httpServices.get(
            this.constants.API_DEPARTMENT_ENDPOINT)
            .pipe(map(response => response));
    }

    public vendorUpload(id: any, data?: any): Observable<any> {
        return this.httpServices.put(`${this.constants.ADD_VENDOR_DOC_ENDPOINT}/${id}`, data)
            .pipe(map(response => response))
    }
    public getVendor(): Observable<any> {
        return this.httpServices.get(this.constants.GET_VENDOR_ENDPOINT)
            .pipe(map(response => response))

    }

    public isVendor(name?: string, companyId?: string, storeId?: string): Observable<any> {
        const url = `${this.constants.GET_VENDOR_ENDPOINT}/search?vendorName=${name}&companyId=${companyId}&storeId=${storeId}`
        return this.httpServices.get(url)
            .pipe(map(response => response))

    }
    public deleteDocuments(id: string) {
        return this.httpServices.delete(`${this.constants.ADD_VENDOR_DOC_ENDPOINT}/${id}`)
            .pipe(map(response => response))
    }
    public deleteARDocument(id: string) {
        return this.httpServices.delete(`${this.constants.ARDOCUMENT_DOWNLOAD_ENDPOINT}/${id}`)
            .pipe(map(response => response))
    }
    public deleteArInvoiceDtl(ids: string[]) {
        const queryParams = `arInvoiceDtlIds=${ids.join(',')}`;

        return this.httpServices.delete(`${this.constants.ARINVOICE_DTL_ENDPOINT}?${queryParams}`)
            .pipe(map(response => response));
    }

    public deleteApPayouts(ids: string[]) {
        const queryParams = `apInvoiceIds=${ids.join(',')}`;

        return this.httpServices.delete(`${this.constants.ADD_INVOICE_ENDPOINT}/pay-outs?${queryParams}`)
            .pipe(map(response => response));
    }

    public getDocuments(id: string) {
        return this.httpServices.get(`${this.constants.ADD_VENDOR_DOC_ENDPOINT}/${id}`)
            .pipe(map(response => response))
    }

    public getVendorDetails(id: any) {
        return this.httpServices.get(this.constants.GET_VENDOR_ENDPOINT + '/' + id)
            .pipe(map(response => response))
    }
    public filterVendor(data?: any, currentPage?: number, limit?: number): Observable<any> {
        const url = `${this.constants.GET_VENDOR_ENDPOINT}?searchParameters=${Object.keys(data)}&searchValues=${Object.values(data)}&page=${currentPage}&limit=${limit}`;
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }
    public filterAndGetAllVendor(data?: any): Observable<any> {
        const url = `${this.constants.GET_VENDOR_ENDPOINT}?searchParameters=${Object.keys(data)}&searchValues=${Object.values(data)}`;
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }
    public addExpense(data?: any): Observable<any> {
        return this.httpServices.post(this.constants.ADD_EXPENSE_ENDPOINT, data)
            .pipe(map(response => response))
    }
    public addCompanyVendorAssociation(data?: any): Observable<any> {
        return this.httpServices.post(this.constants.COMPANY_VENDOR_ASSOCIATION, data)
            .pipe(map(response => response))
    }

    public addTimeSheet(data?: any): Observable<any> {
        return this.httpServices.post(this.constants.ADD_TIME_SHEET_ENDPOINT, data)
            .pipe(map(response => response))
    }

    public addStore(data?: any): Observable<any> {
        return this.httpServices.post(this.constants.STORE_ENDPOINT, data)
            .pipe(map(response => response))
    }
    public getStore(id?: any): Observable<any> {
        return this.httpServices.get(this.constants.STORE_ENDPOINT + '/' + id)
            .pipe(map(response => response))
    }

    public getAllStores(): Observable<any> {
        return this.httpServices.get(this.constants.STORE_ENDPOINT)
            .pipe(map(response => response))
    }
    public getInvoiceDetails(id?: any): Observable<any> {
        return this.httpServices.get(this.constants.GET_INVOICE_ENDPOINT + '/' + id)
            .pipe(map(response => response))
    }

    public deleteInvoice(id?: any) {
        return this.httpServices.delete(this.constants.GET_INVOICE_ENDPOINT + '/' + id)
            .pipe(map(response => response))
    }

    public checkInvoiceNumber(number?: any, companyId?: string, storeId?: string, vendorId?: string): Observable<any> {
        const url = `${this.constants.GET_INVOICE_ENDPOINT}/search?invoiceNumber=${number}&companyId=${companyId}&storeId=${storeId}&vendorId=${vendorId}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }
    public getOperation(type: string, currentPage: number, limit: number): Observable<any> {
        let url = `searchParameters=user_type&searchValues=${type}&page=${currentPage}&limit=${limit}`
        return this.httpServices.get(this.constants.OPERATION_ENDPOINT + '?' + url)
            .pipe(map(response => response))
    }

    public isUserId(value?: string, company?: string, storeId?: string): Observable<any> {
        let url = `search?userName=${value}&companyId=${company}&storeId=${storeId}`
        return this.httpServices.get(this.constants.OPERATION_ENDPOINT + '/' + url)
            .pipe(map(response => response))
    }
    public getOperationSearch(id?: any, currentPage?: number, limit?: number): Observable<any> {
        let url = `searchParameters=company_id&searchValues=${id}&page=${currentPage}&limit=${limit}`

        return this.httpServices.get(this.constants.OPERATION_ENDPOINT + '?' + url)
            .pipe(map(response => response))
    }
    public OperationFilterSearch(obj?: any): Observable<any> {
        let url = `searchParameters=${Object.keys(obj)}&searchValues=${Object.values(obj)}`
        return this.httpServices.get(this.constants.OPERATION_ENDPOINT + '?' + url)
            .pipe(map(response => response))
    }

    public getShiftForStore(id?: any): Observable<any> {
        let url = `searchParameters=company_id&searchValues=${id}`

        return this.httpServices.get(this.constants.SHIFT_ENDPOINT + '?' + url)
            .pipe(map(response => response))
    }
    public getManagerShifts(id?: any): Observable<any> {
        let url = `searchParameters=company_id&searchValues=${id}`

        return this.httpServices.get(this.constants.SHIFT_ENDPOINT + '/manager?' + url)
            .pipe(map(response => response))
    }

    public getEmployeeTimeSheetDetails(companyId?: any, storeId?: any, date?: any): Observable<any> {
        const urlParams = `?companyId=${companyId}&storeId=${storeId}&date=${date}`;
        const url = `${this.constants.ADD_TIME_SHEET_ENDPOINT}/employee${urlParams}`;

        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public getEmployeeTimeSheetDetailsNew(companyId?: any, storeId?: any, date?: any, shiftId?: any): Observable<any> {
        const urlParams = `?companyId=${companyId}&storeId=${storeId}&date=${date}&shiftId=${shiftId}`;
        const url = `${this.constants.ADD_TIME_SHEET_ENDPOINT}/employee${urlParams}`;

        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public getShiftSheetDetails(companyId: string, storeId: string, invoiceDate: string, shiftName: string) {
        let url = `searchParameters=company_id,store_id,invoice_date,shift&searchValues=${companyId},${storeId},${invoiceDate},${shiftName}`
        return this.httpServices.get(this.constants.SHIFT_END_POINT + '?' + url)
            .pipe(map(response => response))
    }

    public setOpeningBalance(companyId: any, storeId: any, invoiceDate: any, shift_id: any) {
        let obj = { companyId: companyId, storeId: storeId, shiftId: shift_id, invoiceDate: invoiceDate + 'T00:00:00' }
        return this.httpServices.post(this.constants.SHIFT_END_POINT + '/opening-balance', obj)
            .pipe(map(response => response))
    }
    public getApprovalInfo(companyId: any, storeId: any, invoiceDate: any) {
        const body = { companyId: companyId, storeId: storeId, invoiceDate: invoiceDate + 'T00:00:00' }
        console.log(body)
        return this.httpServices.post(this.constants.SHIFT_END_POINT + '/approvalInfo', body)
            .pipe(map(response => response))
    }
    public getShiftSheetDetailsNew(companyId: any, storeId: any, invoiceDate: any, shift_id: any) {
        let url = `searchParameters=company_id,store_id,invoice_date,shift_id&searchValues=${companyId},${storeId},${invoiceDate},${shift_id}`
        return this.httpServices.get(this.constants.SHIFT_END_POINT + '?' + url)
            .pipe(map(response => response))
    }
    public getEmployeeShiftSheetDetails(companyId: string, storeId: string, invoiceDate: string) {
        let url = `searchParameters=company_id,store_id,invoice_date,shift&searchValues=${companyId},${storeId},${invoiceDate}`
        return this.httpServices.get(this.constants.SHIFT_END_POINT + '?' + url)
            .pipe(map(response => response))
    }

    public getShiftItem() {
        return this.httpServices.get(this.constants.SHIFT_SHEET_ENDPOINT)
            .pipe(map(response => response))
    }
    public getCategory(categoryId: string) {
        return this.httpServices.get(this.constants.CATEGORY_ENDPOINT + "/" + categoryId)
            .pipe(map(response => response))
    }
    public getShift() {
        return this.httpServices.get(this.constants.SHIFT_ENDPOINT)
            .pipe(map(response => response))
    }

    public addShift(data?: any) {
        return this.httpServices.post(this.constants.SHIFT_END_POINT, data)
            .pipe(map(response => response))
    }
    public updateShiftSheet(data?: any) {
        const url = this.constants.SHIFT_END_POINT + `/${data.arInvoiceId}`
        console.log(url)
        return this.httpServices.put(url, data)
            .pipe(map(response => response))
    }
    public getShiftSummary(data?: any) {
        return this.httpServices.post(this.constants.GET_SHIFT_SUMMARY_END_POINT, data)
            .pipe(map(response => response))
    }

    public addShiftSheetPayoutDatas(data?: any): Observable<any> {
        return this.httpServices.post(this.constants.GET_INVOICE_ENDPOINT + '/pay-outs', data)
            .pipe(map(response => response))
    }

    public getReports(reportType: string): Observable<any> {
        return this.httpServices.get(
            this.constants.REPORT_ENDPOINT + "?type=" + reportType)
            .pipe(map(response => response));
    }

    public getKnockOffSummaryReport(params: string, values: string): Observable<any> {
        var url = `${this.constants.API_GET_KNOCKOFF_SUMMARY_REPORT_ENDPOINT}`;
        if (params != '') {
            url = url + '&params=' + params + "&values=" + values;
        }
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public fetchReport(reportType: string, params: string, values: string): Observable<any> {
        var url = `${this.constants.API_GET_COMMON_REPORT_ENDPOINT}?type=${reportType}`;
        if (params != '') {
            url = url + '&params=' + params + "&values=" + values;
        }
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getItemLists(): Observable<any> {
        const url = `${this.constants.API_GET_ITEM_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }
    public shiftEmployeeList(): Observable<any> {
        const url = `${this.constants.TIME_SHEET_EMPLOYEE}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public addSeasonalItems(itemname: string, data?: any): Observable<any> {
        return this.httpServices.post(this.constants.ADD_SEASONAL_ITEM, { name: itemname })
            .pipe(map(response => response))
    }

    public inActiveSeasonalItems(itemid: string, data?: any): Observable<any> {
        return this.httpServices.put(this.constants.INACTIVE_SEASONAL_ITEM + "/" + itemid, data)
            .pipe(map(response => response))
    }

    public getShiftSheetPayoutDatas(companyId?: any, storeId?: any, date?: any, shiftId?: any): Observable<any> {
        const url = `${this.constants.GET_INVOICE_ENDPOINT}?searchParameters=company_id,store_id,shift_id,invoice_date&searchValues=${companyId},${storeId},${shiftId},${date}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public addBank(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.BANK_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public getAllBanks(obj: any): Observable<any> {
        return this.httpServices.get(
            this.constants.BANK_ENDPOINT + `?searchParameters=${Object.keys(obj)}&searchValues=${Object.values(obj)}`)
            .pipe(map(response => response));
    }

    public getCurrentOpeningBalance(bankId: string): Observable<any> {
        return this.httpServices.get(
            this.constants.BANKTRANSACTIONS_ENDPOINT + `/current-balance?bankId=${bankId}`)
            .pipe(map(response => response));
    }

    public getBankingTransactions(obj: any, startDate: any, endDate: any, page: any, limit: any): Observable<any> {
        let url = `${this.constants.BANKTRANSACTIONS_ENDPOINT}?searchParameters=${Object.keys(obj)}&searchValues=${Object.values(obj)}&page=${page}&limit=${limit}`
        if (startDate != null && endDate !== null)
            url = url + `&startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public createBankTransactions(data: any): Observable<any> {
        const url = `${this.constants.BANKTRANSACTIONS_ENDPOINT}`
        return this.httpServices.post(url, data)
            .pipe(map(response => response))
    }

    public getRoleList(): Observable<any> {
        const url = `${this.constants.ROLE_ENDPOINT}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public addRole(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.ROLE_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public updateRole(data: Object, roleId: string): Observable<any> {
        const url = `${this.constants.ROLE_ENDPOINT}/${roleId}`
        return this.httpServices.put(
            url, data)
            .pipe(map(response => response));
    }

    public deleteRole(roleId: string): Observable<any> {
        const url = `${this.constants.ROLE_ENDPOINT}/${roleId}`
        return this.httpServices.delete(
            url)
            .pipe(map(response => response));
    }

    public getUserTypeList(): Observable<any> {
        const url = `${this.constants.USERTYPE_ENDPOINT}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public getPermissionList(): Observable<any> {
        const url = `${this.constants.PERMISSION_ENDPOINT}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public getUsers(companyId: any, userType: any, currentPage: number, limit: number): Observable<any> {
        var params = ''; var values = '';
        if (companyId != '') {
            params = params + ',company_id';
            values = values + ',' + companyId;
        }
        if (userType != '') {
            params = params + ',user_type';
            values = values + ',' + userType;
        }
        let url = 'page=' + currentPage + '&limit=' + limit;
        if (params != '') {
            params = params.substr(1);
            values = values.substr(1);

            url = url + '&searchParameters=' + params + '&searchValues=' + values;
        }

        //let url =`searchParameters=user_type&searchValues=${type}&page=${currentPage}&limit=${limit}`
        return this.httpServices.get(this.constants.OPERATION_ENDPOINT + '?' + url)
            .pipe(map(response => response))
    }

    public getCoyna(): Observable<any> {
        const url = `${this.constants.COYNA_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getPastFinance(): Observable<any> {
        const url = `${this.constants.PAST_FINANCE_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getTaxStructure(): Observable<any> {
        const url = `${this.constants.TAX_STRUCTURE_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getDestination(): Observable<any> {
        const url = `${this.constants.DESTINATION_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getIndustry(): Observable<any> {
        const url = `${this.constants.INDUSTRY_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getCurrency(): Observable<any> {
        const url = `${this.constants.CURRENCY_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getPaymentTermList(): Observable<any> {
        const url = `${this.constants.PAYMENT_TERM_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getAccountingMethodList(): Observable<any> {
        const url = `${this.constants.ACCOUNTING_METHOD_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }


    public updateCompanyDetailsWithoutId(data?: any): Observable<any> {
        const url = `${this.constants.API_GET_COMPANY_ENDPOINT}`;
        return this.httpServices.put(url, data)
            .pipe(map(response => response));
    }

    public getV1Country(): Observable<any> {
        const url = `${this.constants.Country_ENDPOINT}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getV1State(id?: any): Observable<any> {
        const url = `${this.constants.STATE_ENDPOINT}/${id}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public getV1City(id?: any): Observable<any> {
        const url = `${this.constants.CITY_ENDPOINT}/${id}`;
        return this.httpServices.get(url)
            .pipe(map(response => response));
    }

    public GetProductAndServiceList(): Observable<any> {
        const url = `${this.constants.PRODUCT_SERVICE_ENDPOINT}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public DeleteProductOrService(roleId: string): Observable<any> {
        const url = `${this.constants.DELETE_PRODUCT_SERVICE_ENDPOINT}/${roleId}`
        return this.httpServices.delete(
            url)
            .pipe(map(response => response));
    }

    public GetIncomeAccountList(): Observable<any> {
        const url = `${this.constants.INCOME_ACCOUNT_ENDPOINT}`
        return this.httpServices.get(url)
            .pipe(map(response => response))
    }

    public AddProduct(data: Object): Observable<any> {
        debugger
        return this.httpServices.post(
            this.constants.PRODUCT_ENDPOINT, data)
            .pipe(map(response => response));
    }

    public AddService(data: Object): Observable<any> {
        return this.httpServices.post(
            this.constants.SERVICE_ENDPOINT, data)
            .pipe(map(response => response));
    }
    public UploadCompanyLogo(data: Object): Observable<any> {
        return this.httpServices.put(
            this.constants.API_GET_COMPANY_ENDPOINT + `/upload-logo`, data)
            .pipe(map(response => response));
    }

    public DownloadCompanyLogo(): Observable<any> {
        return this.httpServices.get(
            this.constants.API_GET_COMPANY_ENDPOINT + `/download-logo`, { observe: "response", responseType: "blob" })
            .pipe(map(response => response));
    }



}