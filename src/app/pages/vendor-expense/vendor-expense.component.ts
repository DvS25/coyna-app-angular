import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { ExpenseTransactionModel } from 'src/app/model/ExpenseTransaction.model';
import { VendorExpenseService } from 'src/app/shared/service/apis/vendor-expense.service';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
    date: string;
    type: string;
    number: string;
    vendor: string;
    category: string;
    description: string;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: "28-Aug-2023", type: "Expense", number: "456", vendor: "Router Work inc", category: "Shopify", description: "Sales form", amount: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", number: "457", vendor: "Precision Pro", category: "Shopify", description: "Sales form", amount: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", number: "458", vendor: "CNC Creation", category: "Shopify", description: "Sales form", amount: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", number: "459", vendor: "CNC Innovation", category: "Shopify", description: "Sales form", amount: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "28-Aug-2023", type: "Expense", number: "456", vendor: "Router Work inc", category: "Shopify", description: "Sales form", amount: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", number: "457", vendor: "Precision Pro", category: "Shopify", description: "Sales form", amount: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", number: "458", vendor: "CNC Creation", category: "Shopify", description: "Sales form", amount: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", number: "459", vendor: "CNC Innovation", category: "Shopify", description: "Sales form", amount: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
]

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-vendor-expense',
    templateUrl: './vendor-expense.component.html',
    styleUrls: ['./vendor-expense.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VendorExpenseComponent {

    displayedColumns: string[] = ['select', 'date', 'type', 'number', 'vendor', 'description', 'amount', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('filterSection') filterSection!: ElementRef;
    companyForm!: FormGroup;
    totalLength = 0;
    users: any;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource1)
    }
    dataSource1: any[] = [];
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private vendorService: VendorExpenseService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private datePipe: DatePipe,
        private AdminComponent: AdminComponent,) { }

    // @ts-ignore
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    response: any

    ngOnInit(): void {
        this.AdminComponent.SetTitle('Expense');
        this.companyForm = this.formBuilder.group(
            {
                vendorname: ['', [Validators.required]],
                billno: ['', [Validators.required]],
                transactionDate: ['', [Validators.required]],
                Duedate: ['', [Validators.required]],
                paymentstatus: ['', [Validators.required]],
                amount: ['', [Validators.required]],
                account: ['', [Validators.required]],
                department: ['', [Validators.required]],
            },
        );
        this.getData();
    }

    public getData() {
        this.vendorService.getTransactionExpenses().subscribe((data => {
            this.dataSource1 = data.results;
        }));
    }
    delRecord(transactionIddata: any) {
        debugger
        this.vendorService.deleteExpense(transactionIddata).subscribe((data => {
            this.getData();
        }))
    }
    // convertDateFormate(date: any){
    //     
    //     return this.datePipe.transform(date, 'dd-MM-yyyy');
    // }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    saveclick() {
        alert('test')
    }
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }
    edit(transationData: any) {
        this.router.navigateByUrl("/expense/" + transationData.transactionId);
        // this.vendorService.getTable(transationData.transactionId).subscribe((data) => {
        //     if (data.type == "Success") {
        //         this.response = data;
        //     }
        // });
    }
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.date + 1}`;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    async expandFilterSection(event: Event) {
        console.log(event.currentTarget);
        const btn: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
        btn.classList.toggle('expanded');
        const filterSection: HTMLElement = this.filterSection.nativeElement;
        const hasStyle = filterSection.hasAttribute('style');
        if (hasStyle) {
            filterSection.removeAttribute('style');
            return;
        }
        filterSection.style.height = `${filterSection.scrollHeight}px`;
    }

    moveTo() {
        this.router.navigate(["bills"], { queryParams: { type: "unpaid" } })
    }

}
