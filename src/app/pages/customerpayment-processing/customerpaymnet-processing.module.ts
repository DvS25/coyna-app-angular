

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {CustomerpaymentComponent} from "./customerpayment-processing.component";
import {CustomerinvoiceManagementModule} from "../customerinvoice-management/customerinvoice-management.module";
import { InvoiceManagementService,  CompanyService, AlphaNumericDirective} from "../../shared";
import { FormsModule } from '@angular/forms';
// import { AlphaNumericDirective, AlphaNumericWithOutSpaceDirective} from "./directive/alphaNumeric.directive";

@NgModule({
    declarations: [
        CustomerpaymentComponent,
        // FinanceOnlyDirective,
        // NumbersOnlyDirective,
        // CharacterDirective,
        //AlphaNumericDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        //CustomerinvoiceManagementModule,
        FormsModule
    ],
    exports: [
        //AlphaNumericDirective
    ],
    providers: [CompanyService, InvoiceManagementService]
})
export class CustomerpaymentProcessingModule { }
