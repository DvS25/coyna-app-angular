import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AFinanceComponent } from './finance-listing.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import { InvoiceManagementService } from "../../shared";
import { CompanyService } from "../../shared";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AFinanceComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule
    ],
    providers:[InvoiceManagementService, CompanyService]
})
export class AFinanceModule {

}
