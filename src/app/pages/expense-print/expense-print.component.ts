import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { VendorExpenseService } from 'src/app/shared/service/apis/vendor-expense.service';

export interface PeriodicElement {
    date: string;
    type: string;
    company: string;
    number: string;
    vendor: string;
    accountname: string;
    description: string;
    total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: "28-Aug-2023", type: "Expense", company: "Sales From 202.",  number: "456", vendor: "Router Work inc", accountname: "Shopify", description: "Sales form", total: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", company: "Sales From 202.", number: "457", vendor: "Precision Pro", accountname: "Shopify", description: "Sales form", total: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", company: "Sales From 202.", number: "458", vendor: "CNC Creation", accountname: "Shopify", description: "Sales form", total: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", company: "Sales From 202.", number: "459", vendor: "CNC Innovation", accountname: "Shopify", description: "Sales form", total: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", company: "Sales From 202.", number: "460", vendor: "Mill Master", accountname: "Shopify", description: "Sales form", total: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", company: "Sales From 202.", number: "460", vendor: "Mill Master", accountname: "Shopify", description: "Sales form", total: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", company: "Sales From 202.", number: "460", vendor: "Mill Master", accountname: "Shopify", description: "Sales form", total: "$1050.00" },
    { date: "28-Aug-2023", type: "Expense", company: "Sales From 202.", number: "456", vendor: "Router Work inc", accountname: "Shopify", description: "Sales form", total: "$102.00" },
    { date: "29-Aug-2023", type: "Expense", company: "Sales From 202.", number: "459", vendor: "CNC Innovation", accountname: "Shopify", description: "Sales form", total: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", company: "Sales From 202.", number: "460", vendor: "Mill Master", accountname: "Shopify", description: "Sales form", total: "$1050.00" },
]

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-expense-print',
    templateUrl: './expense-print.component.html',
    styleUrls: ['./expense-print.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ExpensePrintComponent {

    displayedColumns: string[] = ['select', 'date', 'type', 'number', 'vendor', 'description', 'amount'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('filterSection') filterSection!: ElementRef;
    dataSource1: any[] = [];


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    }

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private vendorService: VendorExpenseService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private AdminComponent: AdminComponent
    ) { }

    // @ts-ignore
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
        this.AdminComponent.SetTitle( 'Print Expense List');
        this.getData();

    }

    public getData() {
        this.vendorService.getTransactionExpenses().subscribe((data => {
            this.dataSource1 = data.results;
        }));
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    saveclick(){
        alert('test')
    }
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
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
        if(hasStyle) {
            filterSection.removeAttribute('style');
            return;
        }
        filterSection.style.height =  `${filterSection.scrollHeight}px`;        
    }

    downloadCsv(text: string, filename: string) {
        const blob = new Blob([text], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

    exportToCsv() {
        this.vendorService.downloadTransactions("EXPENSE").subscribe((data => {
        //     console.log("data = ", data);
        //   this.downloadCsv(data, `${new Date().getTime()}.csv`);
        this.handleDownload(data);
        }));
    }

    private handleDownload(data: any) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = `${new Date().getTime()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

}
