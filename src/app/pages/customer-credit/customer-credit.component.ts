import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { CustomerService } from 'src/app/shared/service/apis/customer.service';

export interface customer_credit {

}

@Component({
    selector: 'app-customer-credit',
    templateUrl: './customer-credit.component.html',
    styleUrls: ['./customer-credit.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})


export class CustomerCreditComponent {
    files: any;
    // @ts-ignore
    uploader: FileUploader;
    // @ts-ignore
    CustomerCreditForm: FormGroup;
    // @ts-ignore
    ItemClassificationForm: FormGroup;
    DeletedtransactionDetails: customer_credit[] = [];
    CustomerList: any = [];
    CustomerCreditData: any = {};
    submitted: boolean = false;
    tblData: customer_credit[] = [
        { no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" },
        { no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" },
        { no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" },
        { no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" },
        { no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" }
    ];
    displayedColumns: string[] = ['no', 'product_service', 'description', 'quantity', 'rate', 'amount', 'departmentId'];
    dataSource = new MatTableDataSource<customer_credit>(this.tblData);
    selection = new SelectionModel<customer_credit>(true, []);
    UploadedList: any = [];

    @ViewChild(MatTable) table!: MatTable<customer_credit>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    }
    constructor(
        private departmentService: DepartmentService,
        private AdminComponent: AdminComponent,
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private dialog: MatDialog,
        private router: Router,
        public browser: BrowserDB,
        public constant: Constants,
        private customerService: CustomerService
    ) {
        const accessToken: string = this.browser.getLocalStorage(this.constant.SET_TOKEN);
    }

    async ngOnInit() {
        this.AdminComponent.SetTitle('Customer Credit');
        this.CustomerCreditForm = this.formBuilder.group(
            {
                "customer_id": ['', [Validators.required]],
                "email": ['', [Validators.required]],
                "mailing_address": ['', [Validators.nullValidator]],
                "transaction_ref_no": ['', [Validators.nullValidator]],
                "date": ['', [Validators.nullValidator]],
            });
        this.ItemClassificationForm = this.formBuilder.group(
            {
                'file_name': '',
            }
        )
        await this.GetCustomerList();
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.CustomerCreditForm.controls;
    }

    clearTblData() {
        this.tblData = [{ no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" }];
    }

    addTblData() {
        this.tblData.push({ no: "", product_service: "", description: "", quantity: "", rate: "", amount: "", departmentId: "" });
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


    GetCustomerList() {
        this.customerService.getCustomers().subscribe((res) => {
            if (res.code == "1") {
                this.CustomerList = res.results;
            }
        });
    }


}
