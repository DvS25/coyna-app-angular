import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { CompanydComponent } from "./company-detail.component";

@NgModule({
    declarations: [
        CompanydComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[]
})
export class CompanydModule { }
