import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { ExpenseComponent } from "./expense-management.component";
import {InvoiceManagementModule} from "../invoice-management/invoice-management.module";
import {PaymentProcessingModule} from "../payment-processing/paymnet-processing.module";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
    declarations: [
        ExpenseComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InvoiceManagementModule,
        //PaymentProcessingModule,
        PdfViewerModule
    ],
    exports:[
    ],

    providers:[DatePipe]
})
export class ExpenseManagementModule { }
