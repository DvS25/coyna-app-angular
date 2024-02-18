import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';

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
    selector: 'app-un-paid',
    templateUrl: './un-paid.component.html',
    styleUrls: ['./un-paid.component.scss']
})
export class UnPaidComponent {
    categoryDetailList: any[] = [
        {accountName: 'Shopify Clearing', description: 'Sales form 2023-8-239reduce....', amount: '$15', department: '03'},
        {accountName: 'Savannah Nguyen', description: 'Sales form 2023-8-239reduce....', amount: '$19', department: '01'},
    ];

    itemClassificationList: any[] = [
        {product: 'Commission', description: 'Sales form 2023-8-239reduce....', qty: '20', rate: '$5',  amount: '$100', department: '03'},
        {product: 'Hours', description: 'Sales form 2023-8-239reduce....', qty: '10', rate: '$7', amount: '$70', department: '01'},
    ];
    expenceId!: string | null;
    
    ngAfterViewInit() {
        
    }

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private AdminComponent: AdminComponent,
        private activatedRoute: ActivatedRoute
    ) { }

    



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Bill');
        this.expenceId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(typeof(this.expenceId))
    }

    addTblData(){

    }

    clearTblData() {

    }

    

    

    

}
