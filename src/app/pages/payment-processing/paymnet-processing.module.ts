

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {PaymentComponent} from "./payment-processing.component";
import {InvoiceManagementModule} from "../invoice-management/invoice-management.module";
import { InvoiceManagementService,  CompanyService, AlphaNumericDirective} from "../../shared";
import { FormsModule } from '@angular/forms';
// import { AlphaNumericDirective, AlphaNumericWithOutSpaceDirective} from "./directive/alphaNumeric.directive";

@NgModule({
    declarations: [
        PaymentComponent,
        // FinanceOnlyDirective,
        // NumbersOnlyDirective,
        // CharacterDirective,
        AlphaNumericDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InvoiceManagementModule,
        FormsModule
    ],
    exports: [
        AlphaNumericDirective
    ],
    providers: [CompanyService, InvoiceManagementService]
})
export class PaymentProcessingModule { }
