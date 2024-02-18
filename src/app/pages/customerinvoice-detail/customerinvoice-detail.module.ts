import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerinvoicedComponent } from "./customerinvoice-detail.component";
import {MaterialComponentsModule} from "../../material.module";

@NgModule({
    declarations: [
        CustomerinvoicedComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialComponentsModule
    ],
    providers: [],

})
export class CustomerinvoicedModule { }
