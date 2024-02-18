import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyService, UtilityHelper} from "../../shared";
import {Router} from "@angular/router";


export interface PeriodicElement {
    sno: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
}

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-Add-new-expense',
    templateUrl: './Add-new-expense.component.html',
    styleUrls: ['./Add-new-expense.component.scss']
})
export class AddNewExpenseComponent {
    
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
		private utility: UtilityHelper
    ) {}

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
		
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
