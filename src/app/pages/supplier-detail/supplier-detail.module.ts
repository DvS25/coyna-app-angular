import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SupplierComponent } from "./supplier-detail.component";
import {MaterialComponentsModule} from "../../material.module";

@NgModule({
    declarations: [
        SupplierComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialComponentsModule
    ],
    providers: [],

})
export class SupplierModule { }
