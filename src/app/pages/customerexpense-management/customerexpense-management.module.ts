import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {CustomerexpenseComponent } from "./customerexpense-management.component";
import {CustomerinvoiceManagementModule} from "../customerinvoice-management/customerinvoice-management.module";
import {CustomerpaymentProcessingModule} from "../customerpayment-processing/customerpaymnet-processing.module";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
    declarations: [
        CustomerexpenseComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        //CustomerinvoiceManagementModule,
        //PaymentProcessingModule,
        PdfViewerModule
    ],
    exports:[
    ],

    providers:[DatePipe]
})
export class CustomerexpenseManagementModule { }
