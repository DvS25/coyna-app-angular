import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';

/**
 * @title Table with pagination
 */

export interface PeriodicElement {
    date: string;
    type: string;
    companyName: string;
    No: string;
    Vendor: string;
    Category: string;
    Description: string;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: "28-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "456", Vendor: "Router Work inc", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "457", Vendor: "Precision Pro", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "458", Vendor: "CNC Creation", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "459", Vendor: "CNC Innovation", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "460", Vendor: "Mill Master", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "461", Vendor: "Axis Dynamics", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$500.00" },
    { date: "31-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "462", Vendor: "Axis Dynamics", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$500.00" },
    { date: "31-Aug-2023", type: "Expense", companyName: 'Sales form 2022 to 2023', No: "463", Vendor: "Axis Dynamics", Category: "Shopify", Description: "Sales form 2022 to 2023", amount: "$500.00" }
]
@Component({
    selector: 'app-print-expense',
    templateUrl: './print-expense.component.html',
    styleUrls: ['./print-expense.component.scss']
})
export class PrintExpenseComponent {

    displayedColumns: string[] = ['date', 'type', 'companyName', 'No', 'Vendor', 'Category', 'Description', 'amount'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

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
        private AdminComponent: AdminComponent,
        private browser: BrowserDB
    ) { }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Print Expense List');
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
