import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationlComponent } from './operation-listing.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import { InvoiceManagementService } from "../../shared";
import { CompanyService } from "../../shared";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    OperationlComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule
    ],
    providers:[InvoiceManagementService, CompanyService]
})
export class OperationlModule { }
