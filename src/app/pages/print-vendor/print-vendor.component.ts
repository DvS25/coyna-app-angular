import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component,ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { VendorExpenseService } from 'src/app/shared/service/apis/vendor-expense.service';
/**
 * @title Table with pagination
 */

export interface PeriodicElement {
    vendor: string;
    companyName: string;
    address: string;
    phoneNo: string;
    email: string;
    balance: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { vendor: "Brooklyn", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "brooklyn@gmail.com", balance: "$450.00" },
    { vendor: "Precision Pro", companyName: "Sales Form 2023", address: "256 Ash Dr. San", phoneNo: "(202) 111-565", email: "precisionpro@gmail.com", balance: "$250.00" },
    { vendor: "CNC Creation", companyName: "Sales Form 2023", address: "565 Royal Ln", phoneNo: "(101) 606-417", email: "cnccreation@gmail.com", balance: "$650.00" },
    { vendor: "CNC Innovation", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 444-0125", email: "cncinnovation@gmail.com", balance: "$150.00" },
    { vendor: "Mill Master", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "millmaster@gmail.com", balance: "$450.00" },
    { vendor: "Axix Dynamics", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "axixdynamics@gmail.com", balance: "$200.00" },
    { vendor: "Brooklyn", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "brooklyn@gmail.com", balance: "$450.00" },
    { vendor: "Brooklyn", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "brooklyn@gmail.com", balance: "$450.00" },
    { vendor: "Brooklyn", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "brooklyn@gmail.com", balance: "$450.00" },
    { vendor: "Brooklyn", companyName: "Sales Form 2023", address: "2715 Ash Dr. San", phoneNo: "(505) 555-0125", email: "brooklyn@gmail.com", balance: "$450.00" }
]

@Component({
    selector: 'app-print-vendor',
    templateUrl: './print-vendor.component.html',
    styleUrls: ['./print-vendor.component.scss']
})
export class VendorPrintListComponent {

    displayedColumns: string[] = ['vendor', 'companyName', 'address', 'phoneNo', 'email', 'balance'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('filterSection') filterSection!: ElementRef;
    dataSource1 : any[] = [];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    }

    ExpenseForm = this.formBuilder.group({
        vendor: ['', Validators.required],
        payment_account: ['', Validators.required],
        reference_number: ['', Validators.required],
        payment_date: ['', Validators.required],
        payment_method: ['', Validators.required],
    })

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private AdminComponent: AdminComponent,
        private vendorService : VendorExpenseService,
    ) { }

    // @ts-ignore
   // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Print Vendor List');
        this.getvendor();
    }

    public getvendor() {
        this.vendorService.getVendorList().subscribe((data) => {
          this.dataSource1 = data.results;
        });
      }
    
     isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.vendor + 1}`;
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

    exportData() {
        this.vendorService.downloadTransactions("VENDOR").subscribe((data => {
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
