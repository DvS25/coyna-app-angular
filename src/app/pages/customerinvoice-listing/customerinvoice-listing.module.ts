import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomeraccountComponent } from './customerinvoice-listing.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {InvoiceManagementService, SharedService} from "../../shared";
import { CompanyService } from "../../shared";
import { MatSortModule } from '@angular/material/sort';
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerinvoiceManagementModule} from "../customerinvoice-management/customerinvoice-management.module";

@NgModule({
  declarations: [
    CustomeraccountComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        //CustomerinvoiceManagementModule,
        MatSortModule
    ],
    providers:[InvoiceManagementService, CompanyService, SharedService]
})
export class CustomeraccountModule { }
