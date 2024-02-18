import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { VendordComponent } from "./vendor-detail.component";

@NgModule({
    declarations: [
        VendordComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[]
})
export class VendordModule { }
