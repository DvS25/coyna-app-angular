import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BrowserDB, ChartOfAccountSetupService, CompanyService, Constants, DepartmentService } from 'src/app/shared';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JournalEntryService } from 'src/app/shared/service/apis/journal-entry.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { RecurringComponent } from '../reccuring/reccuring.component';
import { Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { VendorService } from 'src/app/shared/service/apis/vendor.service';
import { CustomerService } from 'src/app/shared/service/apis/customer.service';

export interface Journal {
    transactionDtlId: any;
    no: string;
    coaCompanyId: string;
    debit_amout: string,
    credit_amout: string,
    description: string;
    entityId: string;
    departmentId: string;
    is_debit: boolean,
    is_credit: boolean
    transactionType: string
}

@Component({
    selector: 'app-journal-entry',
    templateUrl: './journal-entry.component.html',
    styleUrls: ['./journal-entry.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})


export class JournalEntryComponent {
    files: any;
    // @ts-ignore
    uploader: FileUploader;
    // @ts-ignore
    JournalForm: FormGroup;
    // @ts-ignore
    AttachForm: FormGroup;
    DeletedtransactionDetails: Journal[] = [];
    JournalViewData: any = {};
    submitted: boolean = false;
    chartOfAccounts: any = [];
    DepartmentList: any = [];
    CompanySettings: any = {};
    tblData: Journal[] = [
        { no: "", coaCompanyId: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentId: "", transactionType: '', transactionDtlId: '' },
    ];
    displayedColumns: string[] = ['no', 'name', 'coaCompanyId', 'debits', 'credits', 'description', 'departmentId', 'action'];
    dataSource = new MatTableDataSource<Journal>(this.tblData);
    selection = new SelectionModel<Journal>(true, []);
    JournalData: any = {};
    UploadedList: any = [];
    JournalNumber: string = "JE1001";
    VendorList: any = [];
    CustomerList: any = [];

    @ViewChild(MatTable) table!: MatTable<Journal>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @HostBinding('style.--dept-col-width') deptColumnWidth!: string;
    @HostBinding('style.--dept-col-grow') deptColumnGrow!: string;
    @HostBinding('style.--acc-col-width') accColumnWidth!: string;
    @HostBinding('style.--acc-col-grow') accColumnGrow!: string;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
    }
    constructor(
        private chartOfAccountSetupService: ChartOfAccountSetupService,
        private departmentService: DepartmentService,
        private JournalEntryService: JournalEntryService,
        private VendorService: VendorService,
        private CustomerService: CustomerService,
        private AdminComponent: AdminComponent,
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private dialog: MatDialog,
        private router: Router,
        public browser: BrowserDB,
        public constant: Constants
    ) {
        const accessToken: string = this.browser.getLocalStorage(this.constant.SET_TOKEN);
        this.uploader = new FileUploader({
            url: String(this.constant.UPLOAD_JOURNAL_ENDPOINT + `/upload-base64?transactionCategory=JOURNAL_ENTRY`),
            disableMultipart: true,
            formatDataFunctionIsAsync: true,
            autoUpload: true,
            maxFileSize: 20 * 1024 * 1024,
            formatDataFunction: async (item: any) => {
                let Response = {
                    fileBase64: await this.convertFileToBase64(item._file),
                    documentName: item._file.name
                }
                this.JournalEntryService.uploadJournalEntry(Response).subscribe(
                    res => {
                        if (res.code == "1") {
                            item.documentId = res.results;
                            this.UploadedList.push({ transDocId: res.results, transactionId: this.JournalData.transactionId });
                        }
                    }, error => {
                    })
            }
        });

    }

    async ngOnInit() {
        let userData = this.browser.getLocalStorage(this.constant.SET_USER_RESPONSE);
        this.CompanySettings = userData.companySettings;
        this.AdminComponent.SetTitle('Journal Entry');
        this.JournalForm = this.formBuilder.group(
            {
                "tNumber": ['', [Validators.required]],
                "transactionDate": ['', [Validators.required]],
            });
        this.AttachForm = this.formBuilder.group(
            {
                'file_name': '',
            }
        )
        await this.filterJournalTblColumn();
        this.JournalData.tnumber = '001'
        await this.GetCOAList();
        await this.GetVendorList();
        await this.GetCustomerList();
        await this.GetDepartmentList();
        console.log('table', this.table)
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.JournalForm.controls;
    }

    clearTblData() {
        this.tblData = [{ no: "", coaCompanyId: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentId: "", transactionType: '', transactionDtlId: '' }];
        this.table.renderRows();
    }

    addTblData() {
        this.tblData.push({ no: "", coaCompanyId: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentId: "", transactionType: '', transactionDtlId: '' });
        this.table.renderRows();
    }

    deleteTblRow(index: number) {
        this.tblData.splice(index, 1);
    }

    onDrop(event: CdkDragDrop<string[]>) {
        console.log(event)
        moveItemInArray(this.tblData, event.previousIndex, event.currentIndex);
    }

    async convertFileToBase64(file: File) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }


    GetCOAList() {
        this.chartOfAccountSetupService.getChartOfAccount().subscribe((res) => {
            if (res.code == "1") {
                this.chartOfAccounts = res.results;
            }
        });
    }

    GetDepartmentList() {
        this.departmentService.getDepartment().subscribe((res) => {
            if (res.code == "1") {
                this.DepartmentList = res.results;
            }
        });
    }

    GetVendorList() {
        this.VendorService.getVendor().subscribe((res) => {
            if (res.code == "1") {
                this.VendorList = res.results;
            }
        });
    }

    GetCustomerList() {
        this.CustomerService.getCustomer().subscribe((res) => {
            if (res.code == "1") {
                this.CustomerList = res.results;
            }
        });
    }

    GetJournalEntryData(transactionId: string) {
        this.JournalEntryService.getJournalEntryById(transactionId).subscribe(
            res => {
                if (res.code == "1") {
                    if (res.results) {
                        this.JournalData = res.results;
                        if (res.results.transactionDetails.length > 0) {
                            this.tblData = res.results.transactionDetails.map((o: { coaCompanyId: any; amount: any; description: any; entityId: any; departmentId: any; transactionType: any; transactionDtlId: any }) => ({
                                coaCompanyId: o.coaCompanyId ? o.coaCompanyId : '',
                                debit_amout: o.transactionType == 'DEBIT' ? o.amount : '',
                                credit_amout: o.transactionType == 'CREDIT' ? o.amount : '',
                                is_debit: o.transactionType == 'DEBIT' ? true : false,
                                is_credit: o.transactionType == 'CREDIT' ? true : false,
                                description: o.description,
                                entityId: o.entityId,
                                departmentId: o.departmentId ? o.departmentId : null,
                                transactionType: o.transactionType,
                                transactionDtlId: o.transactionDtlId ? o.transactionDtlId : ''
                            }));
                            this.JournalData.total_debit_amount = _.sumBy(this.tblData, obj => {
                                return +obj.debit_amout;
                            });
                            this.JournalData.total_credit_amount = _.sumBy(this.tblData, obj => {
                                return +obj.credit_amout;
                            });
                        }
                    }

                }
            }, error => {
            })
    }

    GetJournalView() {
        this.router.navigate(['/journal-entry/' + `${this.JournalData.transactionId}`]);
    }

    SaveJournalEntry() {
        this.submitted = true;
        if (this.JournalForm.invalid) {
            return;
        }
        if (!this.JournalData.transactionId) {
            if (this.JournalData.total_debit_amount == this.JournalData.total_credit_amount) {
                let data: any = {};
                let transactionDetailsData = this.tblData.map(o => ({
                    coaCompanyId: o.coaCompanyId,
                    transactionType: o.transactionType,
                    amount: o.transactionType == 'DEBIT' ? o.debit_amout : o.credit_amout,
                    description: o.description,
                    departmentId: o.departmentId ? o.departmentId : null,
                    entityId: o.entityId
                }));
                const date = new Date(this.JournalData.transactionDate + 1);
                date.setDate(date.getDate() + 1);
                console.log(date);
                data['transactionDate'] = date;
                data['transactionCategory'] = 'JOURNAL_ENTRY';
                data['description'] = '';
                data['amount'] = 0;
                // data['paymentInfo'] = '';
                // data['paymentInfo'] = '';
                data['tnumber'] = this.JournalData.tnumber;
                // data['entityId'] = this.JournalData.entityId;
                data['memo'] = this.JournalData.memo;
                data['transactionDetails'] = transactionDetailsData;
                this.JournalEntryService.createJournalEntry(data).subscribe(
                    res => {
                        if (res.code == "1") {
                            this.notification.success(res.message);
                            if (this.UploadedList.length > 0) {
                                this.UploadedList.map((o: { transactionId: any; }) => o.transactionId = res.results);
                                this.UpdateDocument(this.UploadedList);
                            }
                            this.GetJournalEntryData(res.results);
                        }
                    }, error => {
                    })
            }
            else {
                this.notification.error('Debit and Credit must be same total.');
            }
        }
        else {
            if (this.JournalData.total_debit_amount == this.JournalData.total_credit_amount) {
                let data: any = {};
                let transactionDetailsData = this.tblData.map(o => ({
                    coaCompanyId: o.coaCompanyId,
                    transactionType: o.transactionType,
                    amount: o.transactionType == 'DEBIT' ? o.debit_amout : o.credit_amout,
                    description: o.description,
                    departmentId: o.departmentId ? o.departmentId : null,
                    transactionDtlId: o.transactionDtlId,
                    entityId: o.entityId
                }));
                data['companyId'] = this.JournalData.companyId;
                data['transactionId'] = this.JournalData.transactionId;
                const date = new Date(this.JournalData.transactionDate + 1);
                date.setDate(date.getDate() + 1);
                console.log(date);
                data['transactionDate'] = date;
                data['transactionCategory'] = 'JOURNAL_ENTRY';
                data['description'] = '';
                data['amount'] = 0;
                data['paymentInfo'] = '';
                data['tnumber'] = this.JournalData.tnumber;
                data['memo'] = this.JournalData.memo;
                data['transactionDetails'] = transactionDetailsData;
                let DeletedtransactionDetailsData = this.DeletedtransactionDetails.map(o => ({
                    coaCompanyId: o.coaCompanyId,
                    transactionType: o.transactionType,
                    amount: o.transactionType == 'DEBIT' ? o.debit_amout : o.credit_amout,
                    description: o.description,
                    departmentId: o.departmentId,
                    transactionDtlId: o.transactionDtlId
                }));
                data['deletedTransactionDetails'] = DeletedtransactionDetailsData;
                this.JournalEntryService.updateJournalEntry(data, this.JournalData.transactionId).subscribe(
                    res => {
                        if (res.code == "1") {
                            this.notification.success(res.message);
                            if (this.UploadedList.length > 0) {
                                this.UploadedList.map((o: { transactionId: any; }) => o.transactionId = res.results);
                                this.UpdateDocument(this.UploadedList);
                            }
                            this.GetJournalEntryData(res.results);
                            this.DeletedtransactionDetails = [];
                        }
                    }, error => {
                    })
            }
            else {
                this.notification.error('Debit and Credit must be same total.');
            }
        }
    }

    DeleteJournalEntry(index: number, data: any) {
        if (data.transactionDtlId) {
            this.DeletedtransactionDetails.push(data);
            this.tblData.splice(index, 1);
        }
        else {
            this.tblData.splice(index, 1);
        }
        this.JournalData.total_credit_amount = _.sumBy(this.tblData, obj => {
            return +obj.credit_amout;
        });
        this.JournalData.total_debit_amount = _.sumBy(this.tblData, obj => {
            return +obj.debit_amout;
        });
        this.table.renderRows();
    }

    TransactionOnChange(data: any, type: string) {
        if (type == 'DEBIT') {
            if (data.debit_amout == null) {
                data.is_credit = true;
                data.transactionType = "";
            }
            else {
                data.is_credit = false;
                data.transactionType = "DEBIT";
            }
            this.JournalData.total_debit_amount = _.sumBy(this.tblData, obj => {
                return _.round(+obj.debit_amout, 2);
            });
        }
        else {
            if (data.credit_amout == null) {
                data.is_debit = true;
                data.transactionType = "";
            }
            else {
                data.is_debit = false;
                data.transactionType = "CREDIT";
            }
            this.JournalData.total_credit_amount = _.sumBy(this.tblData, obj => {
                return +obj.credit_amout;
            });
        }
    }

    addOrEditRecurring(): void {
        const dialogRef = this.dialog.open(RecurringComponent, {
            // data: { isEdit: isEdit, department: department },
            width: "778px",
            height: '448px'
        });

        dialogRef.afterClosed().subscribe((result) => {
            //   this.getDepartments();
        });
    }


    async onFileSelected(event: any) {
        const file: File = event[0];
        console.log(file);
        let data = this.uploader?.queue;
        this.files = data[0].file.name;
    }

    DownloadDocument(id: any, fileName: any) {
        this.JournalEntryService.downloadDocumentJournalEntryItem(id).subscribe(
            res => {
                this.downloadAsBlob(res, fileName);
            }, error => {
            })
    }

    downloadAsBlob(response: any, fileName: any) {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(response.body);
        link.download = fileName;
        link.click();
    }

    UpdateDocument(data: any) {
        this.JournalEntryService.updateDocumentJournalEntry(data).subscribe(
            res => {
                if (res.code == "1") {
                    this.notification.success(res.message);

                }
            }, error => {
            })
    }

    DeleteDocument(id: any, item: any) {
        this.JournalEntryService.deleteDocumentJournalEntryItem(id).subscribe(
            res => {
                if (res.code == "1") {
                    item.remove();
                    if (this.JournalData.transactionId) {
                        this.UploadedList.pop((o: { transDocId: any; }) => o.transDocId == id);
                    }
                    this.notification.success(res.message);

                }
            }, error => {
            })
    }


    async filterJournalTblColumn() {
        // const companySetting = { bankingEnabled: 1, deptEnabled: 1 }
        // displayedColumns: string[] = ['no', 'name', 'coaCompanyId', 'debits', 'credits', 'description', 'departmentId', 'action'];
        // if (!this.CompanySettings.coaNumEnabled) {
        //     const index = this.displayedColumns.indexOf('coaCompanyId');
        //     this.displayedColumns.splice(index, 1);
        //     this.accColumnWidth = '0px';
        //     this.accColumnGrow = '0';
        // }

        if (!this.CompanySettings.deptEnabled) {
            const index = this.displayedColumns.indexOf('departmentId');
            this.displayedColumns.splice(index, 1);
            this.deptColumnWidth = '0px';
            this.deptColumnGrow = '0';
        }
    }

}
