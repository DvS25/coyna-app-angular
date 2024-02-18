import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { BillService } from 'src/app/shared/service/apis/bills.service';

/**
 * @title Table with pagination
 */

export interface PeriodicElement {
    vendors: string;
    date: string;
    type: string;
    due_date: string;
    bill_amount: string;
    balance_payable: string;
    aging: string;
    status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { vendors: "Brooklyn", type: "Bill Payment", date: "28-Aug-2023", due_date: "27-Aug-2023", bill_amount: "$450.00", balance_payable: "$450.00", aging: "15 Days", status: "Paid" },
    { vendors: "Albert", type: "Bill Payment", date: "28-Aug-2023", due_date: "28-Aug-2023", bill_amount: "$312.00", balance_payable: "$400.00", aging: "12 Days", status: "Paid" },
    { vendors: "Darrell", type: "Bill Payment", date: "29-Aug-2023", due_date: "28-Aug-2023", bill_amount: "$112.00", balance_payable: "$112.00", aging: "09 Days", status: "Paid" },
    { vendors: "Eleanor", type: "Bill Payment", date: "29-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$326.00", balance_payable: "$326.00", aging: "10 Days", status: "Paid" },
    { vendors: "Devon Lane", type: "Bill Payment", date: "30-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$512.00", balance_payable: "$512.00", aging: "20 Days", status: "Paid" },
    { vendors: "Ariene McCoy", type: "Bill Payment", date: "30-Aug-2023", due_date: "30-Aug-2023", bill_amount: "$500.00", balance_payable: "$500.00", aging: "22 Days", status: "Paid" },
    { vendors: "Eleanor", type: "Bill Payment", date: "29-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$300.00", balance_payable: "$300.00", aging: "12 Days", status: "Un-Paid" },
    { vendors: "Darrell", type: "Bill Payment", date: "29-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$215.00", balance_payable: "$215.00", aging: "15 Days", status: "Un-Paid" },
    { vendors: "Brooklyn", type: "Bill Payment", date: "28-Aug-2023", due_date: "27-Aug-2023", bill_amount: "$450.00", balance_payable: "$450.00", aging: "15 Days", status: "Un-Paid" },
    { vendors: "Albert", type: "Bill Payment", date: "28-Aug-2023", due_date: "28-Aug-2023", bill_amount: "$312.00", balance_payable: "$400.00", aging: "12 Days", status: "Paid" },
    { vendors: "Darrell", type: "Bill Payment", date: "29-Aug-2023", due_date: "28-Aug-2023", bill_amount: "$112.00", balance_payable: "$112.00", aging: "09 Days", status: "Un-Paid" },
    { vendors: "Eleanor", type: "Bill Payment", date: "29-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$326.00", balance_payable: "$326.00", aging: "10 Days", status: "Paid" },
    { vendors: "Devon Lane", type: "Bill Payment", date: "30-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$512.00", balance_payable: "$512.00", aging: "20 Days", status: "Un-Paid" },
    { vendors: "Ariene McCoy", type: "Bill Payment", date: "30-Aug-2023", due_date: "30-Aug-2023", bill_amount: "$500.00", balance_payable: "$500.00", aging: "22 Days", status: "Paid" },
    { vendors: "Eleanor", type: "Bill Payment", date: "29-Aug-2023", due_date: "29-Aug-2023", bill_amount: "$300.00", balance_payable: "$300.00", aging: "12 Days", status: "Paid" }
]
@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class BillsComponent {
    panelOpenState = false;
    BillList: any = [];
    isUnpaid = false; isPaid = false;
    currentTabName: string = 'All';
    selectedIndex = 0;
    displayedColumns: string[] = ['select', 'vendors', 'type', 'date', 'due_date', 'bill_amount', 'balance_payable', 'aging', 'status', 'action'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<PeriodicElement>([]);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
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
        private billService: BillService,
        private router: Router,
        private utility: UtilityHelper,
        private browser: BrowserDB,
        private route: ActivatedRoute,
        private AdminComponent: AdminComponent

    ) {

        this.route.queryParams.subscribe((data: any) => {
            console.log("Data - ", data);
            if (data.type === "paid") {
                this.isPaid = true;
                this.isUnpaid = false;
                this.selectedIndex = 2;
            }
            if (data.type === "unpaid") {
                this.isPaid = false;
                this.isUnpaid = true;
                this.selectedIndex = 1;
            }
        })

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.date + 1}`;
    }

    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Bills');
        this.getData();
        // this.BillList = this.dataSource;
    }

    public getData() {
        this.billService.getBillPayments().subscribe((data => {
            if (this.currentTabName != 'All') {
                if (this.currentTabName == "Un-Paid")
                    this.dataSource = data.results.filter((o: { paymentStatus: string; }) => o.paymentStatus == "UNPAID");
                else
                    this.dataSource = data.results.filter((o: { paymentStatus: string; }) => o.paymentStatus == "PAID");

            }
            else {
                this.dataSource = data.results;
            }
        }));

    }

    // AllBillList(type: any) {
    //     if (type.tab.textLabel != 'All') {
    //         this.dataSource.filteredData = this.BillList.filteredData.filter((o: { status: string; }) => o.status == type.tab.textLabel)
    //     }
    //     else {
    //         this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    //     }
    // }

    triggerTab(event: any) {
        // this.currentTabName =  event.tab.textLabel;
        if (event) {
            if (event.tab.textLabel == "Un-Paid") {
                this.isUnpaid = true;
            }
            else {
                this.isUnpaid = false;
            }
            if (event.tab.textLabel == "Paid") {
                this.isPaid = true;
            } else {
                this.isPaid = false;
            }
        }
        this.getData();
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

}
