import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

export interface Journal {
    no: string;
    coaCompanyName: string;
    debit_amout: string,
    credit_amout: string,
    description: string;
    entityId: string;
    departmentName: string;
    is_debit: boolean,
    is_credit: boolean
    transactionType: string
}

@Component({
    selector: 'app-journal-entry',
    templateUrl: './journal-entry-view.component.html',
    styleUrls: ['./journal-entry-view.component.scss'],
    // encapsulation: ViewEncapsulation.Emulated
})


export class JournalEntryViewComponent {
    files: any;
    // @ts-ignore
    transactionId: string | null = '';
    JournalViewData: any = {};
    submitted: boolean = false;
    chartOfAccounts: any = [];
    DepartmentList: any = [];
    tblData: Journal[] = [
        { no: "", coaCompanyName: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentName: "", transactionType: '' },
        { no: "", coaCompanyName: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentName: "", transactionType: '' },
        { no: "", coaCompanyName: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentName: "", transactionType: '' },
        { no: "", coaCompanyName: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentName: "", transactionType: '' },
        { no: "", coaCompanyName: "", debit_amout: "", credit_amout: "", is_debit: true, is_credit: true, description: "", entityId: "", departmentName: "", transactionType: '' },
    ];
    displayedColumns: string[] = ['no', 'coaCompanyName', 'debits', 'credits', 'description', 'entityId', 'departmentName', 'action'];
    dataSource = new MatTableDataSource<Journal>(this.tblData);
    selection = new SelectionModel<Journal>(true, []);
    JournalData: any = {};
    CompanySettings: any = {};

    @ViewChild(MatTable) table!: MatTable<Journal>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    }
    constructor(
        private chartOfAccountSetupService: ChartOfAccountSetupService,
        private departmentService: DepartmentService,
        private JournalEntryService: JournalEntryService,
        private AdminComponent: AdminComponent,
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        public browser: BrowserDB,
        public constant: Constants
    ) { }

    async ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.transactionId = params.get('id');
        })
        let userData = this.browser.getLocalStorage(this.constant.SET_USER_RESPONSE);
        this.CompanySettings = userData.companySettings;
        this.AdminComponent.SetTitle('Journal Entry');
        this.GetJournalView(this.transactionId);
    }



    GetJournalView(transactionId: any) {
        this.JournalEntryService.getJournalEntryById(transactionId).subscribe(
            res => {
                if (res.code == "1") {
                    if (res.results) {
                        this.JournalData = res.results;
                        if (res.results.transactionDetails.length > 0) {
                            this.tblData = res.results.transactionDetails.map((o: { coaCompanyName: any; amount: any; description: any; entityId: any; departmentName: any; transactionType: any; }) => ({
                                coaCompanyName: o.coaCompanyName,
                                debit_amout: o.transactionType == 'DEBIT' ? o.amount : '',
                                credit_amout: o.transactionType == 'CREDIT' ? o.amount : '',
                                is_debit: o.transactionType == 'DEBIT' ? true : false,
                                is_credit: o.transactionType == 'CREDIT' ? true : false,
                                description: o.description,
                                entityId: o.entityId,
                                departmentName: o.departmentName,
                                transactionType: o.transactionType
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

    RedirectToReport() {
        this.router.navigate(['/journal-entry']);
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
                return +obj.debit_amout;
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



}
