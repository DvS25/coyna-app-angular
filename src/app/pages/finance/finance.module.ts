import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {CompanyService} from "../../shared";
import { FinanceComponent } from "./finance.component";

@NgModule({
    declarations: [
        FinanceComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[CompanyService]
})
export class FinanceModule {

}
