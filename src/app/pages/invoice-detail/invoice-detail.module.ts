import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InvoicedComponent } from "./invoice-detail.component";
import {MaterialComponentsModule} from "../../material.module";

@NgModule({
    declarations: [
        InvoicedComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialComponentsModule
    ],
    providers: [],

})
export class InvoicedModule { }
