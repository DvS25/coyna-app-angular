import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './invoice-listing.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {InvoiceManagementService, SharedService} from "../../shared";
import { CompanyService } from "../../shared";
import { MatSortModule } from '@angular/material/sort';
import {ReactiveFormsModule} from "@angular/forms";
import {InvoiceManagementModule} from "../invoice-management/invoice-management.module";

@NgModule({
  declarations: [
    AccountComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        InvoiceManagementModule,
        MatSortModule
    ],
    providers:[InvoiceManagementService, CompanyService, SharedService]
})
export class AccountModule { }
